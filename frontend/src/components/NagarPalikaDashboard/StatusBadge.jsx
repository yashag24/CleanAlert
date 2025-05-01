import React from "react";

const StatusBadge = ({ status, staffAssigned }) => {
  const statusStyles = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    in_progress: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };

  const statusLabels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  // Dummy data fallbacks
  const dummyStaff = {
    name: "Unassigned",
    role: "collector"
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
      
      {status === 'in_progress' && (
        <div className="flex items-center text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-1"></span>
          <span className="text-gray-700 font-medium">
            {staffAssigned?.name || dummyStaff.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;