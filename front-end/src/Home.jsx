import Navbar from './Navbar.jsx';
import React from 'react';

function Home() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="pt-24 p-5">
        <h1 className="text-2xl font-bold text-teal-800">Bienvenue sur TBtracker</h1>
        <p className="mt-2 text-gray-600">Suivez vos patients et gérez les informations médicales facilement.</p>
      </div>
    </div>
  );
}

export default Home;

