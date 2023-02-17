import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

function PrivateRouter() {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;
