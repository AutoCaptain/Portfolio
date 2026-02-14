import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/arrow-left.svg?react";
import "./ProjectPage.css";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="back-button"
      onClick={() => navigate("/")}
    >
      <Arrow className="back-icon" />
    </button>
  );
}
