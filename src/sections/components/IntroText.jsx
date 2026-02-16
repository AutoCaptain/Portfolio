import React from "react";
import "./style.css";

export default function IntroText() {
  return (
      <div className="intro-container">
          <h1 className="intro-name">
              Liam Williams
          </h1>

          <p className="intro-roles">
              Maritime Engineer · Naval Architect · Software Engineer
          </p>

          <p className="positioning-sentence">
              Bridging maritime engineering and software to design, analyze, and deliver complex technical systems.
          </p>

          <p className="intro-section-label">Engineering</p>
          <p className="intro-core">
              Hydrodynamics · Structural analysis · Fatigue assessment · FEM · CFD ·
              Numerical simulation · Concept design · Academic research
          </p>

          <p className="intro-section-label">Technical Stack</p>
          <p className="intro-stack">
              Python · C++ · React · PostgreSQL · MATLAB · Docker · Linux ·
              Rhino · Blender · Ansys · PIAS
          </p>
      </div>
  );
}
