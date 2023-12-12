import React from "react";

import "./App.css";
import { UseCases } from "./pages/useCases/UseCases";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Benefit} from "./pages/benefits/Benefit";



function App() {
  return ( 
     <Router>
    <div className="App">
    <Routes>
          <Route path="/" element={<UseCases />}/>
          <Route path="/benefit" element={<Benefit />}/>
         
         
        </Routes>
    </div>
    </Router>
  );
}

export default App;
