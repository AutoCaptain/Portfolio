import React from "react";
import coverImage from "../../pages/Concept/ConceptCover.png";
import "./CardStyle.css";

export default function ConceptCard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        Concept design
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Design of vessels ro equipment in CAD and rendering
      </p>
    </div>
  );
}
