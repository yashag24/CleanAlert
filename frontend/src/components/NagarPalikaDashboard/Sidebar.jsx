// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { 
//   Map, 
//   BarChart2, 
//   Users, 
//   Settings, 
//   Home, 
//   LogOut,
//   Leaf
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const Sidebar = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const navItems = [
//     { icon: Home, label: 'Dashboard', path: '/nagarpalika', end: true },
//     { icon: Map, label: 'Cleanliness Map', path: '/nagarpalika/map' },
//     { icon: BarChart2, label: 'Trends', path: '/nagarpalika/analytics' },
//     { icon: Users, label: 'Staff', path: '/nagarpalika/staff' },
//     { icon: Settings, label: 'Settings', path: '/nagarpalika/settings' },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className={`relative ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-gradient-to-b from-green-900 via-green-800 to-green-950 text-white h-screen flex flex-col`}>
//       {/* Header Section */}
//       <div className="p-4 border-b border-green-800/30 flex items-center gap-3">
//         {/* Circular Toggle Button */}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className={`p-2 rounded-full bg-green-700 hover:bg-green-600 transition-colors
//             ${isCollapsed ? 'mx-auto' : ''}`}
//         >
//           <Leaf 
//             className={`h-6 w-6 text-green-100 transform transition-transform duration-300 ${
//               isCollapsed ? 'rotate-180' : ''
//             }`}
//           />
//         </button>

//         {!isCollapsed && (
//           <div className="flex flex-col">
//             <h1 className="text-xl font-bold">CleanAlert</h1>
//             <p className="text-green-200 text-xs">Swachh Bharat</p>
//           </div>
//         )}
//       </div>

//       {/* Navigation Items */}
//       <nav className="flex-1 overflow-y-auto pb-4 mt-4">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             end={item.end}
//             className={({ isActive }) => 
//               `flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-colors ${
//                 isActive 
//                   ? 'bg-green-700 text-white shadow-md' 
//                   : 'hover:bg-green-800/80 text-green-100'
//               } ${isCollapsed ? 'justify-center' : ''}`
//             }
//           >
//             <item.icon className="h-5 w-5" />
//             {!isCollapsed && (
//               <span className="text-sm font-medium ml-3">{item.label}</span>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer Section */}
//       <div className="p-4 border-t border-green-800/30">
//         <button
//           onClick={handleLogout}
//           className={`w-full flex items-center text-red-100 hover:bg-red-700/20 py-2 px-3 rounded-lg transition-colors ${
//             isCollapsed ? 'justify-center' : ''
//           }`}
//         >
//           <LogOut className="h-5 w-5" />
//           {!isCollapsed && <span className="text-sm font-medium ml-2">Logout</span>}
//         </button>
//         {!isCollapsed && (
//           <div className="mt-4 text-green-300/80 text-xs">
//             <p>AI Garbage Detection</p>
//             <p className="mt-1">© 2025 SBM</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Map, 
  BarChart2, 
  Users, 
  Settings, 
  Home, 
  LogOut,
  Leaf
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/nagarpalika', end: true },
    { icon: Map, label: 'Cleanliness Map', path: '/nagarpalika/map' },
    { icon: BarChart2, label: 'Trends', path: '/nagarpalika/analytics' },
    { icon: Users, label: 'Staff', path: '/nagarpalika/staff' },
    { icon: Settings, label: 'Settings', path: '/nagarpalika/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`relative ${
      isCollapsed ? 'w-20' : 'w-64'
    } transition-all duration-500 ease-in-out bg-gradient-to-b from-green-900 via-green-800 to-green-950 text-white h-screen flex flex-col`}>
      
      {/* Header Section */}
      <div className="p-4 border-b border-green-800/30 flex items-center gap-3">
        {/* Circular Toggle Button */}
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
            <h1 className="text-xl font-bold">CleanAlert</h1>
            <p className="text-green-200 text-xs">Swachh Bharat</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto pb-4 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-green-700 text-white shadow-md' 
                  : 'hover:bg-green-800/80 text-green-100'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
            {!isCollapsed && (
              <span className="text-sm font-medium ml-3 transition-opacity duration-200 delay-100">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-green-800/30">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center text-red-100 hover:bg-red-700/20 py-2 px-3 rounded-lg transition-all duration-300 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
          {!isCollapsed && (
            <span className="text-sm font-medium ml-2 transition-opacity duration-200 delay-75">
              Logout
            </span>
          )}
        </button>
        {!isCollapsed && (
          <div className="mt-4 text-green-300/80 text-xs transition-opacity duration-300 delay-100">
            <p>AI Garbage Detection</p>
            <p className="mt-1">© 2025 SBM</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;