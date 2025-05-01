import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import NagarpalikaDashboard from "./pages/NagarPalikaDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserComplaints from "./pages/UserComplaints";


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/my-complaints" element={<UserComplaints />} />
            </Route>

            {/* Nagarpalika Admin Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/nagarpalika/*" element={<NagarpalikaDashboard />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
