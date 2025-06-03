
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Calendar, Phone, Mail, BadgeCheck, UserIcon as Male, UserIcon as Female, X } from "lucide-react"
import AdresseSearchDropdown from "./AdresseSearchDropdown"
//import CustomDatePicker from "./DatePicker"
const CheckboxF = ({ value, onChange, id }) => {
  const options = [
    { label: "Male", value: "male", icon: <Male className="w-4 h-4 mr-2" /> },
    { label: "Female", value: "female", icon: <Female className="w-4 h-4 mr-2" /> },
  ]

  const handleClear = (e) => {
    e.stopPropagation()
    onChange({ target: { value: "" } })
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map(({ label, value: val, icon }) => {
        const isSelected = value === val
        const optionId = `${id}-${val}`
        return (
          <div
            key={val}
            id={optionId}
            onClick={() => onChange({ target: { value: val } })}
            className={`flex items-center cursor-pointer px-4 py-2 border rounded-lg transition-all duration-150 uppercase text-sm font-medium relative
              ${
                isSelected
                  ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-emerald-50"
              }`}
          >
            {icon}
            {label}
            {isSelected && (
              <button
                onClick={handleClear}
                className="ml-2 bg-emerald-200 hover:bg-emerald-300 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3 text-emerald-700" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

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
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor={id} className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
        {Icon && <Icon className="w-5 h-5 text-emerald-500 mr-2" />}
        {isSelect ? (
          <select
            id={id}
            value={value}
            onChange={onChange}
            className="bg-transparent outline-none text-gray-700 w-full"
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
            className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
          />
        )}
      </div>
    </div>
  )
}

export default function Formulaire() {
  const [mot_de_passe, setIDPatient] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [adresse, setAdresse] = useState({ wilaya: "", commune: "" })
  const [numero, setNumero] = useState("")
  const [sexe, setSexe] = useState("")
  const [DateNaissance, setDateNaissance] = useState("")
  const [poidsInitial, setPoidsInitial] = useState(50)

  const handleEnregistrer = async () => {
    if (!nom || !prenom || !email || !sexe || !numero || !DateNaissance) {
      toast.error("Tous les champs doivent être remplis !")
      return
    }
    
    const formData = {
      mot_de_passe,
      nom,
      prenom,
      email,
      
      adresse: adresse,
      numero,
      sexe,
      DateNaissance,
       poidsInitial,
      
    };

    fetch('http://localhost:5000/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || "Erreur lors de l'enregistrement des données.");
          });
        }
        return response.json();
      })
      // a retirer 
      .then(data => {
        setIDPatient(data.mot_de_passe);
  
    
        toast.success("Données enregistrées avec succès !");
        toast.info(`Mot de passe du patient : ${data.mot_de_passe}`, {
          autoClose: false,
        });

        navigate(`/profile/${data.mot_de_passe}`);
        console.log("Mot de passe généré :", data.mot_de_passe);
      })
      .catch(error => {
        toast.error("Une erreur est survenue : " + error.message);
      });
    
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleEnregistrer();
    };
    const min = 10;
    const max = 150;
    const percent = ((poidsInitial - min) / (max - min)) * 100;
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-b from-emerald-50 to-white p-8 rounded-xl shadow-lg">
      <ToastContainer />
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Enregistrement Patient</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CustomFormField
            label="Nom"
            id="nom"
            fieldType="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            Icon={User}
          />
          <input  type="text" name="IDPatient" value={mot_de_passe} readOnly placeholder="Mot de passe généré" className="form-control"/>
          
          <CustomFormField
            label="Prénom"
            id="prenom"
            fieldType="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
            Icon={User}
          />
          <CustomFormField
            label="Date de naissance"
            id="DateNaissance"
            fieldType="date"
            value={DateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            placeholder=""
            Icon={Calendar}
          />
          <CustomFormField
            label="Téléphone"
            id="numero"
            fieldType="tel"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Téléphone"
            Icon={Phone}
          />
          <CustomFormField
            label="Email"
            id="email"
            fieldType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            Icon={Mail}
          />
        </div>

        {/* Adresse */}
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h3 className="text-lg font-medium text-emerald-800 mb-4">Adresse</h3>
          <AdresseSearchDropdown adresse={adresse} setAdresse={setAdresse} />
        </div>

        {/* Poids */}
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h3 className="text-lg font-medium text-emerald-800 mb-4">Poids</h3>
          <div className="w-full">
            <div className="relative w-full flex items-center p-2">
              <span
                className="absolute -top-6 text-lg font-semibold text-emerald-600"
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
                className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${percent}%, #dcfce7 ${percent}%, #dcfce7 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Sexe */}
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h3 className="text-lg font-medium text-emerald-800 mb-4">Sexe</h3>
          <CheckboxF id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
        >
          <span>Enregistrer</span>
        </button>
      </form>
    </div>
  )
}