import React from 'react';
import { Upload, FileImage, Bell } from 'lucide-react';

const AISummary = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-l-green-800 border-t border-r border-b border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-green-900 mb-2">AI Garbage Detection System</h2>
        <p className="text-gray-600 mb-4">
          Our AI system automatically classifies uploaded images as garbage or
          clean areas, helping to keep our city beautiful.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-emerald-50 rounded-lg p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-emerald-100 text-green-700">
                <Upload className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-900">Upload</p>
                <p className="text-xs text-gray-500">Citizens upload waste images</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                <FileImage className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">Classify</p>
                <p className="text-xs text-gray-500">AI identifies garbage areas</p>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-700">
                <Bell className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-indigo-800">Alert</p>
                <p className="text-xs text-gray-500">Notifications sent to staff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummary;