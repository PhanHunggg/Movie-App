import { Spin } from "antd";
import { useEffect, useState } from "react";
import { createContext } from "react";
import "./loading.scss";

const DEFAULT_STATE = {
  isLoading: false,
};

const LoadingContext = createContext(DEFAULT_STATE);

const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    document.querySelector("body").style.overflow = state.isLoading
      ? "hidden"
      : "auto";
  }, [state.isLoading]);

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="spin">
          <Spin size="large" />
        </div>
      )}

      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
