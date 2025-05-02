// Header.jsx
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { LogOut, Leaf } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8 relative"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-green-700 mr-3 transition-transform duration-300 hover:scale-110" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-green-700 via-green-800 to-green-900">
              UserPortal- Roadside Garbage Detection 
            </h1>

            <p className="text-green-700 ">
              Help keep our environment clean by identifying and reporting roadside garbage 
            </p>
          </div>
        </div>

        {currentUser && (
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-700 text-red-100 px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center hover:bg-red-700/20"
            >
              <LogOut className="h-5 w-5 mr-2 transition-transform duration-300 hover:scale-110" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;