import { motion } from "framer-motion"
import { Search, UserPlus, FileText, Activity, ArrowRight, Users, Calendar, TrendingUp } from "lucide-react"
import lungs from "./assets/lungs.png"

function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Mock statistics data
  const stats = [
    { label: "Patients", value: "124", icon: <Users className="h-5 w-5" />, change: "+12%" },
    { label: "Consultations", value: "38", icon: <Calendar className="h-5 w-5" />, change: "+5%" },
    { label: "Taux de guérison", value: "87%", icon: <TrendingUp className="h-5 w-5" />, change: "+2%" },
  ]

  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg"
        >
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <img src={lungs || "/placeholder.svg"} alt="Background" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Bienvenue sur TBtracker</h1>
              <p className="text-teal-50 text-lg md:text-xl mb-8">
                App web de suivi des patients atteints de tuberculose. Gérez les dossiers médicaux, suivez les
                traitements et les effets secondaires et améliorez la qualité des soins.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href=""
                  className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Notre App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="/aide"
                  className="inline-flex items-center px-6 py-3 bg-teal-600/20 text-white rounded-full font-medium backdrop-blur-sm hover:bg-teal-600/30 transition-all duration-300"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home