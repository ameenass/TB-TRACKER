// import { Link } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Home, Search, UserPlus, BookOpen, Menu as MenuIcon } from "lucide-react";
// import lungs from "./assets/lungs.png";
// import avatar from "./assets/avatar.png";

// const tabs = [
//   { name: "Home", icon: <Home size={20} />, path: "/" },
//   { name: "Rechercher", icon: <Search size={20} />, path: "/rechercher" },
//   { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
//   { name: "Blog", icon: <BookOpen size={20} />, path: "/blog" },
// ];

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [activeTab, setActiveTab] = useState("Home");
//   const [medecinNom, setMedecinNom] = useState("");
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const nom = localStorage.getItem("medecinNom");
//     if (nom) {
//       setMedecinNom(nom);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("medecinNom");
//     window.location.href = "/inscription-medecin";
//   };

//   // Fermer le menu si on clique en dehors
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="w-full fixed top-0 left-0 h-20 z-50 bg-emerald-50">
//       <header className="flex justify-between items-center h-full text-black px-8 drop-shadow-md">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//           <img src={lungs} alt="lungs" className="w-8 h-7 hover:scale-105 transition-all" />
//           <h1 className="font-bold text-teal-800">TBtracker</h1>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="bg-emerald-100 rounded-3xl hidden xl:flex">
//           <ul className="flex items-center gap-3 font-semibold text-base">
//             {tabs.map((tab) => (
//               <Link
//                 to={tab.path}
//                 key={tab.name}
//                 className={`relative px-3 py-2 flex items-center gap-2 text-teal-800 rounded-3xl transition-all cursor-pointer ${
//                   activeTab === tab.name ? "bg-white shadow-md" : ""
//                 }`}
//                 onClick={() => setActiveTab(tab.name)}
//               >
//                 {tab.icon} {tab.name}
//               </Link>
//             ))}
//           </ul>
//         </div>

//         {/* Profile & Dropdown Menu */}
//         <div className="relative flex items-center space-x-6" ref={dropdownRef}>
//           <button
//             onClick={() => setOpenDropdown(!openDropdown)}
//             className="flex items-center gap-2 bg-transparent rounded-lg hover:bg-gray-50 transition"
//           >
//             <img src={avatar} alt="profile" className="h-10 w-10 rounded-full" />
//             <span className="font-semibold text-teal-800">Dr.{medecinNom}</span>
//           </button>

//           {openDropdown && (
//             <div className="absolute top-16 right-0 bg-white shadow-md rounded-md w-44 py-2 z-50">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
//               >
//                 Se déconnecter
//               </button>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
//               >
//                 Aide
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <MenuIcon className="xl:hidden block text-4xl cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
//       </header>

//       {/* Mobile Sidebar Menu */}
//       <motion.div
//         initial={{ x: "100%", opacity: 0 }}
//         animate={showMenu ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="absolute top-0 right-0 w-64 h-full bg-white flex flex-col items-center gap-6 shadow-lg xl:hidden z-50 pt-20"
//       >
//         {tabs.map((tab) => (
//           <Link
//             to={tab.path}
//             key={tab.name}
//             onClick={() => {
//               setActiveTab(tab.name);
//               setShowMenu(false);
//             }}
//             className={`w-full p-4 flex items-center gap-2 transition-all cursor-pointer ${
//               activeTab === tab.name ? "bg-green-700 text-white" : "hover:bg-green-700 hover:text-white"
//             }`}
//           >
//             {tab.icon} {tab.name}
//           </Link>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default Navbar;



// import { Link } from "react-router-dom"
// import { useState, useEffect ,useRef } from "react"
// import { motion } from "framer-motion"
// import { Home, Search, UserPlus, MenuIcon, X, ChevronRight } from "lucide-react"
// import lungs from "./assets/lungs.png"
// import avatar from "./assets/avatar.png"

// const tabs = [
//   { name: "Home", icon: <Home size={20} />, path: "/" },
//   { name: "Rechercher", icon: <Search size={20} />, path: "/rechercher" },
//   { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
// ]

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false)
//   const [activeTab, setActiveTab] = useState("Home")
//   const [scrolled, setScrolled] = useState(false)
// const [medecinNom, setMedecinNom] = useState("");
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const nom = localStorage.getItem("medecinNom");
//     if (nom) {
//       setMedecinNom(nom);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("medecinNom");
//     window.location.href = "/inscription-medecin";
//   };

//   // Fermer le menu si on clique en dehors
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   // Add scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <div
//       className={`sticky w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-gradient-to-r from-teal-50 to-emerald-50"}`}
//     >
//       <header className="flex justify-between items-center py-4 px-6 md:px-8 max-w-7xl mx-auto">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-3 group">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
//             <img
//               src={lungs || "/placeholder.svg"}
//               alt="lungs"
//               className="w-6 h-6 group-hover:scale-110 transition-all duration-300"
//             />
//           </div>
//           <h1 className="font-bold text-xl bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
//             TBtracker
//           </h1>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden xl:block">
//           <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full shadow-sm p-1.5">
//             <ul className="flex items-center gap-1">
//               {tabs.map((tab) => (
//                 <Link
//                   to={tab.path}
//                   key={tab.name}
//                   className={`relative px-4 py-2 flex items-center gap-2 font-medium text-sm transition-all duration-300 rounded-full
//                     ${
//                       activeTab === tab.name
//                         ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   onClick={() => setActiveTab(tab.name)}
//                 >
//                   {tab.icon} {tab.name}
//                 </Link>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Profile & Menu */}
//         <div className="relative flex items-center space-x-6" ref={dropdownRef}>
//           <button
//             onClick={() => setOpenDropdown(!openDropdown)}
//             className="flex items-center gap-2 bg-transparent rounded-lg hover:bg-gray-50 transition"
//           >
//             <img src={avatar} alt="profile" className="h-10 w-10 rounded-full" />
//             <span className="font-semibold text-teal-800">Dr.{medecinNom}</span>
//           </button>

