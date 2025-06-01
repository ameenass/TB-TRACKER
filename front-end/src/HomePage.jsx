import lungs from "./assets/lungs.png";
import avatar from "./assets/avatar.png";
import { Menu as MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Home, Search, UserPlus, BookOpen } from "lucide-react";

const tabs = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Rechercher", icon: <Search size={20} />, path: "/rechercher" }, // il faut regler ca apres
  { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
  
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full h-full fixed bg-emerald-50">
      <header className="  flex justify-between items-center text-black py-5 px-8 md:px-35 drop-shadow-md">
        <Link to="/" className="flex items-center space-x-2">
          <img src={lungs} alt="lungs" className="w-8 h-7 hover:scale-105 transition-all" />
          <h1 className="font-bold text-teal-800">TBtracker</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="bg-emerald-100 border-1 rounded-3xl hidden xl:flex">
          <ul className="flex items-center gap-3 font-semibold text-base relative">
            {tabs.map((tab) => (
              <Link
                to={tab.path}
                key={tab.name}
                className={`relative px-3 py-2 flex items-center gap-2 text-teal-800 rounded-3xl transition-all cursor-pointer ${
                  activeTab === tab.name ? "bg-white shadow-md" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <span className="relative flex items-center gap-2">
                  {tab.icon} {tab.name}
                </span>
              </Link>
              
            ))}
          </ul>
        </div>

       
        {/* Reste du code pour les notifications, paramètres, etc. */}
        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer rounded-full bg-white p-2">
            <span className="text-teal-800">🔔</span>
          </div>

          <div className="cursor-pointer rounded-full bg-white p-2">
            <span className="text-teal-800">⚙️</span>
          </div>
        </div>

        {/* Profil */}
        <div className="relative inline-block cursor-pointer text-left p-1">
          <button className="flex items-center gap-2 bg-transparent rounded-lg hover:bg-gray-50 transition">
            <img src={avatar} alt="profile" className="h-10 w-10 rounded-full" />
            <span className="font-semibold text-teal-800">Dr.toumi</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <MenuIcon className="xl:hidden block text-4xl cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
      </header>

      {/* Mobile Sidebar Menu */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={showMenu ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-full bg-white flex flex-col items-center gap-6 font-semibold text-lg shadow-lg xl:hidden"
      >
        {tabs.map((tab) => (
          <Link
            to={tab.path}
            key={tab.name}
            onClick={() => {
              setActiveTab(tab.name);
              setShowMenu(false);
            }}
            className={`w-full p-4 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.name ? "bg-green-700 text-white" : "hover:bg-green-700 hover:text-white"
            }`}
          >
            {tab.icon} {tab.name}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default Navbar;
