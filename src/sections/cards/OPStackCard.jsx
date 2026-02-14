import React from "react";
import coverImage from "../../pages/OPE/OPECover.png";
import "./CardStyle.css";

export default function OPECard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        Operational Intelligence Platform
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Converts operational behavior into energy estimates and comparative efficiency benchmarks.
      </p>
    </div>
  );
}
