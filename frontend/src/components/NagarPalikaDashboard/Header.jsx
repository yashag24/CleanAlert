import React from 'react';
import { Upload, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ handleImageUpload }) => {
  const { logout } = useAuth(); // Get logout function

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center">
          <div className="h-10 w-2 bg-green-800 rounded-r mr-3"></div>
          <div>
            <h1 className="text-2xl font-bold text-green-900">
              Nagarpalika Dashboard
            </h1>
            <p className="text-green-700">Admin panel for garbage management</p>
          </div>
        </div>

        {/* Right Section (Upload & Logout) */}
        <div className="flex items-center space-x-4">
          {/* Upload Button */}
          {/* <button
            onClick={handleImageUpload}
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload New Image
          </button> */}

          {/* Logout Button */}
          {/* <button
            onClick={logout}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;