import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <div className="mb-8">
        <Header />
      </div>
      <main className="p-6">
        <Outlet />
      </main>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default App;
