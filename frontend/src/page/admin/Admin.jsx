import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminHeader from "../../component/common/AdminHeader";
import Forbidden from "../../component/common/Forbidden";
import TokenContext from "../../store/TokenContext";

function Admin() {
  const { token } = useContext(TokenContext);
  const { aud } = token ? jwtDecode(token) : "";
  const roles = aud ? [aud.slice(1, -1)] : [];

  return roles.includes("ADMIN") ? (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  ) : (
    <Forbidden />
  );
}

export default Admin;
