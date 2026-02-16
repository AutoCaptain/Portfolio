import React from "react";
import coverImage from "../../pages/Three/ThreeCoverImage.png";
import "./CardStyle.css";

export default function ThreeCard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        Three.js World
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Take a dive into the abyss using Three.js, Blender and Rhino
      </p>
    </div>
  );
}
