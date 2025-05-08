import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import NagarpalikaDashboard from "./pages/NagarPalikaDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserComplaints from "./pages/UserComplaints";
import Outlet from "./components/PrivateRoute";
function App() {
  return (
    <Router>
    <AuthProvider>
      <AppProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Outlet />} />
            <Route path="/user-dashboard/*" element={<UserDashboard />} />
            <Route path="/nagarpalika/*" element={<NagarpalikaDashboard />} />
            {/* <Route path="/user-complaints" element={<UserComplaints />} /> */}
          </Route>
        </Routes>
      </AppProvider>
    </AuthProvider>
  </Router>
  );
}

export default App;
