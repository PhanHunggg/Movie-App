import { useEffect, useState } from "react";
import { DESKTOP, LAPTOP, MOBILE, TABLET } from "../constants";

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width <= 767) {
    return MOBILE;
  } else if (width > 767 && width <= 960) {
    return TABLET;
  } else if (width > 960 && width <= 1200) {
    return LAPTOP;
  } else if (width > 1200) {
    return DESKTOP;
  }
};
