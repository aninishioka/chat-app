import { createContext } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {});

socket.on("connect", () => {
  console.log(`connected to socket ${socket.id}`);
});

const SocketContext = createContext(socket);

export { socket, SocketContext };
