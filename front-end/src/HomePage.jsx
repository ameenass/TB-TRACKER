// import lungs from "./assets/lungs.png";
// import avatar from "./assets/avatar.png";
// import { Menu as MenuIcon } from "lucide-react";
// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// import { Home, Search, UserPlus, BookOpen } from "lucide-react";

// const tabs = [
//   { name: "Home", icon: <Home size={20} />, path: "/" },
//   { name: "Rechercher", icon: <Search size={20} />, path: "#" }, // il faut regler ca apres
//   { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
//   { name: "Blog", icon: <BookOpen size={20} />, path: "/blog" },
// ];

// function Navbar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [activeTab, setActiveTab] = useState("Home");
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/patients");
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des patients");
//         }
//         let data = await response.json();

//         // pour valider les champs 
//         data = data.map((patient) => ({
//           ...patient,
//           nom: patient.nom || "",
//           prenom: patient.prenom || "",
//           id: patient.id || 0,
//         }));

//         setPatients(data);
//       } catch (error) {
//         console.error("Erreur: ", error);
//       }
//     };

//     fetchPatients();
//   }, []);

//   // filtrer les patients
//   const filteredPatients = searchTerm      //ici pour la fct toLower, il y a aussi la fonction trim() qui ignore les espaces dans la recherche
//     ? patients.filter((patient) => {
//         const fullName = `${patient.nom?.toLowerCase() || ""}, ${patient.prenom?.toLowerCase() || ""}`;
//         return (
//           (patient.nom?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || //par nom+verfication
//           (patient.prenom?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//           (patient.id?.toString() || "").includes(searchTerm) ||
//           fullName.includes(searchTerm.toLowerCase()) //par nom+prenom+verfication
//         );
//       })
//     : [];

//   return (
//     <div className="w-full h-full absolute bg-emerald-50">
//       <header className="flex justify-between items-center text-black py-5 px-8 md:px-35 drop-shadow-md">
//         <Link to="/" className="flex items-center space-x-2">
//           <img src={lungs} alt="lungs" className="w-8 h-7 hover:scale-105 transition-all" />
//           <h1 className="font-bold text-teal-800">TBtracker</h1>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="bg-emerald-100 border-1 rounded-3xl hidden xl:flex">
//           <ul className="flex items-center gap-3 font-semibold text-base relative">
//             {tabs.map((tab) => (
//               <Link
//                 to={tab.path}
//                 key={tab.name}
//                 className={`relative px-3 py-2 flex items-center gap-2 text-teal-800 rounded-3xl transition-all cursor-pointer ${
//                   activeTab === tab.name ? "bg-white shadow-md" : ""
//                 }`}
//                 onClick={() => setActiveTab(tab.name)}
//               >
//                 <span className="relative flex items-center gap-2">
//                   {tab.icon} {tab.name}
//                 </span>
//               </Link>
//             ))}
//           </ul>
//         </div>

//         {/*  barre de recherche dans rechercher */}
//         {activeTab === "Rechercher" && (
//           <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-1/2 bg-white shadow-md p-4 rounded-lg">
//             <input
//               type="text"
//               placeholder="Rechercher par nom, prénom, ID..."
//               className="w-full p-2 border rounded-lg shadow-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {/* ici mapping les cartes */}
//             {filteredPatients.length > 0 && (
//               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filteredPatients.map((patient) => (
//                   <div
//                     key={patient.id}
//                     className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
//                   >
//                     <h2 className="text-xl font-bold mb-2">
//                       {patient.nom} {patient.prenom}
//                     </h2>
//                     <p className="text-gray-700">ID : {patient.id}</p>
//                     <p className="text-gray-700">Âge : {patient.age || "Non renseigné"} ans</p>
//                     <p className="text-gray-700">Catégorie : {patient.categorie || ""}</p>
//                     <a href="#" className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 
//                     transition duration-200 inline-block text-center"> Profile
//                    </a>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Reste du code pour les notifications, paramètres, etc. */}
//         <div className="flex items-center space-x-6">
//           <div className="relative cursor-pointer rounded-full bg-white p-2">
//             <span className="text-teal-800">🔔</span>
//           </div>

//           <div className="cursor-pointer rounded-full bg-white p-2">
//             <span className="text-teal-800">⚙️</span>
//           </div>
//         </div>

//         {/* Profil */}
//         <div className="relative inline-block cursor-pointer text-left p-1">
//           <button className="flex items-center gap-2 bg-transparent rounded-lg hover:bg-gray-50 transition">
//             <img src={avatar} alt="profile" className="h-10 w-10 rounded-full" />
//             <span className="font-semibold text-teal-800">Dr.toumi</span>
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <MenuIcon className="xl:hidden block text-4xl cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
//       </header>

//       {/* Mobile Sidebar Menu */}
//       <motion.div
//         initial={{ x: "100%", opacity: 0 }}
//         animate={showMenu ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="absolute top-0 right-0 w-64 h-full bg-white flex flex-col items-center gap-6 font-semibold text-lg shadow-lg xl:hidden"
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






























import lungs from "./assets/lungs.png";
import avatar from "./assets/avatar.png";
import { Menu as MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Home, Search, UserPlus, BookOpen } from "lucide-react";

const tabs = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Rechercher", icon: <Search size={20} />, path: "#" }, // il faut regler ca apres
  { name: "Ajouter patient", icon: <UserPlus size={20} />, path: "/ajouterpatient" },
  { name: "Blog", icon: <BookOpen size={20} />, path: "/blog" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/patients");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des patients");
        }
        let data = await response.json();

        // pour valider les champs 
        data = data.map((patient) => ({
          ...patient,
          nom: patient.nom || "",
          prenom: patient.prenom || "",
          id: patient.id || 0,
        }));

        setPatients(data);
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };

    fetchPatients();
  }, []);

  // filtrer les patients
  const filteredPatients = searchTerm
    ? patients.filter((patient) => {
        const fullName = `${patient.nom?.toLowerCase() || ""}, ${patient.prenom?.toLowerCase() || ""}`;
        return (
          (patient.nom?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || //par nom+verfication
          (patient.prenom?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (patient.id?.toString() || "").includes(searchTerm) ||
          fullName.includes(searchTerm.toLowerCase()) //par nom+prenom+verfication
        );
      })
    : [];

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

        {/*  barre de recherche dans rechercher */}
        {activeTab === "Rechercher" && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-1/2 bg-white shadow-md p-4 rounded-lg">
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, ID..."
              className="w-full p-2 border rounded-lg shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* ici mapping les cartes */}
            {filteredPatients.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
                  >
                    <h2 className="text-xl font-bold mb-2">
                      {patient.nom} {patient.prenom}
                    </h2>
                    <p className="text-gray-700">ID : {patient.id}</p>
                    <p className="text-gray-700">Âge : {patient.age || "Non renseigné"} ans</p>
                    <p className="text-gray-700">Catégorie : {patient.categorie || "Non renseigné"}</p>
                    <a href="#" className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 
                    transition duration-200 inline-block text-center"> Profile
                   </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
