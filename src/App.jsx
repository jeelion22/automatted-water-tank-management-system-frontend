import "bootstrap/dist/css/bootstrap.min.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Chatbot from "./Chatbot";
import Root from "./Root/Root";
import UserRegister from "./features/users/UserRegister";
import UserLogin from "./features/users/UserLogin";
import { useState } from "react";
import Toaster from "./components/Toast/Toast";
import PrivateRoute from "./components/provateRoute/PrivateRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Navbar from "./Navbar";
import CreateProduct from "./features/product/CreateProduct";
import Insights from "./Insights";
import RedirectIfLoggedIn from "./components/redirect/RedirectIfLoggedIn";

const App = () => {
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message) => {
    setToastMessage(message);

    const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    toast.show();
  };

  return (
    <div className="home-page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route
              path="/register"
              element={<UserRegister triggerToast={triggerToast} />}
            />
            <Route
              path="/login"
              element={<UserLogin triggerToast={triggerToast} />}
            />
          </Route>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navbar triggerToast={triggerToast} />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="create-product"
              element={<CreateProduct triggerToast={triggerToast} />}
            />
            <Route path="insights" element={<Insights />} />
          </Route>
        </Routes>

        <Chatbot />
        <Toaster message={toastMessage} onClose={() => setToastMessage("")} />
      </BrowserRouter>
    </div>
  );
};

export default App;
