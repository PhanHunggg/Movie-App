import { useViewport } from "../hooks/useViewport";

export const withViewport = (Component) => {
  return (props) => {
    const device = useViewport();

    return <Component {...props} device={device} />;
  };
};
