import { useState, useEffect } from "react"
import {
  Stethoscope,
  Lightbulb,
  AlertCircle,
  Shield,
  CheckCircle,
  Info,
  AlertTriangle,
  Search,
  Pill,
} from "lucide-react"

export default function Effetsec() {
  const [selectedMinorEffect, setSelectedMinorEffect] = useState("")
  const [selectedMajorEffect, setSelectedMajorEffect] = useState("")
  const [displayedMedicationName, setDisplayedMedicationName] = useState("votre traitement")
  const [searchTerm, setSearchTerm] = useState("")

  const medicationMap = {
    R: "Rifampicine",
    H: "Isoniazide",
    P: "Pyrazinamide",
    Z: "Pyrazinamide",
    E: "Ethambutol",
    S: "Streptomycin",
  }

  useEffect(() => {
    const storedSession = localStorage.getItem("patientSession")
    if (storedSession) {
      try {
        const sessionData = JSON.parse(storedSession)
        if (typeof sessionData.traitement === "string" && sessionData.traitement.trim() !== "") {
          const translatedMedications = sessionData.traitement
            .split("")
            .map((code) => medicationMap[code.toUpperCase()] || code)
          setDisplayedMedicationName(translatedMedications.join(" + "))
        } else {
          setDisplayedMedicationName("votre traitement")
        }
      } catch (e) {
        console.error("Error parsing patientSession from localStorage in Effetsec.jsx", e)
        setDisplayedMedicationName("votre traitement")
      }
    } else {
      setDisplayedMedicationName("votre traitement")
    }
  }, [])

  const symptomsData = [
    {
      langue: "fr",
      nom: "Anorexie",
      categorie: "mineur",
      description: "Perte d'appétit.",
      conduite_a_tenir:
        "Prise au cours des repas, ou traitement symptomatique. Si persiste plus d'un mois. consulter un médecin.",
    },
    {
      langue: "fr",
      nom: "Vomissements",
      categorie: "mineur",
      description: "Rejet gastrique fréquent.",
      conduite_a_tenir: "Traitement symptomatique.",
    },
    {
      langue: "fr",
      nom: "Nausées",
      categorie: "mineur",
      description: "Sensation de malaise et envie de vomir.",
      conduite_a_tenir: "Traitement symptomatique.",
    },
    {
      langue: "fr",
      nom: "Érythème",
      categorie: "mineur",
      description: "Rougeurs cutanées.",
      conduite_a_tenir: "Surveillance clinique et antihistaminique.",
    },
    {
      langue: "fr",
      nom: "Prurit isolé",
      categorie: "mineur",
      description: "Démangeaisons localisées.",
      conduite_a_tenir: "Surveillance.",
    },
    {
      langue: "fr",
      nom: "Acné du visage",
      categorie: "mineur",
      description: "Apparition d'acné sur le visage.",
      conduite_a_tenir: "Consulter un dermatologue si aggravation.",
    },
    {
      langue: "fr",
      nom: "Striction de la face",
      categorie: "mineur",
      description: "Raideur ou tension au niveau du visage.",
      conduite_a_tenir: "Diminution de la dose.",
    },
    {
      langue: "fr",
      nom: "Vertige",
      categorie: "mineur",
      description: "Sensation de tête qui tourne.",
      conduite_a_tenir: "Traitement symptomatique.",
    },
    {
      langue: "fr",
      nom: "Euphorie",
      categorie: "mineur",
      description: "Sentiment anormal de bien-être.",
      conduite_a_tenir: "Vérifier posologie et prise matinale.",
    },
    {
      langue: "fr",
      nom: "Insomnie",
      categorie: "mineur",
      description: "Difficulté à s'endormir ou à rester endormi.",
      conduite_a_tenir: "Surveillance.",
    },
    {
      langue: "fr",
      nom: "Arthralgies",
      categorie: "mineur",
      description: "Douleurs articulaires liées à l'élévation du taux sanguin dacide urique.",
      conduite_a_tenir: "Elles disparaissent après la phase intensive. Si persistent, avis d'un rhumatologue.",
    },
    {
      langue: "fr",
      nom: "Paresthésies des membres inférieurs",
      categorie: "mineur",
      description: "Picotements ou engourdissements des jambes.",
      conduite_a_tenir: "Vérifier posologie et prescrire pyridoxine.",
    },
    {
      langue: "fr",
      nom: "Anémie hémolytique",
      categorie: "majeur",
      description: "Fatigue intense, pâleur, urines foncées, jaunissement peau et yeux, essoufflement.",
      conduite_a_tenir: "Arrêt définitif du traitement et consulter un médecin.",
    },
    {
      langue: "fr",
      nom: "Purpura",
      categorie: "majeur",
      description:
        "Taches rouges/violettes sur la peau, non disparaissant à la pression, saignements faciles, fatigue.",
      conduite_a_tenir: "Consulter en cas de forme grave.",
    },
    {
      langue: "fr",
      nom: "Hépatite avec ictère",
      categorie: "majeur",
      description: "Jaunissement peau/yeux, nausées, vomissements, douleurs abdominales, urines foncées, prurit.",
      conduite_a_tenir:
        "Arrêt temporaire traitement, surveillance clinique et biologique, reprise possible en diminuant doses.",
    },
    {
      langue: "fr",
      nom: "Surdité et trouble vestibulaire",
      categorie: "majeur",
      description: "Diminution audition, acouphènes, troubles équilibre, nausées.",
      conduite_a_tenir: "Arrêt total et définitif du médicament.",
    },
    {
      langue: "fr",
      nom: "Névrite optique",
      categorie: "majeur",
      description: "Diminution acuité visuelle, perte vision couleurs, vision floue.",
      conduite_a_tenir: "Arrêt total et définitif du médicament.",
    },
    {
      langue: "fr",
      nom: "Épilepsie",
      categorie: "majeur",
      description: "Convulsions, perte de connaissance, agitation, sensations de picotements.",
      conduite_a_tenir: "Contrôle posologie et consulter un médecin si besoin.",
    },
    {
      langue: "fr",
      nom: "Anurie",
      categorie: "majeur",
      description: "Diminution ou absence de production d'urine, fatigue extrême, œdème, confusion.",
      conduite_a_tenir: "Urgence médicale, consulter rapidement.",
    },
  ]

  const filterSymptoms = (category) =>
    symptomsData.filter(
      (s) =>
        s.categorie === category &&
        (searchTerm === "" ||
          s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )

  const minorSideEffects = filterSymptoms("mineur")
  const majorSideEffects = filterSymptoms("majeur")
  const selectedMinorDetails = symptomsData.find((s) => s.nom.toLowerCase().replace(/\s/g, "_") === selectedMinorEffect)
  const selectedMajorDetails = symptomsData.find((s) => s.nom.toLowerCase().replace(/\s/g, "_") === selectedMajorEffect)

  const handleSelect = (symptom, isMinor) => {
    const key = symptom.nom.toLowerCase().replace(/\s/g, "_")
    if (isMinor) {
      setSelectedMinorEffect(key)
      setSelectedMajorEffect("")
    } else {
      setSelectedMajorEffect(key)
      setSelectedMinorEffect("")
    }
  }

  const EffectCard = ({ symptom, isSelected, isMinor, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${isSelected ? `${isMinor ? "bg-teal-50 border-teal-200" : "bg-red-50 border-red-200"} shadow-sm` : `bg-gray-50 border-gray-100 hover:${isMinor ? "bg-teal-50 hover:border-teal-200" : "bg-red-50 hover:border-red-200"}`}`}
    >
      <div className="flex items-center">
        <div className={`w-2 h-2 ${isMinor ? "bg-teal-400" : "bg-red-400"} rounded-full mr-3`}></div>
        <span className="font-medium text-gray-800">{symptom.nom}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1 ml-5">{symptom.description}</p>
    </button>
  )

  const selectedDetails = selectedMinorDetails || selectedMajorDetails
  const isMinorSelected = !!selectedMinorDetails

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Effets Secondaires de
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            <span className="font-semibold text-teal-600">{displayedMedicationName}</span>
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un effet secondaire..."
              className="w-full pl-10 pr-4 py-3 border border-green-800 rounded-xl focus:ring-1 focus:ring-green-500 focus:border-green-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4">
              <div className="flex items-center text-white">
                <Info className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-bold">Effets Mineurs</h2>
              </div>
              <p className="text-teal-50 text-sm mt-1">Généralement bénins et temporaires</p>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {minorSideEffects.map((symptom, index) => (
                  <EffectCard
                    key={index}
                    symptom={symptom}
                    isSelected={selectedMinorEffect === symptom.nom.toLowerCase().replace(/\s/g, "_")}
                    isMinor={true}
                    onClick={() => handleSelect(symptom, true)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
              <div className="flex items-center text-white">
                <AlertTriangle className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-bold">Effets Majeurs</h2>
              </div>
              <p className="text-red-50 text-sm mt-1">Nécessitent une attention médicale</p>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {majorSideEffects.map((symptom, index) => (
                  <EffectCard
                    key={index}
                    symptom={symptom}
                    isSelected={selectedMajorEffect === symptom.nom.toLowerCase().replace(/\s/g, "_")}
                    isMinor={false}
                    onClick={() => handleSelect(symptom, false)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {!selectedDetails ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Informations détaillées</h3>
                <p className="text-gray-500">
                  Sélectionnez un effet secondaire pour voir ses détails et recommandations.
                </p>
              </div>
            ) : (
              <div>
                <div
                  className={`p-4 ${isMinorSelected ? "bg-gradient-to-r from-teal-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-orange-500"}`}
                >
                  <div className="flex items-center text-white">
                    {isMinorSelected ? <Info className="w-6 h-6 mr-2" /> : <AlertTriangle className="w-6 h-6 mr-2" />}
                    <h3 className="text-xl font-bold">{selectedDetails.nom}</h3>
                  </div>
                  <div
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${isMinorSelected ? "bg-teal-200 text-teal-800" : "bg-red-200 text-red-800"}`}
                  >
                    {isMinorSelected ? "Effet Mineur" : "Effet Majeur"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                      <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
                      Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {selectedDetails.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${isMinorSelected ? "text-emerald-500" : "text-orange-500"}`}
                      />
                      Conduite à tenir
                    </h4>
                    <div
                      className={`p-4 rounded-lg border-l-4 ${isMinorSelected ? "bg-emerald-50 border-emerald-400" : "bg-orange-50 border-orange-400"}`}
                    >
                      <p className="text-gray-700 leading-relaxed">{selectedDetails.conduite_a_tenir}</p>
                    </div>
                  </div>
                  {!isMinorSelected && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center text-red-800 mb-2">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Attention</span>
                      </div>
                      <p className="text-red-700 text-sm">
                        Cet effet secondaire nécessite une surveillance médicale. Contactez votre médecin si vous
                        ressentez ces symptômes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
