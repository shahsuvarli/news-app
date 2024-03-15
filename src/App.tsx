import { Outlet } from "react-router-dom";
import Banner from "./components/banner";

function App() {
  return (
    <div>
      <div className="mb-8">
        <Banner />
      </div>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
