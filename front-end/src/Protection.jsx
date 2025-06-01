
import { Navigate } from "react-router-dom";

export default function Protection({ children }) {
  const isLoggedIn = localStorage.getItem("isMedecinLoggedIn") === "true";
  const nom = localStorage.getItem("medecinNom");

  if (!isLoggedIn || !nom) {
    return <Navigate to="/inscription-medecin" />;
  }

  return children;
}
