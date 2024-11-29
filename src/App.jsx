import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Insights from "./Insights";
import "bootstrap-icons/font/bootstrap-icons.css";
import Chatbot from "./Chatbot";
import CreateProduct from "./CreateProduct";
import HomaPage from "./HomaPage";

const App = () => {
  return (
    <div className="home-page">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomaPage />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="insights" element={<Insights />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </div>
  );
};

export default App;
