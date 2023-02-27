import { createContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./UserContext";

const socket = io("http://localhost:8080", {});

socket.on("connect", () => {});

const SocketContext = createContext(socket);

export { socket, SocketContext };
