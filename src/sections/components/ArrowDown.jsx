// ArrowDown.jsx
export default function ArrowDown({
  outerSize = 60,
  innerSize = 50,
  color = "#52616E",
  backgroundColor = "#033955",
  amplitude = 10,
  duration = 3,
}) {
  const outerHeight = Math.round(outerSize * 0.866);
  const innerHeight = Math.round(innerSize * 0.866);

  return (
    <div
      style={{
        position: "relative",
        animation: `arrowFloat ${duration}s linear infinite`,
      }}
    >
      <style>
        {`
          @keyframes arrowFloat {
            0%   { transform: translateY(0); }
            25%  { transform: translateY(${amplitude}px); }
            50%  { transform: translateY(0); }
            75%  { transform: translateY(${-amplitude}px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <div style={{ position: "relative", width: 0, height: 0 }}>
        {/* Outer triangle */}
        <div
          style={{
            position: "absolute",
            left: -outerSize / 2,
            width: 0,
            height: 0,
            top: 1,

            borderLeftWidth: outerSize / 2,
            borderLeftStyle: "solid",
            borderLeftColor: "transparent",

            borderRightWidth: outerSize / 2,
            borderRightStyle: "solid",
            borderRightColor: "transparent",

            borderTopWidth: outerHeight,
            borderTopStyle: "solid",
            borderTopColor: color,

            // hard reset
            color: "transparent",
            mixBlendMode: "normal",
          }}
        />

        {/* Inner cutout */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -innerSize / 2,
            width: 0,
            height: 0,

            borderLeftWidth: innerSize / 2,
            borderLeftStyle: "solid",
            borderLeftColor: "transparent",

            borderRightWidth: innerSize / 2,
            borderRightStyle: "solid",
            borderRightColor: "transparent",

            borderTopWidth: innerHeight,
            borderTopStyle: "solid",
            borderTopColor: backgroundColor,
          }}
        />
      </div>
    </div>
  );
}
