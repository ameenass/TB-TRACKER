
  // useEffect(() => {
  //   fetch("http://localhost:5000/patients/o6hzXDXTTz") //test avec un seul sans app jsx sans rien 
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Patient récupéré:", data);
  //       setPatient(data);
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la récupération du patient", error);
  //     });
  // }, []);
 




import React, { useState, useEffect } from "react";
import {UserCircle2, Phone,ChevronDown,ChevronRight,ListChecks,Plus,} from "lucide-react";
import { useParams } from "react-router-dom";
import FicheTraitementModal from "./FicheTraitementModal.jsx"; 

function FichePer() {
  const [patient, setPatient] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [fiches, setFiches] = useState([]);
  const [erreurFiche, setErreurFiche] = useState("");



  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Patient récupéré:", data);
        setPatient(data);
        
        fetch(`http://localhost:5000/patients/${id}/fiches`)
          .then((res) => res.json())
          .then((fichesData) => {
            console.log("Fiches récupérées:", fichesData);
            setFiches(fichesData);
          })
          .catch((error) =>
            console.error("Erreur lors de la récupération des fiches", error)
          );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du patient", error);
      });
  }, [id]);
  
  

  // useEffect(() => {
  //   fetch(`http://localhost:5000/patients/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Patient récupéré:", data);
  //       setPatient(data);
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la récupération du patient", error);
  //     });
  // }, [id]);

 
  
  if (!patient) return <div className="p-5">Chargement...</div>;

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto">
      {/* Patient Info */}
      <div className="ml-6 mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          {patient.nom} {patient.prenom}
        </h1>
        <div className="flex items-center mt-1 space-x-3">
          <span className="bg-white text-green-800 px-2 py-1 text-xs rounded-full">Création</span>
          <span className="text-gray-600 text-sm">ID: {patient.IDPatient}</span>
        </div>
      </div>

      {/* Infos sections */}
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {/* Général */}
          <div className="border-b border-gray-200">
            <div
              className="group cursor-pointer hover:bg-green-100"
              onClick={() => toggleSection("generalInfo")}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <UserCircle2 className="text-green-600 h-5 w-5" />
                  <h3 className="font-medium">Informations Générales</h3>
                </div>
                {expandedSection === "generalInfo" ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            {expandedSection === "generalInfo" && (
              <div className="px-4 pb-4 animate-slideDown">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Genre</span>
                    <span className="text-gray-800">{patient.sexe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de naissance</span>
                    <span className="text-gray-800">{patient.DateNaissance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adresse</span>
                    <span className="text-gray-800">
                      {patient.adresse?.commune}, {patient.adresse?.wilaya}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="border-b border-gray-200">
            <div
              className="group cursor-pointer hover:bg-green-100"
              onClick={() => toggleSection("contactInfo")}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="text-green-600 h-5 w-5" />
                  <h3 className="font-medium">Contact Info</h3>
                </div>
                {expandedSection === "contactInfo" ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            {expandedSection === "contactInfo" && (
              <div className="px-4 pb-4 animate-slideDown">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Numéro</span>
                    <span className="text-gray-800">{patient.numero}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="text-gray-800">{patient.email}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          
{/* Fiche de traitement */}
<div className="border-b border-gray-200">
  <div
    className="group cursor-pointer hover:bg-green-100"
    onClick={() => toggleSection("ficheDeTraitement")}
  >
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3 text-gray-700">
        <ListChecks className="text-green-600 h-5 w-5" />
        <h3 className="font-medium">Fiche de traitement</h3>
      </div>
      {expandedSection === "ficheDeTraitement" ? (
        <ChevronDown className="h-4 w-4 text-gray-400" />
      ) : (
        <ChevronRight className="h-4 w-4 text-gray-400" />
      )}
    </div>
  </div>

  {expandedSection === "ficheDeTraitement" && (
    <div className="px-4 pb-4 animate-slideDown space-y-4">
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => {
            const ficheNonCloturee = fiches.some(
              (fiche) =>
                fiche.statut.toLowerCase() !== "clôturée" &&
                fiche.statut.toLowerCase() !== "cloturée"  //tableau.some((element) => condition) true c la condition juste sinon..

            );
            if (ficheNonCloturee) {
              setErreurFiche("Une fiche est déjà en cours. Clôturez-la d’abord.");
            } else {
              setErreurFiche(""); // effacer erreur précédente
              setOpenModal(true);
            }
          }}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm text-sm font-semibold hover:border-green-500 hover:bg-green-100 hover:text-green-700 transition duration-150"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Fiche de traitement
        </button>
        {erreurFiche && (
          <span className="text-red-600 text-sm">{erreurFiche}</span>
        )}
        <FicheTraitementModal open={openModal} setOpenModal={setOpenModal} />
      </div>

      {/* Liste des fiches */}
      <div className="space-y-2">
        {fiches.map((fiche, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              window.location.href = `/fiche-details/${fiche.idfich}`;
            }}
          >
            <div className="text-gray-700">
              <span className="font-medium">
                fiche {fiche.date_debut}, {fiche.statut}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )}
</div>




        </div>
      </div>
    </div>
  );
}

export default FichePer;























{/* Treatment Plans */}
            {/* <div className="cursor-pointer">
              <div
                className="flex items-center justify-between p-4 hover:bg-green-100"
                onClick={() => toggleSection("ficheDeTraitement")}
              >
                <div className="flex items-center gap-3">
                  <div className="text-green-600">
                    <ListChecks className="h-5 w-5" />
                  </div>
                  <span className="text-gray-700">Fiche de traitement</span>
                </div>
                {expandedSection === "ficheDeTraitement" ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>

              {expandedSection === "ficheDeTraitement" && (
                <div className="px-4 pb-4 pl-12 text-sm text-gray-600 animate-slideDown">
                   <div className="mr-auto flex justify-end mt-4">
           <button onClick={()=>setOpenModal(true)} className="flex items-center gap-2 px-3 py-2 bg-white border-gray-300 text-gray-700 rounded-md shadow-sm text-sm font-semibold border hover:border-green-500 hover:bg-green-100 hover:text-green-700  transition duration-150">
             <Plus className="w-4 h-4 stroke-[2.5]" />Fiche de traitement
             </button>
           <FicheTraitementModal open={openModal} setOpenModal={setOpenModal} />
         </div>
                </div>
              )}
            </div> */}