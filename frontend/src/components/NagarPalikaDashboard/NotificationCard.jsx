import { useState } from "react";
import { Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";

const NotificationCard = ({ notification, onStatusUpdate, onDelete }) => {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [availableStaff, setAvailableStaff] = useState([]);
  
  const confidence = (notification?.confidence ?? 0) * 100;
  const imageUrl =
    notification?.image_url ||
    "https://e3.365dm.com/25/03/1600x900/skynews-india-delhi-garbage-mountain_6848989.jpg?20250307131130";
  const detectedAt = notification?.timestamp || new Date().toISOString();
  const latitude = notification?.latitude?.toFixed(4) || "0.0000";
  const longitude = notification?.longitude?.toFixed(4) || "0.0000";
  const location = notification?.location_name || "Home";
  const source = notification?.source || "unknown";
  const detectionId = notification?._id?.slice(-4) || "N/A";

  const statuses = [
    {
      label: "Pending",
      value: "pending",
      color: "bg-amber-500 hover:bg-amber-600",
    },
    {
      label: "In Progress",
      value: "in_progress",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "Resolved",
      value: "completed",
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
  ];

  const handleStaffAssignment = async (staffId) => {
    try {
      // Update detection status and assign staff
      await fetch(`http://localhost:5000/api/detections/${notification._id}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId })
      });
      
      // Refresh status
      await onStatusUpdate(notification._id, "in_progress");
      setShowStaffModal(false);
    } catch (error) {
      console.error("Assignment failed:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/staff");
      const staffData = await response.json();
      setAvailableStaff(staffData);
      setShowStaffModal(true);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/4 mb-4 md:mb-0 relative">
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              AI Confidence: {confidence.toFixed(0)}%
            </div>
            <img
              src={imageUrl}
              alt={`Garbage at ${latitude}, ${longitude}`}
              className="rounded-lg w-full h-48 object-cover"
              onError={(e) => (e.target.src = imageUrl)}
            />
          </div>

          {/* Details Section */}
          <div className="md:w-3/4 md:pl-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-2">
              <h3 className="text-lg font-medium text-indigo-900 mb-1 md:mb-0">
                Detection #{detectionId}
              </h3>
              <StatusBadge 
                status={notification?.status} 
                staffAssigned={notification?.staffAssigned}
              />
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{new Date(detectedAt).toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-500">Coordinates:</p>
                <p className="font-medium">
                  {latitude}, {longitude}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Location:</p>
                <p className="font-medium">{location}</p>
              </div>
              <div>
                <p className="text-gray-500">Source:</p>
                <p className="font-medium capitalize">{source}</p>
              </div>
              <div>
                <p className="text-gray-500">Assigned To:</p>
                <p className="font-medium">
                  {notification?.staffAssigned?.name || "-"}
                </p>
              </div>
            </div>

            {/* Status Update & Delete Buttons */}
            <div className="flex flex-wrap gap-2">
              {statuses.map(({ label, value, color }) => {
                if (notification?.status === value) return null;
                
                if (value === "in_progress") {
                  return (
                    <button
                      key={value}
                      onClick={fetchStaff}
                      className={`px-4 py-2 text-white rounded-lg ${color}`}
                    >
                      Assign Staff
                    </button>
                  );
                }

                return (
                  <button
                    key={value}
                    onClick={() => onStatusUpdate(notification._id, value)}
                    className={`px-4 py-2 text-white rounded-lg ${color}`}
                  >
                    Mark as {label}
                  </button>
                );
              })}

              <button
                onClick={() => onDelete(notification._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Assignment Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Assign to Staff Member</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableStaff.map((staff) => (
                <button
                  key={staff._id}
                  onClick={() => handleStaffAssignment(staff._id)}
                  className="w-full p-3 text-left hover:bg-gray-100 rounded-md border flex items-center"
                >
                  <div>
                    <div className="font-medium">{staff.name}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {staff.role}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowStaffModal(false)}
              className="mt-4 px-4 py-2 text-gray-700 hover:text-gray-900 float-right"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;