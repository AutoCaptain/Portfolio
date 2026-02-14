import React from "react";
import coverImage from "../../pages/OPStack/OPStackCover.png";
import "./CardStyle.css";

export default function OPStackCard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        Operational Profile Engine
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Transforms raw AIS telemetry into structured vessel behavior and operational states.
      </p>
    </div>
  );
}
