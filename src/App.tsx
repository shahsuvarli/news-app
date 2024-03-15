import { Outlet } from "react-router-dom";
import Header from "./components/header";

function App() {
  return (
    <div>
      <div className="mb-8">
        <Header />
      </div>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
