
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

//       // Stocker l’état de connexion et infos
//       localStorage.setItem("isMedecinLoggedIn", "true")
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
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50">
//       <div className="max-w-md w-full bg-gradient-to-b from-white to-emerald-50 p-8 rounded-xl shadow-lg border border-emerald-100">
//         <ToastContainer />
//         <div className="mb-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-800">Connexion Médecin</h2>
//           <p className="text-gray-600 mt-2 text-sm">
//             Accès réservé au personnel médical autorisé
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <CustomFormField
//             label="Nom"
//             id="nom"
//             fieldType="text"
//             value={nom}
//             onChange={(e) => setNom(e.target.value)}
//             placeholder="Nom"
//             Icon={User}
//           />

//           <CustomFormField
//             label="Mot de passe"
//             id="motDePasse"
//             fieldType="password"
//             value={motDePasse}
//             onChange={(e) => setMotDePasse(e.target.value)}
//             placeholder="Votre mot de passe"
//             Icon={Lock}
//           />

//           <button
//             type="submit"
//             className="w-full py-3 mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
//             Se connecter
//           </button>
//         </form>
//       </div>
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
// import { User, Lock, Stethoscope, Heart, Shield } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import lungs from "./assets/lungs.png"

// // Accept updateLoginStatus as a prop
// export default function ConnexionMedecin({ updateLoginStatus }) {
//   const [nom, setNom] = useState("")
//   const [motDePasse, setMotDePasse] = useState("")
//   const [emailPatient, setEmailPatient] = useState("")
//   const [motDePassePatient, setMotDePassePatient] = useState("")
//   const [showMedecinLogin, setShowMedecinLogin] = useState(true)
//   const navigate = useNavigate()

//   const handleConnexion = async () => {
//     if (!nom || !motDePasse) {
//       toast.error("Tous les champs sont obligatoires.")
//       return
//     }

//     const credentials = { nom: nom, mot_de_passe: motDePasse }

//     try {
//       const response = await fetch("http://localhost:5000/login-medecin", {
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

//       localStorage.setItem("isMedecinLoggedIn", "true")
//       localStorage.setItem("medecinToken", data.token)
//       if (data.nomMedecin) {
//         localStorage.setItem("medecinNom", data.nomMedecin)
//       }

//       updateLoginStatus()
//       navigate("/accueil")
//     } catch (error) {
//       toast.error("Échec de la connexion : " + error.message)
//     }
//   }

//   const handleLoginPatient = async () => {
//     if (!emailPatient || !motDePassePatient) {
//       toast.error("Tous les champs sont obligatoires.")
//       return
//     }

//     const patientData = {
//       email: emailPatient,
//       mot_de_passe: motDePassePatient,
//     }

//     try {
//       const response = await fetch("http://localhost:5000/login-patient", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(patientData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || errorData.error || "Erreur inconnue")
//       }

//       const data = await response.json()
//       toast.success("Connexion patient réussie !")

//       localStorage.setItem("isPatientLoggedIn", "true")
//       localStorage.setItem("patientToken", data.token)

//       if (data.user) {
//         localStorage.setItem("patientNom", data.user.nom || "")
//         localStorage.setItem("patientPrenom", data.user.prenom || "")
//         localStorage.setItem("patientEmail", data.user.email || "")

//         if (data.user.fiche) {
//           localStorage.setItem("patientFiche", JSON.stringify(data.user.fiche))
//         } else {
//           localStorage.removeItem("patientFiche")
//         }

//         // CHANGE: Store 'sessions' (plural) if it exists, otherwise remove
//         if (data.user.sessions) { // Check for 'sessions' (plural)
//           localStorage.setItem("patientSessions", JSON.stringify(data.user.sessions)) // Store as 'patientSessions'
//         } else {
//           localStorage.removeItem("patientSessions")
//         }

//         localStorage.setItem("IDPatient", data.user.fiche?.id || "")
//       }

//       updateLoginStatus()
//       navigate("/accueil-patient")
//     } catch (error) {
//       toast.error("Erreur de connexion : " + error.message)
//     }
//   }


//   const handleSubmitMedecin = (e) => {
//     e.preventDefault()
//     handleConnexion()
//   }

//   const handleSubmitPatient = (e) => {
//     e.preventDefault()
//     handleLoginPatient()
//   }

//   return (
//     <div className="h-screen w-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex relative overflow-hidden">
//       {/* Enhanced background with CSS-only animations */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Animated background blobs using CSS transforms */}
//         <div
//           className="absolute -top-20 -right-20 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse"
//           style={{ animationDuration: "4s" }}
//         ></div>
//         <div
//           className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"
//           style={{ animationDuration: "6s", animationDelay: "2s" }}
//         ></div>
//         <div
//           className="absolute top-1/3 right-1/3 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDuration: "8s", animationDelay: "4s" }}
//         ></div>

//         {/* Pattern overlay */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
//             backgroundSize: "20px 20px",
//           }}
//         ></div>
//       </div>

