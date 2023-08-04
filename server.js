const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.NODE_ENV !== 'production' ? 'localhost' : 'greenvesstmium.com';
const port = process.env.PORT || 4789;

const app = next({ dev });
const handle = app.getRequestHandler();
const expressApp = express();
const server = createServer(expressApp);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.prepare().then(() => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle socket events here
    socket.emit('message', { name: 'Hey Peachy!' });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  io.on('message', (data) => {
    console.log('Received custom event:', data);
  });

  global.io = io

  expressApp.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
