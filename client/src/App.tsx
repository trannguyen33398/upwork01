import "./App.css";
import { UseCases } from "./pages/use-cases/UseCases";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Benefit } from "./pages/benefits/Benefit";
import { Sprints } from "./pages/sprints/Sprints";
import { Bundles } from "./pages/bundles/Bundles";
import { BenefitCategories } from "./pages/benefit-categories/BenefitCategories";
import { Processes } from "./pages/processes/Processes";
import { Risks } from "./pages/risks/Risk";
import { Plants } from "./pages/plants/Plants";
import { Systems } from "./pages/systems/Systems";
import { ServiceLines } from "./pages/service-lines/ServiceLines";
import { CommunicationStreams } from "./pages/communication-streams/CommunicationStreams";
import { UseCaseCluster } from "./pages/use-case-cluster/UseCaseCluster";
import { MainMenu } from "./pages/main-menu/MainMenu";
import { MachineEdit } from "./pages/machines/edit";
import { MachineList } from "./pages/machines/list";
import { QueryClient, QueryClientProvider } from "react-query";
import { MachineCreate } from "./pages/machines/create";
import { ProcessList } from "./pages/processes/ProcessList";
import { ProcessCreate } from "./pages/processes/ProcessCreate";
import { ProcessEdit } from "./pages/processes/ProcessEdit";
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
            <Route path="/processes" element={<Processes />} />
            <Route path="/processes/all" element={<ProcessList />} />
            <Route path="/processes/create" element={<ProcessCreate />} />
            <Route
              path="/processes/edit/:processId"
              element={<ProcessEdit />}
            />
            <Route path="/risks" element={<Risks />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/systems" element={<Systems />} />
            <Route path="/machines/all" element={<MachineList />} />
            <Route path="/machine/create" element={<MachineCreate />} />
            <Route path="/machines/edit/:machineId" element={<MachineEdit />} />
            <Route path="/service-lines" element={<ServiceLines />} />
            <Route
              path="/communication-streams"
              element={<CommunicationStreams />}
            />
            <Route path="/use-case-cluster" element={<UseCaseCluster />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
