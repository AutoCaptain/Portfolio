export default function Header() {
  return (
    <header
      data-text-palette="BodyD"
      className="absolute top-0 left-0 w-full"
      style={{
        height: "72px",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1.1,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          Liam Williams
        </span>

        <span
          style={{
            fontSize: "16px",
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.6,
            marginTop: "4px",
          }}
        >
          Portfolio
        </span>
      </div>
    </header>
  );
}
