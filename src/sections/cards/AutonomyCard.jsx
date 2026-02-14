import React from "react";
import coverImage from "../../pages/Autonomous/AutonomousCover.png";
import "./CardStyle.css";

export default function AutonomyCard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        Autonomous Surface Vessel
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        A modular retrofit system that transforms conventional boats into remotely operated and semi-autonomous vessels.
      </p>
    </div>
  );
}
