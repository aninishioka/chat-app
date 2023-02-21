import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";

function PrivateRouter() {
  const { curUser } = useAuth();
  console.log(curUser);
  return curUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;
