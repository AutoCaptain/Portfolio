import { Link, useLocation } from "react-router-dom";
import { scrollPositions } from "./ScrollManager.jsx";
import "./ProjectPage.css";

export default function ProjectCard({ to, children }) {
  const location = useLocation();

  const handleClick = () => {
    const currentPath = location.pathname;
    scrollPositions[currentPath] = window.scrollY;
  };

  return (
    <Link
      to={to}
      className="project-card"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
