import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import loadable from "@loadable/component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COOKIES_NAME } from "./lib/variables/example";
import Cookies from "js-cookie";

const LoginPage = loadable(() => import("./pages/login"));
const UserPage = loadable(() => import("./pages/admin/user"));
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<AuthRoute redirectIfAuthenticated={true} />}
          >
            <Route path="/" element={<LoginPage />} />
          </Route>
          <Route path="/admin/*" element={<AuthRoute />}>
            <Route path="user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AuthRoute({
  redirectIfAuthenticated = false,
  redirectTo = "/admin/user",
}) {
  const token = Cookies.get(COOKIES_NAME.Token);
  const location = useLocation();

  const isAuthenticated = token && token !== "undefined";

  if (redirectIfAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!redirectIfAuthenticated && !isAuthenticated) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }

  return <Outlet />;
}

export default App;
