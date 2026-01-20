import React from 'react';

import './App.css';
import { Routes, Route } from 'react-router-dom';

// import your pages/components
import Home from './Home';
import AddPatient from './AddPatient';
import AddClinicals from './AddClinicals';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/addclinicals" element={<AddClinicals />} />
        {/* Optional 404 route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
