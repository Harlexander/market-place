import io from 'socket.io-client';

const socket = io('http://localhost:4789', {
    autoConnect : false
}); // Connect to the default server URL (same host as the Next.js app)

export default socket;