//           {openDropdown && (
//             <div className="absolute top-16 right-0 bg-white shadow-md rounded-md w-44 py-2 z-50">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
//               >
//                 Se déconnecter
//               </button>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
//               >
//                 Aide
//               </button>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Mobile Sidebar Menu */}
//       <motion.div
//         initial={{ opacity: 0, x: "100%" }}
//         animate={showMenu ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 xl:hidden"
//       >
//         <div className="flex justify-end p-4">
//           <button
//             onClick={() => setShowMenu(false)}
//             className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <X className="h-5 w-5 text-gray-700" />
//           </button>
//         </div>

//         <div className="flex flex-col p-4 gap-3">
//           {tabs.map((tab) => (
//             <Link
//               to={tab.path}
//               key={tab.name}
//               onClick={() => {
//                 setActiveTab(tab.name)
//                 setShowMenu(false)
//               }}
//               className={`w-full p-3 flex items-center gap-3 rounded-lg transition-all duration-300
//                 ${
//                   activeTab === tab.name
//                     ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//             >
//               {tab.icon}
//               <span className="font-medium">{tab.name}</span>
//               {activeTab === tab.name && <ChevronRight className="h-4 w-4 ml-auto" />}
//             </Link>
//           ))}
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-100">
//               <img src={avatar || "/placeholder.svg"} alt="profile" className="h-full w-full object-cover" />
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-800">Dr. Toumi</h3>
//               <p className="text-sm text-gray-500">Médecin</p>
//             </div>
//           </div>
//           <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300">
//             Déconnexion
//           </button>
//         </div>
//       </motion.div>

//       {/* Overlay when mobile menu is open */}
//       {showMenu && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
//           onClick={() => setShowMenu(false)}
//         />
//       )}
//     </div>
//   )
// }

// export default Navbar




import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Home, Search, UserPlus, MenuIcon, X, ChevronRight } from "lucide-react"
import lungs from "./assets/lungs.png"
import avatar from "./assets/avatar.png"

const tabs = [
  { name: "Accueil", icon: <Home size={20} />, path: "/" },
  { name: "Rechercher", icon: <Search size={20} />, path: "/rechercher" },
  { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
]

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const [activeTab, setActiveTab] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [medecinNom, setMedecinNom] = useState("")
  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const nom = localStorage.getItem("medecinNom")
    if (nom) {
      setMedecinNom(nom)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("medecinNom")
    window.location.href = "/inscription-medecin"
  }

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`sticky w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-gradient-to-r from-teal-50 to-emerald-50"}`}
    >
      <header className="flex justify-between items-center py-4 px-6 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
            <img
              src={lungs || "/placeholder.svg"}
              alt="lungs"
              className="w-6 h-6 group-hover:scale-110 transition-all duration-300"
            />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            TBtracker
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:block">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full shadow-sm p-1.5">
            <ul className="flex items-center gap-1">
              {tabs.map((tab) => (
                <Link
                  to={tab.path}
                  key={tab.name}
                  className={`relative px-4 py-2 flex items-center gap-2 font-medium text-sm transition-all duration-300 rounded-full
                    ${
                      activeTab === tab.name
                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.icon} {tab.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Profile & Menu */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-3 bg-white rounded-full pl-2 pr-4 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-100">
                <img src={avatar || "/placeholder.svg"} alt="profile" className="h-full w-full object-cover" />
              </div>
              <span className="font-medium text-gray-800 text-sm">Dr.{medecinNom}</span>
            </button>

            {openDropdown && (
              <div className="absolute top-14 right-0 bg-white shadow-md rounded-md w-44 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                >
                  Se déconnecter
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800">
                  Aide
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            {showMenu ? <X className="h-5 w-5 text-gray-700" /> : <MenuIcon className="h-5 w-5 text-gray-700" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={showMenu ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 xl:hidden"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setShowMenu(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-3">
          {tabs.map((tab) => (
            <Link
              to={tab.path}
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name)
                setShowMenu(false)
              }}
              className={`w-full p-3 flex items-center gap-3 rounded-lg transition-all duration-300
                ${
                  activeTab === tab.name
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.name}</span>
              {activeTab === tab.name && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-100">
              <img src={avatar || "/placeholder.svg"} alt="profile" className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Dr.{medecinNom}</h3>
              <p className="text-sm text-gray-500">Médecin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300"
          >
            Déconnexion
          </button>
        </div>
      </motion.div>

      {/* Overlay when mobile menu is open */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

export default Navbar