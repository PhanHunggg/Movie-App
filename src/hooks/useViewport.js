import { useEffect, useState } from "react";
import { MOBILE, TABLET } from "../constants";

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
  } else if (width > 767 && width <= 1024) {
    return TABLET;
  }
};
