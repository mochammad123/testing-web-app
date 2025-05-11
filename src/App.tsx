import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import loadable from "@loadable/component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = loadable(() => import("./pages/login"));
const UserPage = loadable(() => import("./pages/admin/user"));
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
