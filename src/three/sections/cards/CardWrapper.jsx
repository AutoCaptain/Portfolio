import { forwardRef } from "react";

const CardWrapper = forwardRef(function Card(
  { width, height, children },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: "white",
        borderRadius: "20px",
        overflow: "hidden",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
});

export default CardWrapper;
