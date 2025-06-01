// import { useState } from "react"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { User, Lock } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// export default function ConnexionMedecin() {
//   const [nomUtilisateur, setNomUtilisateur] = useState("")
//   const [motDePasse, setMotDePasse] = useState("")
//   const navigate = useNavigate()

//   const handleConnexion = async () => {
//     if (!nomUtilisateur || !motDePasse) {
//       toast.error("Tous les champs sont obligatoires.")
//       return
//     }

//     const credentials = {
//       nomUtilisateur,
//       motDePasse
//     }

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Identifiants incorrects.")
//       }

//       const data = await response.json()
//       toast.success("Connexion réussie !")
      
//       // Stocker les informations du médecin
//       localStorage.setItem("medecinNom", data.nomMedecin)
//       localStorage.setItem("medecinToken", data.token)

//       // Redirection vers l'accueil
//       navigate("/accueil")

//     } catch (error) {
//       toast.error("Échec de la connexion : " + error.message)
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     handleConnexion()
//   }

//   return (
//     <div className="max-w-md mx-auto bg-gradient-to-b from-emerald-50 to-white p-8 rounded-xl shadow-lg">
//       <ToastContainer />
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-800">Connexion Médecin</h2>
//         <p className="text-gray-600 mt-2 text-sm">
//           Accès réservé au personnel médical autorisé
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <CustomFormField
//           label="Nom d'utilisateur"
//           id="nomUtilisateur"
//           fieldType="text"
//           value={nomUtilisateur}
//           onChange={(e) => setNomUtilisateur(e.target.value)}
//           placeholder="Votre nom d'utilisateur"
//           Icon={User}
//         />
        
//         <CustomFormField
//           label="Mot de passe"
//           id="motDePasse"
//           fieldType="password"
//           value={motDePasse}
//           onChange={(e) => setMotDePasse(e.target.value)}
//           placeholder="Votre mot de passe"
//           Icon={Lock}
//         />

//         <button
//           type="submit"
//           className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
//           Se connecter
//         </button>
//       </form>
//     </div>
//   )
// }

// const CustomFormField = ({
//   id,
//   label,
//   fieldType,
//   value,
//   onChange,
//   placeholder,
//   Icon,
// }) => {
//   return (
//     <div className="flex flex-col space-y-1 w-full">
//       <label htmlFor={id} className="text-gray-700 text-sm font-medium">
//         {label}
//       </label>
//       <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
//         {Icon && <Icon className="w-5 h-5 text-sky-500 mr-2" />}
//         <input
//           id={id}
//           type={fieldType}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
//         />
//       </div>
//     </div>
//   )
// }


// import { useState } from "react"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { User, Lock } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// export default function ConnexionMedecin() {
//   const [nom, setNom] = useState("")
//   const [motDePasse, setMotDePasse] = useState("")
//   const navigate = useNavigate()

//   const handleConnexion = async () => {
//     if (!nom || !motDePasse) {
//       toast.error("Tous les champs sont obligatoires.")
//       return
//     }

//     const credentials = {
//       nom: nom,
//       mot_de_passe: motDePasse
//     }

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Identifiants incorrects.")
//       }

//       const data = await response.json()
//       toast.success("Connexion réussie !")

//       // Stocker le token et le nom du médecin
//       localStorage.setItem("medecinToken", data.token)
//       if (data.nomMedecin) {
//         localStorage.setItem("medecinNom", data.nomMedecin)
//       }

//       navigate("/accueil")
//     } catch (error) {
//       toast.error("Échec de la connexion : " + error.message)
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     handleConnexion()
//   }

//   return (
//     <div className="max-w-md mx-auto bg-gradient-to-b from-emerald-50 to-white p-8 rounded-xl shadow-lg">
//       <ToastContainer />
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-800">Connexion Médecin</h2>
//         <p className="text-gray-600 mt-2 text-sm">
//           Accès réservé au personnel médical autorisé
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <CustomFormField
//           label="Nom"
//           id="nom"
//           fieldType="nom"
//           value={nom}
//           onChange={(e) => setNom(e.target.value)}
//           placeholder="Nom"
//           Icon={User}
//         />

//         <CustomFormField
//           label="Mot de passe"
//           id="motDePasse"
//           fieldType="password"
//           value={motDePasse}
//           onChange={(e) => setMotDePasse(e.target.value)}
//           placeholder="Votre mot de passe"
//           Icon={Lock}
//         />

//         <button
//           type="submit"
//           className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
//           Se connecter
//         </button>
//       </form>
//     </div>
//   )
// }

// const CustomFormField = ({
//   id,
//   label,
//   fieldType,
//   value,
//   onChange,
//   placeholder,
//   Icon,
// }) => {
//   return (
//     <div className="flex flex-col space-y-1 w-full">
//       <label htmlFor={id} className="text-gray-700 text-sm font-medium">
//         {label}
//       </label>
//       <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
//         {Icon && <Icon className="w-5 h-5 text-sky-500 mr-2" />}
//         <input
//           id={id}
//           type={fieldType}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
//         />
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ConnexionMedecin() {
  const [nom, setNom] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const navigate = useNavigate()

  const handleConnexion = async () => {
    if (!nom || !motDePasse) {
      toast.error("Tous les champs sont obligatoires.")
      return
    }

    const credentials = {
      nom: nom,
      mot_de_passe: motDePasse
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Identifiants incorrects.")
      }

      const data = await response.json()
      toast.success("Connexion réussie !")

      // Stocker l’état de connexion et infos
      localStorage.setItem("isMedecinLoggedIn", "true")
      localStorage.setItem("medecinToken", data.token)
      if (data.nomMedecin) {
        localStorage.setItem("medecinNom", data.nomMedecin)
      }

      navigate("/accueil")
    } catch (error) {
      toast.error("Échec de la connexion : " + error.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleConnexion()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-md w-full bg-gradient-to-b from-white to-emerald-50 p-8 rounded-xl shadow-lg border border-emerald-100">
        <ToastContainer />
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Connexion Médecin</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Accès réservé au personnel médical autorisé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomFormField
            label="Nom"
            id="nom"
            fieldType="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            Icon={User}
          />

          <CustomFormField
            label="Mot de passe"
            id="motDePasse"
            fieldType="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Votre mot de passe"
            Icon={Lock}
          />

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
            Se connecter
          </button>
        </form>
      </div>
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
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor={id} className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
        {Icon && <Icon className="w-5 h-5 text-sky-500 mr-2" />}
        <input
          id={id}
          type={fieldType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
        />
      </div>
    </div>
  )
}
