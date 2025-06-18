
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

import { useState, useEffect } from "react"
import { UserCircle2, Phone, ChevronDown, ChevronRight, ListChecks, Plus , Trash2 } from "lucide-react"
import { useParams } from "react-router-dom"
import FicheTraitementModal from "./FicheTraitementModal.jsx"

function FichePer() {
  const [patient, setPatient] = useState(null)
  const [expandedSection, setExpandedSection] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [fiches, setFiches] = useState([])
  const [erreurFiche, setErreurFiche] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const { id } = useParams()

  useEffect(() => {
    // Add a timestamp parameter to prevent caching
    const timestamp = new Date().getTime()

    fetch(`http://localhost:5000/patients/${id}?t=${timestamp}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Patient récupéré:", data)
        setPatient(data)

        fetch(`http://localhost:5000/patients/${id}/fiches?t=${timestamp}`)
          .then((res) => res.json())
          .then((fichesData) => {
            console.log("Fiches récupérées:", fichesData)
            setFiches(fichesData)
          })
          .catch((error) => console.error("Erreur lors de la récupération des fiches", error))
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du patient", error)
      })
  }, [id, refreshKey])

  // Add this function to manually refresh data
  const refreshData = () => {
    setRefreshKey((oldKey) => oldKey + 1)
  }

  const handleSupprimerFiche = async (idfich, e) => {
  e.stopPropagation() // Empêche le déclenchement du click sur le parent
  
  if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette fiche ?")) {
    return
  }

  try {
    const response = await fetch(`http://localhost:5000/supprimer_fiche/${idfich}`, {
      method: 'DELETE',
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log('Suppression réussie:', result.message)
      // Rafraîchir les données
      refreshData()
    } else {
      console.error('Erreur lors de la suppression:', result.error)
      alert(`Erreur lors de la suppression: ${result.error}`)
    }
  } catch (error) {
    console.error('Erreur réseau:', error)
    alert('Erreur réseau lors de la suppression')
  }
}

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

  if (!patient) return <div className="p-5">Chargement...</div>

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto">
      {/* Patient Info */}
      <div className="ml-6 mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          {patient.nom} {patient.prenom}
        </h1>
        <div className="flex items-center mt-1 space-x-3">
          <span className="bg-white text-green-800 px-2 py-1 text-xs rounded-full">Création</span>
        </div>
      </div>

      {/* Infos sections */}
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {/* Général */}
          <div className="border-b border-gray-200">
            <div className="group cursor-pointer hover:bg-green-100" onClick={() => toggleSection("generalInfo")}>
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
            <div className="group cursor-pointer hover:bg-green-100" onClick={() => toggleSection("contactInfo")}>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="text-green-600 h-5 w-5" />
                  <h3 className="font-medium">Contact </h3>
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
            <div className="group cursor-pointer hover:bg-green-100" onClick={() => toggleSection("ficheDeTraitement")}>
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
                      console.log("Toutes les fiches:", fiches) // Debug pour voir les statuts

                      const ficheEnCours = fiches.find((fiche) => {
                        const statut = fiche.statut ? fiche.statut.toLowerCase().trim() : "création"
                        console.log("Statut de la fiche:", statut) // Debug

                        // Liste des statuts qui indiquent qu'une fiche est fermée
                        const statutsFermes = ["décès", "cloturée", "perdu"]

                        // Une fiche est "en cours" si elle n'est pas dans les statuts fermés
                        return !statutsFermes.includes(statut)
                      })

                      if (ficheEnCours) {
                        console.log("Fiche en cours trouvée:", ficheEnCours) // Debug
                        setErreurFiche(
                          `Une fiche est déjà en cours (statut: ${ficheEnCours.statut}). Clôturez-la d'abord.`,
                        )
                      } else {
                        console.log("Aucune fiche en cours, autorisation de créer une nouvelle fiche")
                        setErreurFiche("") // effacer erreur précédente
                        setOpenModal(true)
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm text-sm font-semibold hover:border-green-500 hover:bg-green-100 hover:text-green-700 transition duration-150"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    Fiche de traitement
                  </button>
                  {erreurFiche && <span className="text-red-600 text-sm">{erreurFiche}</span>}
                  <FicheTraitementModal open={openModal} setOpenModal={setOpenModal} />
                </div>

                {/* Liste des fiches */}
               <div className="space-y-2">
  {fiches.map((fiche, index) => (
    <div
      key={index}
      className="flex justify-between items-center p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer group"
      onClick={() => {
        window.location.href = `/fiche-details/${fiche.idfich}`
      }}
    >
      <div className="text-gray-700">
        <span className="font-medium">
          fiche {fiche.date_debut}, {fiche.statut}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => handleSupprimerFiche(fiche.idfich, e)}
          className="
            text-red-500 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            p-1 
            hover:bg-red-50 
            rounded
          "
          title="Supprimer la fiche"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <ChevronRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  ))}
</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FichePer

{
  /* Treatment Plans */
}
{
  /* <div className="cursor-pointer">
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
            </div> */
}
