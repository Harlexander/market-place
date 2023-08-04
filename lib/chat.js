import axios from "axios";

export const handleSendMessage = async (content) => {
      const send = await axios.post("http://localhost:5000/api/messages", {
        senderId : content?.senderId,
        receiverId : content?.receiverId,
        message : content?.message,
        productId : content?.productId
      })

      return send.data;
  }