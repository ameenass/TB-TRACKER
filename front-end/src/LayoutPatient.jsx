import { Outlet } from "react-router-dom";
import NavbarPatient from "./NavbarPatient";

const LayoutPatient = () => {
  return (
    <div>
      <NavbarPatient />
      <Outlet /> {/* This renders the current page */}
    </div>
  );
};

export default LayoutPatient;
