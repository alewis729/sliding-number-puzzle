import React from "react";
import debounce from "lodash/debounce";

const useWindowDimensions = (delay = 700) => {
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const debouncedHandleResize = debounce(handleResize, delay);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [delay]);

  return dimensions;
};

export default useWindowDimensions;