//       {/* Left side - Logo and branding */}
//       <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10">
//         <div className="text-center">
//           <div className="mb-8">
//             <div className="w-32 h-32 mx-auto rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/40">
//               <div
//                 className="w-20 h-20 bg-gradient-to-r from-teal-600 to-emerald-600"
//                 style={{
//                   maskImage: `url(${lungs || "/placeholder.svg"})`,
//                   maskSize: "contain",
//                   maskRepeat: "no-repeat",
//                   maskPosition: "center",
//                   WebkitMaskImage: `url(${lungs || "/placeholder.svg"})`,
//                   WebkitMaskSize: "contain",
//                   WebkitMaskRepeat: "no-repeat",
//                   WebkitMaskPosition: "center",
//                 }}
//               />
//             </div>
//           </div>

//           <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-15 drop-shadow-lg">
//             Bienvenue sur TBtracker
//           </h1>

//           <div className="flex flex-col gap-4 text-gray-500">
//             <div className="flex items-center justify-center gap-3">
//               <Stethoscope className="w-5 h-5" />
//               <span className="text-md">Suivi médical professionnel</span>
//             </div>
//             <div className="flex items-center justify-center gap-3">
//               <Heart className="w-5 h-5" />
//               <span className="text-md">Soins personnalisés</span>
//             </div>
//             <div className="flex items-center justify-center gap-3">
//               <Shield className="w-5 h-5" />
//               <span className="text-md">Sécurité garantie</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right side - Login form */}
//       <div className="flex-1 flex items-center justify-center p-8 relative z-10">
//         <div className="w-full max-w-md">
//           <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
//             <ToastContainer />

//             <div className="mb-8 text-center">
//               <h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
//             </div>

//             {/* Toggle buttons */}
//             <div className="flex justify-center mb-8">
//               <div className="bg-gray-100 p-1 rounded-2xl">
//                 <button
//                   className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
//                     showMedecinLogin
//                       ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                   onClick={() => setShowMedecinLogin(true)}
//                 >
//                   Médecin
//                 </button>
//                 <button
//                   className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
//                     !showMedecinLogin
//                       ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                   onClick={() => setShowMedecinLogin(false)}
//                 >
//                   Patient
//                 </button>
//               </div>
//             </div>

//             {showMedecinLogin ? (
//               <form onSubmit={handleSubmitMedecin} className="space-y-6">
//                 <CustomFormField
//                   label="Nom"
//                   id="nom"
//                   fieldType="text"
//                   value={nom}
//                   onChange={(e) => setNom(e.target.value)}
//                   placeholder="Nom du médecin"
//                   Icon={User}
//                 />

//                 <CustomFormField
//                   label="Mot de passe"
//                   id="motDePasse"
//                   fieldType="password"
//                   value={motDePasse}
//                   onChange={(e) => setMotDePasse(e.target.value)}
//                   placeholder="Votre mot de passe"
//                   Icon={Lock}
//                 />

//                 <button
//                   type="submit"
//                   className="w-full py-4 mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
//                 >
//                   Se connecter
//                 </button>
//               </form>
//             ) : (
//               <form onSubmit={handleSubmitPatient} className="space-y-6">
//                 <CustomFormField
//                   label="Email"
//                   id="emailPatient"
//                   fieldType="email"
//                   value={emailPatient}
//                   onChange={(e) => setEmailPatient(e.target.value)}
//                   placeholder="Votre email"
//                   Icon={User}
//                 />

//                 <CustomFormField
//                   label="Mot de passe"
//                   id="motDePassePatient"
//                   fieldType="password"
//                   value={motDePassePatient}
//                   onChange={(e) => setMotDePassePatient(e.target.value)}
//                   placeholder="Mot de passe reçu"
//                   Icon={Lock}
//                 />

