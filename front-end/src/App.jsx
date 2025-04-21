// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './index.css';

// import Formulaire from './ajouterPatient.jsx';
// import Navbar from './HomePage.jsx';
// function App() {
  
//   return (
//     <Router>
//       <div>
//         {/* Menu de navigation */}
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="ajouterpatient">  ajout</Link>
          
//         </nav>
//         <Routes>
//         <Route path="/" element={<Navbar/>} />
//         <Route path='ajouterpatient' element={<Formulaire/>} />
        
//       </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;















import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './Layout.jsx';
import './index.css';
import Formulaire from './ajouterPatient.jsx';
import SearchPatient from './SearchPatient.jsx';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Route with Layout (Navbar + Outlet) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rechercher" element={<SearchPatient />} />
          <Route path="ajouterpatient" element={<Formulaire />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;