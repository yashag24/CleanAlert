import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect based on role for root path
  if (location.pathname === "/") {
    return currentUser.role === "admin" ? 
      <Navigate to="/nagarpalika" replace /> : 
      <Navigate to="/user-dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;