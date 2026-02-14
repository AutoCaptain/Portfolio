export default function PageHeader({ title, leftComponent = null }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "72px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",

        background: "rgba(8, 20, 30, 0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
      }}
    >
      {leftComponent && (
        <div
          style={{
            position: "absolute",
            left: "24px",
            pointerEvents: "auto",
          }}
        >
          {leftComponent}
        </div>
      )}

      <div
        style={{
          pointerEvents: "auto",
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {title}
      </div>
    </header>
  );
}
