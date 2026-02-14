import { Routes, Route } from "react-router-dom";
import ScrollManager from "./pages/Logic/ScrollManager.jsx";

import Home from "./pages/Home.jsx";
import FatigueAnalysis from "./pages/FatigueAnalysis/FatigueAnalysis.jsx";
import AISPage from "./pages/AISDB/AISPage.jsx";
import DashboardPage from "./pages/ModularDashboard/DashboardPage.jsx";
import OPEPage from "./pages/OPE/OPEPage.jsx"
import AutonomousVesselPage from "./pages/Autonomous/AutonomousPage.jsx";
import Project6 from "./pages/Concept/Project6.jsx";
import OPStackPage from "./pages/OPStack/OPStackPage.jsx";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FatigueAnalysis" element={<FatigueAnalysis />} />
        <Route path="/AISDatabase" element={<AISPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/OPE" element={<OPEPage />} />
        <Route path="/OPStack" element={<OPStackPage />} />
        <Route path="/Autonomy" element={<AutonomousVesselPage />} />
        <Route path="/Concepts" element={<Project6 />} />
      </Routes>
    </>
  );
}
