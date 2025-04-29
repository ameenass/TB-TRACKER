import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ListePatients = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await fetch("http://localhost:5000/patients")
      const data = await res.json()
      setPatients(data)
    }

    fetchPatients()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Patients</h2>
      <ul className="space-y-2">
        {patients.map((p) => (
          <li key={p.ID}>
            <Link
              to={`/fiche/${p.ID}`}
              className="text-blue-600 hover:underline"
            >
              {p.Nom} {p.Prénom} (ID: {p.ID})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListePatients
