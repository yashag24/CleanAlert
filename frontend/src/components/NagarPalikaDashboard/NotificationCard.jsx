import { useState } from "react";
import { Clock, MapPin, User, Tag, Trash2, Edit } from "lucide-react";
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
      color: "bg-green-700 hover:bg-green-800",
    },
    {
      label: "Resolved",
      value: "completed",
      color: "bg-teal-600 hover:bg-teal-700",
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-l-green-800 border-t border-r border-b border-gray-200">
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
              <h3 className="text-lg font-medium text-green-900 mb-1 md:mb-0">
                Detection #{detectionId}
              </h3>
              <StatusBadge 
                status={notification?.status} 
                staffAssigned={notification?.staffAssigned}
              />
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock className="h-4 w-4 mr-1 text-green-700" />
              <span>{new Date(detectedAt).toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-500 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-green-700" />
                  Coordinates:
                </p>
                <p className="font-medium text-gray-700">
                  {latitude}, {longitude}
                </p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-green-700" />
                  Location:
                </p>
                <p className="font-medium text-gray-700">{location}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <Tag className="h-3 w-3 mr-1 text-green-700" />
                  Source:
                </p>
                <p className="font-medium text-gray-700 capitalize">{source}</p>
              </div>
              <div>
                <p className="text-gray-500 flex items-center">
                  <User className="h-3 w-3 mr-1 text-green-700" />
                  Assigned To:
                </p>
                <p className="font-medium text-gray-700">
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
                      className={`px-4 py-2 text-white rounded-md ${color} flex items-center`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Assign Staff
                    </button>
                  );
                }

                return (
                  <button
                    key={value}
                    onClick={() => onStatusUpdate(notification._id, value)}
                    className={`px-4 py-2 text-white rounded-md ${color} flex items-center`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Mark as {label}
                  </button>
                );
              })}

              <button
                onClick={() => onDelete(notification._id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Assignment Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-96 border-l-4 border-l-green-800">
            <h3 className="text-lg font-semibold mb-4 text-green-900">Assign to Staff Member</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableStaff.length === 0 ? (
                <p className="text-gray-500 py-4 text-center">No staff members available</p>
              ) : (
                availableStaff.map((staff) => (
                  <button
                    key={staff._id}
                    onClick={() => handleStaffAssignment(staff._id)}
                    className="w-full p-3 text-left hover:bg-green-50 rounded-md border border-gray-200 flex items-center transition-colors"
                  >
                    <div className="mr-3 h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{staff.name}</div>
                      <div className="text-sm text-gray-500 capitalize">
                        {staff.role === 'collector' ? 'Garbage Collector' : 
                         staff.role === 'supervisor' ? 'Area Supervisor' : 
                         staff.role === 'inspector' ? 'Cleanliness Inspector' : 
                         staff.role === 'driver' ? 'Vehicle Driver' : staff.role}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowStaffModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;