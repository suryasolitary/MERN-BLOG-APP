import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateDashboard() {
  const { currentuser } = useSelector((state) => state.user);
  return <div>{currentuser ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
}
