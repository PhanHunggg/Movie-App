import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { LoadingProvider } from "./contexts/loading/LoadingContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
