import React from "react";

import "./App.css";
import { UseCases } from "./pages/use-cases/UseCases";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Benefit} from "./pages/benefits/Benefit";
import {Sprints} from "./pages/sprints/Sprints";
import {Bundles} from "./pages/bundles/Bundles";
import {BenefitCategories} from "./pages/benefit-categories/BenefitCategories";
import {Processes} from "./pages/processes/Processes";
import {Risks} from "./pages/risks/Risk";
import {Plants} from "./pages/plants/Plants";
import {Systems} from "./pages/systems/Systems";
import {ServiceLines} from "./pages/service-lines/ServiceLines";
import {CommunicationStreams} from "./pages/communication-streams/CommunicationStreams";
import {UseCaseCluster} from "./pages/use-case-cluster/UseCaseCluster";



function App() {
  return ( 
     <Router>
    <div className="App">
    <Routes>
          <Route path="/" element={<UseCases />}/>
          <Route path="/benefit" element={<Benefit />}/>
         <Route path="/sprints" element={<Sprints />} />
        <Route path="/bundles" element={<Bundles />} />
        <Route path="/benefit-categories" element={<BenefitCategories />} />
        <Route path="/processes" element={<Processes />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/service-line" element={<ServiceLines />} />
        <Route path="/communication-streams" element={<CommunicationStreams />} />
        <Route path="/use-case-cluster" element={<UseCaseCluster />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
