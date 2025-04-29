import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Map, 
  BarChart2, 
  Users, 
  Settings, 
  Home, 
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/nagarpalika', end: true },
    // { icon: Bell, label: 'Notifications', path: '/nagarpalika' },
    { icon: Map, label: 'Cleanliness Map', path: '/nagarpalika/map' },
    { icon: BarChart2, label: 'Cleanliness Trends', path: '/nagarpalika/analytics' },
    { icon: Users, label: 'Staff Management', path: '/nagarpalika/staff' },
    { icon: Settings, label: 'Settings', path: '/nagarpalika/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-emerald-800 via-blue-800 to-indigo-800 text-white h-screen flex flex-col">
      {/* Header Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">CleanAlert</h1>
        <p className="text-emerald-200 text-sm mt-1">Swachh Bharat Portal</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              `flex items-center px-6 py-3 mx-2 my-1 rounded-r-lg transition-colors ${
                isActive 
                  ? 'bg-blue-700 text-white shadow-inner' 
                  : 'hover:bg-blue-700/50 text-blue-100'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-6 pt-4 border-t border-blue-700/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center text-red-200 hover:text-red-100 py-2 px-3 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span className="text-sm">Logout</span>
        </button>
        <div className="mt-4 text-blue-300/80 text-xs">
          <p>Powered by AI Garbage Detection</p>
          <p className="mt-1">© 2025 Swachh Bharat Mission</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;