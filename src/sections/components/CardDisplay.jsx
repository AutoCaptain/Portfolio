import { useState, useEffect } from "react";
import SegmentedToggle from "./SegmentedToggle.jsx";

import ProjectCard from "../../pages/Logic/ProjectCard.jsx";

import FACard from "../cards/FACard.jsx";
import AISCard from "../cards/AISCard.jsx";
import DashboardCard from "../cards/DashboardCard.jsx";
import OPECard from "../cards/OPECard.jsx";
import OPstackCard from "../cards/OPStackCard.jsx";
import AutonomyCard from "../cards/AutonomyCard.jsx";
import ConceptCard from "../cards/ConceptCard.jsx";

let savedCardMode = 0;

export default function CardDisplay() {

  const [mode, setMode] = useState(savedCardMode);

  const PROJECTS = [
    {
      id: "fatigue",
      route: "/FatigueAnalysis",
      component: FACard,
      highlight: true
    },
    {
      id: "ais",
      route: "/AISDatabase",
      component: AISCard,
      highlight: true
    },
    {
      id: "dashboard",
      route: "/Dashboard",
      component: DashboardCard,
      highlight: true
    },
    {
      id: "ope",
      route: "/OPE",
      component: OPECard,
      highlight: false
    },
    {
      id: "opstack",
      route: "/OPStack",
      component: OPstackCard,
      highlight: false
    },
    {
      id: "autonomy",
      route: "/Autonomy",
      component: AutonomyCard,
      highlight: false
    },
    {
      id: "concepts",
      route: "/Concepts",
      component: ConceptCard,
      highlight: false
    }
  ];

  useEffect(() => {
    savedCardMode = mode;
  }, [mode]);

  const visibleProjects =
    mode === 0
      ? PROJECTS.filter(p => p.highlight)
      : PROJECTS;

  return (
    <>
      {/* Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px"
        }}
      >
        <SegmentedToggle
          value={mode}
          option1="Highlights"
          option2="Extended"
          onChange={setMode}
        />
      </div>

      {/* Grid */}
      <div
        className="projects-grid"
        style={{ marginTop: "40px" }}
      >
        {visibleProjects.map(project => {
          const CardComponent = project.component;

          return (
            <ProjectCard key={project.id} to={project.route}>
              <CardComponent />
            </ProjectCard>
          );
        })}
      </div>
    </>
  );
}
