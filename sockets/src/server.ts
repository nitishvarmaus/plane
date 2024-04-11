import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { socketConnection } from "./connection";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on("connection", socketConnection);

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
