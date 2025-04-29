import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, UserPlus, BookOpen, Menu as MenuIcon } from "lucide-react";
import lungs from "./assets/lungs.png";
import avatar from "./assets/avatar.png";

const tabs = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Rechercher", icon: <Search size={20} />, path: "/rechercher" },
  { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
  { name: "Blog", icon: <BookOpen size={20} />, path: "/blog" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="w-full fixed top-0 left-0 h-20 z-50 bg-emerald-50">
      <header className="flex justify-between items-center h-full text-black px-8 drop-shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={lungs} alt="lungs" className="w-8 h-7 hover:scale-105 transition-all" />
          <h1 className="font-bold text-teal-800">TBtracker</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="bg-emerald-100 rounded-3xl hidden xl:flex">
          <ul className="flex items-center gap-3 font-semibold text-base">
            {tabs.map((tab) => (
              <Link
                to={tab.path}
                key={tab.name}
                className={`relative px-3 py-2 flex items-center gap-2 text-teal-800 rounded-3xl transition-all cursor-pointer ${
                  activeTab === tab.name ? "bg-white shadow-md" : ""
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.name}
              </Link>
            ))}
          </ul>
        </div>

        {/* Profile & Menu */}
        <div className="flex items-center space-x-6">
          <div className="cursor-pointer rounded-full bg-white p-2">🔔</div>
          <div className="cursor-pointer rounded-full bg-white p-2">⚙️</div>
          <button className="flex items-center gap-2 bg-transparent rounded-lg hover:bg-gray-50 transition">
            <img src={avatar} alt="profile" className="h-10 w-10 rounded-full" />
            <span className="font-semibold text-teal-800">Dr. Toumi</span>
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
        className="absolute top-0 right-0 w-64 h-full bg-white flex flex-col items-center gap-6 shadow-lg xl:hidden z-50 pt-20"
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
