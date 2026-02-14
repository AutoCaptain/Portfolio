import React from "react";

export default function IntroText() {
  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1144px",
        minHeight: '200px',
        margin: "0 auto",
        padding: "40px 0",
        textAlign: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {/* Name */}
      <h1
        style={{
          fontSize: "36px",
          fontWeight: 500,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        Liam Williams
      </h1>

        {/* Roles */}
        <p
          style={{
            fontSize: "20px",
            margin: "14px 0 0 0",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Maritime Engineer &nbsp;·&nbsp; Naval Architect &nbsp;·&nbsp; Software Engineer
        </p>

        {/* Core Engineering */}
        <p
          style={{
            fontSize: "16px",
            margin: "10px 0 0 0",
            lineHeight: 1.8,
            opacity: 0.8,
          }}
        >
          Hydrodynamics &nbsp;·&nbsp; Structural analysis &nbsp;·&nbsp;
          Fatigue assessment &nbsp;·&nbsp; FEM &nbsp;·&nbsp; CFD &nbsp;·&nbsp;
          Numerical simulation &nbsp;·&nbsp; Concept design &nbsp;·&nbsp; Academic research
        </p>

        {/* Software & Technical Stack */}
        <p
          style={{
            fontSize: "16px",
            margin: "6px 0 0 0",
            lineHeight: 1.8,
            opacity: 0.65,
          }}
        >
          Python &nbsp;·&nbsp; C++ &nbsp;·&nbsp; React &nbsp;·&nbsp;
          PostgreSQL &nbsp;·&nbsp; MATLAB &nbsp;·&nbsp; Docker &nbsp;·&nbsp;
          Linux &nbsp;·&nbsp; Rhino &nbsp;·&nbsp; Blender &nbsp;·&nbsp; Ansys &nbsp;·&nbsp; PIAS
        </p>
    </div>
  );
}
