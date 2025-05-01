import React from 'react';

const StatsCard = ({
  icon: Icon,
  title,
  value,
  borderColor,
  iconColor,
  bgColor,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-l-green-800 border-t border-r border-b border-gray-200"
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">{title}</p>
            <h3 className="text-xl font-bold text-green-900">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;