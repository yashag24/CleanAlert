import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate("/login"); // Redirect to login page
    };
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/user-dashboard', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      name: 'Reports', 
      path: '/user-dashboard/reports', 
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' 
    },
    { 
      name: 'Map', 
      path: '/user-dashboard/map', 
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' 
    },
    { 
      name: 'Settings', 
      path: '/user-dashboard/settings', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' 
    },
  ];


  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-500 ease-in-out bg-gradient-to-b from-green-900 via-green-800 to-green-950 h-screen sticky top-0 hidden md:block shadow-xl`}
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="p-4 border-b border-green-800/30 flex items-center gap-3">
          {/* Collapsible Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-full bg-green-700 hover:bg-green-600 transition-all duration-300 ease-out ${
              isCollapsed ? 'mx-auto' : ''
            } hover:shadow-lg`}
          >
            <Leaf 
              className={`h-6 w-6 text-green-100 transform transition-transform duration-500 ease-out ${
                isCollapsed ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {!isCollapsed && (
            <div className="flex flex-col transition-opacity duration-300 delay-150">
              <h1 className="text-xl font-bold text-white">CleanAlert</h1>
              <p className="text-green-200 text-xs">Swachh Bharat</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-green-700 text-white shadow-md'
                      : 'hover:bg-green-800/80 text-green-100'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${!isCollapsed && 'mr-3'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  {!isCollapsed && (
                    <span className="text-sm font-medium transition-opacity duration-200 delay-100">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-green-800/30">
          <button
          onClick={handleLogout}
            className={`w-full flex items-center text-red-300 hover:bg-red-700/20 py-2 ${isCollapsed ? 'justify-center px-2' : 'px-3'} rounded-lg transition-all duration-300`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {!isCollapsed && (
              <span className="text-sm font-medium ml-2 transition-opacity duration-200 delay-75">
                Logout
              </span>
            )}
          </button>
          
          {!isCollapsed && (
            <div className="mt-4 bg-green-800/30 rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-green-100 mb-2">Garbage Detection Status</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-xs text-green-200">System Online</span>
                </div>
                <span className="text-xs text-green-200">24/7</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;