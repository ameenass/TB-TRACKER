import { Outlet } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
export default function Layout() {
  const location = useLocation();

  // mmasquer la navbar uniquement sur la page fiche details
  const hideNavbar = location.pathname.startsWith("/fiche-details");

  return (
    <div className="flex flex-col h-screen">
      {!hideNavbar && <Navbar />}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
