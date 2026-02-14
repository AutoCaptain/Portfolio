// ScrollManager.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const scrollPositions = {};

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const savedPosition = scrollPositions[location.pathname];

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (savedPosition !== undefined) {
          window.scrollTo(0, savedPosition);
        } else {
          window.scrollTo(0, 0);
        }
      });
    });
  }, [location]);

  return null;
}
