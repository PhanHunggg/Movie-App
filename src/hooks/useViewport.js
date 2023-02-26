import { useEffect, useState } from "react";
<<<<<<< HEAD
import { DESKTOP, LAPTOP, MOBILE, TABLET } from "../constants";
=======
import { DESKTOP, MOBILE, TABLET } from "../constants";
>>>>>>> 7d8eef60025bd765c3f1d0f8ed26d8bd5216b213

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
<<<<<<< HEAD
  } else if (width > 767 && width <= 960) {
=======
  } else if (width > 1020) {
    return DESKTOP;
  } else if (width > 767 && width <= 1024) {
>>>>>>> 7d8eef60025bd765c3f1d0f8ed26d8bd5216b213
    return TABLET;
  } else if (width > 960 && width <= 1200) {
    return LAPTOP;
  } else if (width > 1200) {
    return DESKTOP;
  }
};
