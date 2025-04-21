import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This renders the current page */}
    </div>
  );
};

export default Layout;