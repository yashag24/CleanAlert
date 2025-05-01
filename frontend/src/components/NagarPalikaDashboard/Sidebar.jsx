import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Map, 
  BarChart2, 
  Users, 
  Settings, 
  Home, 
  LogOut,
  Bell,
  Leaf
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/nagarpalika', end: true },
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
    <div className="w-64 bg-gradient-to-b from-green-900 via-green-800 to-green-950 text-white h-screen flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-green-800/30">
        <div className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-green-300" />
          <div>
            <h1 className="text-2xl font-bold">CleanAlert</h1>
            <p className="text-green-200 text-sm">Swachh Bharat Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              `flex items-center px-6 py-3 mx-2 my-1 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-green-700 text-white shadow-md' 
                  : 'hover:bg-green-800/80 text-green-100'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-6 pt-4 mt-auto border-t border-green-800/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center text-red-100 hover:bg-red-700/20 py-2 px-3 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Logout</span>
        </button>
        <div className="mt-4 text-green-300/80 text-xs">
          <p>Powered by AI Garbage Detection</p>
          <p className="mt-1">© 2025 Swachh Bharat Mission</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;