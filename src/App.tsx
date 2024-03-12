import { Outlet } from "react-router-dom";
import "./App.css";
import Banner from "./components/banner";

function App() {
  return (
    <div>
      <div className="mb-8">
        <Banner />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
