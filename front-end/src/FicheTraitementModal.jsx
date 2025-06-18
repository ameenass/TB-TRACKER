"use client"

import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Calendar, Check } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { useParams, useNavigate } from "react-router-dom"

const CustomFormField = ({
  id,
  label,
  fieldType,
  value,
  onChange,
  placeholder,
  Icon,
  isSelect = false,
  options = [],
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor={id} className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <div
        className={`flex items-center border border-emerald-200 rounded-lg p-2 bg-white focus-within:border-emerald-500 ${readOnly ? "bg-emerald-50" : ""}`}
      >
        {Icon && <Icon className="w-5 h-5 text-emerald-500 mr-2" />}
        {isSelect ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className="bg-transparent outline-none text-gray-700 w-full"
            disabled={readOnly}
          >
            <option value="">{placeholder}</option>
            {options.map((opt, idx) =>
              opt.options ? (
                <optgroup key={idx} label={opt.label}>
                  {opt.options.map((subOpt) => (
                    <option key={subOpt} value={subOpt}>
                      {subOpt}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ),
            )}
          </select>
        ) : (
          <input
            id={id}
            type={fieldType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`bg-transparent outline-none text-gray-700 w-full placeholder-gray-400 ${readOnly ? "cursor-not-allowed" : ""}`}
          />
        )}
      </div>
    </div>
  )
}

const CheckboxGroup = ({ label, options, selectedValues, onChange, name }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label key={option} className="inline-flex items-center">
            <input
              type="checkbox"
              className="hidden"
              name={name}
              value={option}
              checked={selectedValues.includes(option)}
              onChange={() => {
                if (selectedValues.includes(option)) {
                  onChange(selectedValues.filter((v) => v !== option))
                } else {
                  onChange([...selectedValues, option])
                }
              }}
            />
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-2 transition-colors ${
                selectedValues.includes(option) ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
              }`}
            >
              {selectedValues.includes(option) && <Check className="w-4 h-4 text-white" />}
            </div>
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function FicheTraitementModal({ open, setOpenModal }) {
  const [date_debut] = useState(new Date().toISOString().split("T")[0])
  const [statut] = useState("Creation")

  const [poidsInitial, setPoidsInitial] = useState(50)
  const [categorie, setCategorie] = useState("")
  const [preuve, setPreuve] = useState("")
  const [selectedSousType, setSelectedSousType] = useState("")
  const [Comptage_tuberculeux, setComptage_tuberculeux] = useState([])
  const [antecedents, setAntecedents] = useState([])
  const [note, setNote] = useState("")
  const [contraception, setContraception] = useState(false)
  const [patient, setPatient] = useState(null)
  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {
    console.log("🔍 FicheTraitementModal - ID from useParams:", id)
    fetch(`http://localhost:5000/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("🔍 FicheTraitementModal - Patient récupéré:", data)
        console.log("🔍 FicheTraitementModal - Patient IDPatient field:", data.IDPatient)
        console.log("🔍 FicheTraitementModal - Patient keys:", Object.keys(data))
        setPatient(data)
      })
      .catch((error) => {
        console.error("❌ FicheTraitementModal - Erreur lors de la récupération du patient", error)
      })
  }, [id])
  const handleEnregistrer = async () => {
    if (!poidsInitial || !categorie || !selectedSousType || !Comptage_tuberculeux) {
      toast.error("Tous les champs doivent être remplis !")
      return
    }

    console.log("🔍 FicheTraitementModal - Patient object:", patient)
    console.log("🔍 FicheTraitementModal - patient.IDPatient:", patient?.IDPatient)
    console.log("🔍 FicheTraitementModal - ID from useParams (should be IDPatient):", id)

    const formData = {
      idfich: uuidv4(),
      IDPatient: patient?.IDPatient || id, // Use patient.IDPatient if available, otherwise use id from URL

      statut,
      categorie,
      preuve,
      selectedSousType,
      Comptage_tuberculeux: Comptage_tuberculeux.length > 0,
      antecedents,
      poidsInitial: Number.parseFloat(poidsInitial),
      note: note || "",
      contraception,
    }

    console.log("🔍 FicheTraitementModal - FormData being sent:", formData)
    console.log("🔍 FicheTraitementModal - FormData IDPatient:", formData.IDPatient)

    try {
      console.log("FormData sent to backend:", formData)
      const response = await fetch("http://localhost:5000/ajouter_fiche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        toast.success("Données enregistrées avec succès !", {
          position: "bottom-right",
        })
        setOpenModal(false)
        // Instead of using navigate, which doesn't refresh the component state
        window.location.href = `/profile/${id}`
      } else {
        toast.error("Erreur lors de l'enregistrement des données.", {
          position: "bottom-right",
        })
      }
    } catch (error) {
      toast.error("Une erreur est survenue : " + error.message, {
        position: "bottom-right",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleEnregistrer()
  }

  const min = 10
  const max = 200
  const percent = ((poidsInitial - min) / (max - min)) * 100

  const typesTuberculose = {
    Pulmonaire: ["Jamais traitée", "Déjà traitée"],
    Extrapulmonaire: ["Pleurale", "Ganglionnaire", "Ostéoarticulaire", "Uro-génitale", "Méningée"],
  }

  const medecinNom = localStorage.getItem("medecinNom")

  if (!open) return null

  return (
    <div className="mx-auto overlay fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
      <div className="modalcontainer absolute bg-gradient-to-b from-emerald-50 to-white w-2/3 max-h-[90vh] overflow-y-auto mx-auto p-8 my-4 rounded-xl shadow-lg">
        <ToastContainer />
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Fiche de traitement</h2>
          <p className="text-lg text-emerald-600 mt-2">
            De: {patient?.nom} {patient?.prenom}
          </p>
          <p className="text-gray-600 mt-1">Créée par {medecinNom}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*Date de début */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="date_debut" className="text-gray-700 text-sm font-medium flex items-center">
                Date de début <span className="ml-1 text-xs text-gray-500">(automatique)</span>
              </label>
              <div className="flex items-center border border-emerald-200 rounded-lg p-2 bg-emerald-50 text-gray-600">
                <Calendar className="w-5 h-5 text-emerald-500 mr-2" />
                <span>{date_debut}</span>
              </div>
            </div>

            {/* Statut */}
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="statut" className="text-gray-700 text-sm font-medium flex items-center">
                Statut <span className="ml-1 text-xs text-gray-500">(automatique)</span>
              </label>
              <div className="p-2 border border-emerald-200 rounded-lg bg-emerald-50 text-gray-600">{statut}</div>
            </div>

            {/* ✍️ Champ à remplir : Type de la tuberculose */}
            <CustomFormField
              id="typeTuberculose"
              label="Type de la tuberculose"
              value={selectedSousType}
              onChange={(e) => setSelectedSousType(e.target.value)}
              placeholder="Sélectionnez un type"
              isSelect={true}
              options={Object.entries(typesTuberculose).map(([type, sousTypes]) => ({
                label: type,
                options: sousTypes,
              }))}
            />
          </div>

          {/* Section Catégorie */}
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Catégorie</h3>
            <div className="flex space-x-4">
              {["I", "II", "III"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="categorie"
                    value={cat}
                    checked={categorie === cat}
                    onChange={() => setCategorie(cat)}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 flex items-center justify-center mr-2 transition-colors ${
                      categorie === cat ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                    }`}
                  >
                    {categorie === cat && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-gray-700">Catégorie {cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Preuve */}
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Preuve</h3>
            <div className="grid grid-cols-3 gap-4">
              {["Bactériologique", "Histologique", "Sans preuve"].map((p) => (
                <label key={p} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preuve"
                    value={p}
                    checked={preuve === p}
                    onChange={() => setPreuve(p)}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 border-2 flex items-center justify-center mr-2 transition-colors ${
                      preuve === p ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                    }`}
                  >
                    {preuve === p && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-gray-700">{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Poids avec style amélioré */}
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Poids</h3>
            <div className="w-full px-4">
              <div className="relative w-full flex items-center">
                <span
                  className="absolute -top-8 text-lg font-semibold text-emerald-600"
                  style={{ left: `calc(${percent}% - 15px)` }}
                >
                  {poidsInitial} kg
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  id="poidsInitial"
                  value={poidsInitial}
                  onChange={(e) => setPoidsInitial(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${percent}%, #dcfce7 ${percent}%, #dcfce7 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section Comptage tuberculeux */}
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Comptage tuberculeux</h3>
            <CheckboxGroup
              label=""
              options={["Proches atteints", "Proches traités"]}
              selectedValues={Comptage_tuberculeux}
              onChange={setComptage_tuberculeux}
              name="Comptage_tuberculeux"
            />
          </div>

          {/* Section Antécédents */}
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Antécédents</h3>
            <CheckboxGroup
              label=""
              options={["Tuberculose", "HTA", "Diabète", "Insuffisance rénale", "Cardiopathie"]}
              selectedValues={antecedents}
              onChange={setAntecedents}
              name="antecedents"
            />
          </div>

          {/* Section Contraception  */}
          {patient && patient.sexe === "female" && (
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">Contraception</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={contraception}
                  onChange={(e) => setContraception(e.target.checked)}
                />
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center mr-2 transition-colors ${
                    contraception ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                  }`}
                >
                  {contraception && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="text-gray-700">Utilisation de contraceptifs</span>
              </label>
            </div>
          )}

          {/* Détails supplémentaires */}
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Détails supplémentaires</h3>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Ajoutez des détails supplémentaires ici..."
              className="w-full border border-emerald-200 rounded-lg p-3 bg-white text-gray-700 placeholder-gray-400 focus:border-emerald-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
          >
            Enregistrer la fiche
          </button>
        </form>
      </div>
    </div>
  )
}
