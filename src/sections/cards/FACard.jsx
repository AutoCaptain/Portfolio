import React from "react";
import coverImage from "../../pages/FatigueAnalysis/FatigueCoverImage.png";
import "./CardStyle.css";

export default function FACard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        TSHD Fatigue Analysis
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Structural fatigue evaluation of a hopper dredger combining coded strip theory simulator and FEM.
      </p>
    </div>
  );
}
