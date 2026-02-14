import React from "react";
import coverImage from "../../pages/ModularDashboard/DashboardCover.png";
import "./CardStyle.css";

export default function DashboardCard() {
  return (
    <div className="fa-card-content">
      <h3 className="fa-card-title">
        Modular Dashboard UI
      </h3>

      <div className="fa-card-image-wrapper">
        <img
          src={coverImage}
          alt="Fatigue Analysis Cover"
          className="fa-card-image"
        />
      </div>

      <p className="fa-card-description">
        Gird based dashboard with components and custom layouts to display anything
      </p>
    </div>
  );
}
