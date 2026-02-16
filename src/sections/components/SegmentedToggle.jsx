import React from "react";
import "./style.css";

export default function SegmentedToggle({
  option1 = "Option 1",
  option2 = "Option 2",
  value = 0,
  onChange
}) {
  const toggle = () => {
    const next = value === 0 ? 1 : 0;
    if (onChange) onChange(next);
  };

  return (
    <div
      className="segmented-toggle"
      onClick={toggle}
      role="button"
    >
      <div
        className={`segmented-toggle-slider ${
          value === 1 ? "right" : ""
        }`}
      />
      <div className="segmented-toggle-label left" data-text-palette="Body">
        {option1}
      </div>
      <div className="segmented-toggle-label right" data-text-palette="Body">
        {option2}
      </div>
    </div>
  );
}
