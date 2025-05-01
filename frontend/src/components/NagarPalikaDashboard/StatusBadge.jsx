import React from "react";

const StatusBadge = ({ status, staffAssigned }) => {
  const statusStyles = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
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
        className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
      
      {status === 'in_progress' && (
        <span className="text-xs text-gray-500">
          ({staffAssigned?.name || dummyStaff.name})
        </span>
      )}
    </div>
  );
};

export default StatusBadge;