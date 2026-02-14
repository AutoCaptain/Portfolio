import React from "react";
import coverImage from "../../pages/AISDB/AISCover.png";
import "./CardStyle.css";

export default function AISCard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        AIS Database
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Real-time maritime ingestion, time-series storage, and streaming API.
      </p>
    </div>
  );
}