//                 <button
//                   type="submit"
//                   className="w-full py-4 mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
//                 >
//                   Se connecter
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const CustomFormField = ({ id, label, fieldType, value, onChange, placeholder, Icon }) => {
//   return (
//     <div className="flex flex-col space-y-2 w-full">
//       <label htmlFor={id} className="text-gray-700 text-sm font-semibold">
//         {label}
//       </label>
//       <div className="relative">
//         <div className="flex items-center border-2 border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm focus-within:border-teal-400 focus-within:ring-teal-100 transition-all duration-300 hover:border-teal-300">
//           {Icon && <Icon className="w-5 h-5 text-teal-500 mr-3" />}
//           <input
//             id={id}
//             type={fieldType}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400 font-medium"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Lock, Stethoscope, Heart, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import lungs from "./assets/lungs.png"

// Accept updateLoginStatus as a prop
export default function ConnexionMedecin({ updateLoginStatus }) {
  const [nom, setNom] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [emailPatient, setEmailPatient] = useState("")
  const [motDePassePatient, setMotDePassePatient] = useState("")
  const [showMedecinLogin, setShowMedecinLogin] = useState(true)
  const navigate = useNavigate()
  const handleConnexion = async () => {
    if (!nom || !motDePasse) {
      toast.error("Tous les champs sont obligatoires.")
      return
    }

    const credentials = { nom: nom, mot_de_passe: motDePasse }

    try {
      const response = await fetch("http://localhost:5000/login-medecin", {
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

      localStorage.setItem("isMedecinLoggedIn", "true")
      localStorage.setItem("medecinToken", data.token)
      if (data.nomMedecin) {
        localStorage.setItem("medecinNom", data.nomMedecin)
      }

      updateLoginStatus()
      navigate("/accueil")
    } catch (error) {
      toast.error("Échec de la connexion : " + error.message)
    }
  }

  const handleLoginPatient = async () => {
    if (!emailPatient || !motDePassePatient) {
      toast.error("Tous les champs sont obligatoires.")
      return
    }

    const patientData = {
      email: emailPatient,
      mot_de_passe: motDePassePatient,
    }

    try {
      const response = await fetch("http://localhost:5000/login-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || errorData.error || "Erreur inconnue")
      }

      const data = await response.json()
      toast.success("Connexion patient réussie !")

      localStorage.setItem("isPatientLoggedIn", "true")
      localStorage.setItem("patientToken", data.token)

      if (data.user) {
        localStorage.setItem("patientNom", data.user.nom || "")
        localStorage.setItem("patientPrenom", data.user.prenom || "")
        localStorage.setItem("patientEmail", data.user.email || "")

        if (data.user.fiche) {
          localStorage.setItem("patientFiche", JSON.stringify(data.user.fiche))
        } else {
          localStorage.removeItem("patientFiche")
        }

        // CHANGE: Store 'sessions' (plural) if it exists, otherwise remove
        if (data.user.sessions) { // Check for 'sessions' (plural)
          localStorage.setItem("patientSessions", JSON.stringify(data.user.sessions)) // Store as 'patientSessions'
        } else {
          localStorage.removeItem("patientSessions")
        }

        localStorage.setItem("IDPatient", data.user.fiche?.id || "")
      }

      updateLoginStatus()
      navigate("/accueil-patient")
    } catch (error) {
      toast.error("Erreur de connexion : " + error.message)
    }
  }


  const handleSubmitMedecin = (e) => {
    e.preventDefault()
    handleConnexion()
  }

  const handleSubmitPatient = (e) => {
    e.preventDefault()
    handleLoginPatient()
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex relative overflow-hidden">
      {/* Enhanced background with CSS-only animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background blobs using CSS transforms */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "4s" }}
        ></div>

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Left side - Logo and branding */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/40">
              <div
                className="w-20 h-20 bg-gradient-to-r from-teal-600 to-emerald-600"
                style={{
                  maskImage: `url(${lungs || "/placeholder.svg"})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${lungs || "/placeholder.svg"})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-15 drop-shadow-lg">
            Bienvenue sur TBtracker
          </h1>

          <div className="flex flex-col gap-4 text-gray-500">
            <div className="flex items-center justify-center gap-3">
              <Stethoscope className="w-5 h-5" />
              <span className="text-md">Suivi médical professionnel</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-5 h-5" />
              <span className="text-md">Soins personnalisés</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-5 h-5" />
              <span className="text-md">Sécurité garantie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
            <ToastContainer />

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
            </div>

            {/* Toggle buttons */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-2xl">
                <button
                  className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    showMedecinLogin
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setShowMedecinLogin(true)}
                >
                  Médecin
                </button>
                <button
                  className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    !showMedecinLogin
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setShowMedecinLogin(false)}
                >
                  Patient
                </button>
              </div>
            </div>

            {showMedecinLogin ? (
              <form onSubmit={handleSubmitMedecin} className="space-y-6">
                <CustomFormField
                  label="Nom"
                  id="nom"
                  fieldType="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Nom du médecin"
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
                  className="w-full py-4 mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  Se connecter
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmitPatient} className="space-y-6">
                <CustomFormField
                  label="Email"
                  id="emailPatient"
                  fieldType="email"
                  value={emailPatient}
                  onChange={(e) => setEmailPatient(e.target.value)}
                  placeholder="Votre email"
                  Icon={User}
                />

                <CustomFormField
                  label="Mot de passe"
                  id="motDePassePatient"
                  fieldType="password"
                  value={motDePassePatient}
                  onChange={(e) => setMotDePassePatient(e.target.value)}
                  placeholder="Mot de passe reçu"
                  Icon={Lock}
                />

                <button
                  type="submit"
                  className="w-full py-4 mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  Se connecter
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomFormField = ({ id, label, fieldType, value, onChange, placeholder, Icon }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor={id} className="text-gray-700 text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center border-2 border-gray-200 rounded-xl p-4 bg-white/70 backdrop-blur-sm focus-within:border-teal-400 focus-within:ring-teal-100 transition-all duration-300 hover:border-teal-300">
          {Icon && <Icon className="w-5 h-5 text-teal-500 mr-3" />}
          <input
            id={id}
            type={fieldType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400 font-medium"
          />
        </div>
      </div>
    </div>
  )
}

