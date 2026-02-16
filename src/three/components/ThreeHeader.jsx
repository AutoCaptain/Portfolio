import { useNavigate } from "react-router-dom";
import "./ThreeHeaderStyle.css"
import BackButton from "../../pages/Logic/BackButton.jsx";

export default function ThreeHeader() {
  const navigate = useNavigate();

  return (
      <header
          style={{
              position: "sticky",
              top: 0,
              width: "100%",
              zIndex: 100,
              gridTemplateColumns: '56px 1fr',
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "72px",
              background: "transparent",
              pointerEvents: "auto",
          }}
      >
          {/* Back Arrow */}
          <div className="page-header-left">
              <BackButton/>
          </div>

          {/* Title */}
          <div
              style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.9)",
                  textAlign: "left",
                  paddingRight: "16px",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
              }}
          >
              Three.js World
          </div>
      </header>
  );
}
