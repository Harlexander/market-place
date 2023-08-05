const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 5000;

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const prisma = new PrismaClient();

const io = new socketIO.Server(server, {
  cors : {
    origin : "*"
  }
})

app.use(express.json())
app.use(cors());
// Set up your API routes here using app.get(), app.post(), etc.
app.post('/api/messages', async (req, res) => {
  try {
    const content = await req.body;

    const room = generateRoomName(content.senderId, content.receiverId);

    const message = {
      senderId : content.senderId,
      receiverId : content.receiverId,
      message : content.message,
    }

    if(content.productId) message.productId = content.productId
    // Send the message to the room representing the sender-receiver pair
    const data = await prisma.messages.create({
      data : message
    })
  
    io.to(room).emit('message', content);

    res.json({ success : true});
  } catch (error) {
    console.log(error);
    res.json({ err : error}, 500)
  }

});

// Socket.IO connection handling
io.on('connection', async (socket) => {
  console.log('A user connected');

  const {senderId, receiverId} = socket.handshake.query;

  const room = `${senderId}-${receiverId}`;

  // Handle joining the room based on sender-receiver pair
  socket.on("join", async ({senderId, receiverId}) => {
    const room = generateRoomName(senderId, receiverId);
    socket.join(room)

    const messages = await getMessages(senderId, receiverId);

    io.to(room).emit("message", messages);
  })

  socket.on("disconnect", () => {
    console.log("disconnect")
  });

});

const getMessages = async (senderId, receiverId) => {
  const data = await prisma.messages.findMany({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },

    select : {
      message : true,
      createdAt : true,
      isRead : true,
      id : true,
      senderId : true,
      receiverId : true,
      product : {
        select : {
          images : true,
          name : true,
          price : true,
          id : true,
          slug : true
        }
      }
    }
  })

  return data;
}

function generateRoomName(user1Id, user2Id) {
  const sortedUserIds = [user1Id, user2Id].sort(); // Sort the user IDs alphabetically
  return `${sortedUserIds[0]}-${sortedUserIds[1]}`;
}
