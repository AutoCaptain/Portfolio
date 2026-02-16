import React from "react";
import "./style.css";

function calculateDuration(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  const diffMs = now - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365.25);

  return { years, days: diffDays };
}

export default function MetricsStrip() {
  const cad = calculateDuration("2019-03-21");
  const coding = calculateDuration("2022-11-02");

  return (
    <div className="metrics-container">
      <div className="metrics-inner">

        <div className="metric-item">
          <div className="metric-label">CAD Experience</div>
          <div className="metric-value">{cad.years}+ Years</div>
        </div>

        <div className="metric-item">
          <div className="metric-label">Coding Experience</div>
          <div className="metric-value">{coding.years}+ Years</div>
        </div>

        <div className="metric-item">
          <div className="metric-label">Active Lines of Code</div>
          <div className="metric-value">174,000+</div>
        </div>

        <div className="metric-item">
          <div className="metric-label">Projects completed</div>
          <div className="metric-value">37+</div>
        </div>

      </div>
    </div>
  );
}
