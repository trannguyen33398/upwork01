import "./App.css";
import { UseCases } from "./pages/use-cases/UseCases";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Benefit } from "./pages/benefits/Benefit";
import { Sprints } from "./pages/sprints/Sprints";
import { Bundles } from "./pages/bundles/Bundles";
import { BenefitCategories } from "./pages/benefit-categories/BenefitCategories";
import { RiskEdit } from "./pages/risks/RiskEdit";

import { MainMenu } from "./pages/main-menu/MainMenu";
import { MachineEdit } from "./pages/machines/edit";
import { MachineList } from "./pages/machines/list";
import { QueryClient, QueryClientProvider } from "react-query";
import { MachineCreate } from "./pages/machines/create";
import { ProcessList } from "./pages/processes/ProcessList";
import { ProcessCreate } from "./pages/processes/ProcessCreate";
import { ProcessEdit } from "./pages/processes/ProcessEdit";
import { ServiceLineList } from "./pages/service-lines/ServiceLineList";
import { ServiceLineCreate } from "./pages/service-lines/ServiceLineCreate";
import { PlantList } from "./pages/plants/PlantList";
import { PlantCreate } from "./pages/plants/PlantCreate";
import { PlantEdit } from "./pages/plants/PlantEdit";
import { ServiceLineEdit } from "./pages/service-lines/ServiceLineEdit";
import { UseCaseClusterList } from "./pages/use-case-cluster/UseCaseClusterList";
import { UseCaseClusterCreate } from "./pages/use-case-cluster/UseCaseClusterCreate";
import { UseCaseClusterEdit } from "./pages/use-case-cluster/UseCaseClusterEdit";
import { RiskList } from "./pages/risks/RiskList";
import { RiskCreate } from "./pages/risks/RiskCreate";
import { SystemList } from "./pages/systems/SystemsList";
import { SystemCreate } from "./pages/systems/SystemsCreate";
import { SystemEdit } from "./pages/systems/SystemsEdit";
import { CommunicationStreamList } from "./pages/communication-streams/CommunicationStreamList";
import { CommunicationStreamEdit } from "./pages/communication-streams/CommunicationStreamEdit";
import { CommunicationStreamCreate } from "./pages/communication-streams/CommunicationStreamCreate";
function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/use-case" element={<UseCases />} />
            <Route path="/benefits" element={<Benefit />} />
            <Route path="/sprints" element={<Sprints />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/benefit-categories" element={<BenefitCategories />} />
            <Route path="/processes/all" element={<ProcessList />} />
            <Route path="/processes/create" element={<ProcessCreate />} />
            <Route
              path="/processes/edit/:processId"
              element={<ProcessEdit />}
            />
            <Route path="/risks" element={<RiskList />} />
            <Route path="/plants/all" element={<PlantList />} />
            <Route path="/plants/create" element={<PlantCreate />} />
            <Route path="/plants/edit/:plantId" element={<PlantEdit />} />
            <Route path="/risks/all" element={<RiskList />} />
            <Route path="/risks/create" element={<RiskCreate />} />
            <Route path="/risks/edit/:riskId" element={<RiskEdit />} />
            <Route path="/systems/all" element={<SystemList />} />
            <Route path="/systems/create" element={<SystemCreate />} />
            <Route path="/systems/edit/:riskId" element={<SystemEdit />} />
            <Route path="/machines/all" element={<MachineList />} />
            <Route path="/machines/create" element={<MachineCreate />} />
            <Route path="/machines/edit/:machineId" element={<MachineEdit />} />
            <Route path="/service-lines/all" element={<ServiceLineList />} />
            <Route
              path="/service-lines/create"
              element={<ServiceLineCreate />}
            />
              <Route
              path="/service-lines/edit/:serviceLineId"
              element={<ServiceLineEdit />}
            />
            <Route
              path="/communication-streams/all"
              element={<CommunicationStreamList />}
            />
             <Route
              path="/communication-streams/edit/:communicationStreamId"
              element={<CommunicationStreamEdit />}
            />
             <Route
              path="/communication-streams/create"
              element={<CommunicationStreamCreate />}
            />
            <Route path="/use-case-cluster/all" element={<UseCaseClusterList />} />
            <Route path="/use-case-cluster/create" element={<UseCaseClusterCreate />} />
            <Route path="/use-case-cluster/edit/:useCaseClusterId" element={<UseCaseClusterEdit />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
