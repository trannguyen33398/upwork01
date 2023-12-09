import React from "react";

import "./App.css";
import { UseCases } from "./pages/useCases";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return ( 
     <Router>
    <div className="App">
    <Routes>
          <Route path="/" element={<UseCases />}/>
            
         
         
        </Routes>
    </div>
    </Router>
  );
}

export default App;
