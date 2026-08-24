import { WebSocketServer } from "ws";

const port = Number(process.env.WS_PORT ?? 5000);
const server = new WebSocketServer({ port });

server.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "connected", message: "WebSocket is working" }));
  socket.on("message", (message) => socket.send(message.toString()));
});

console.log(`WebSocket server listening on ws://localhost:${port}`);
