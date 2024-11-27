import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Insights from "./Insights";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <div className="home-page">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route path="insights" element={<Insights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
