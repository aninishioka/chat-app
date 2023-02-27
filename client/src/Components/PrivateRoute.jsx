import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SocketContext } from "../Contexts/SocketContext";
import { useAuth } from "../Contexts/UserContext";

function PrivateRouter() {
  const { curUser } = useAuth();
  const socket = useContext(SocketContext);

  if (curUser) {
    socket.emit("logged-in", curUser.uid);
    return <Outlet />;
  } else return <Navigate to="/login" />;
}

export default PrivateRouter;
