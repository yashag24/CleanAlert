import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import {
  Search,
  FileImage,
  AlertTriangle,
  CheckCircle,
  Users,
  PieChart,
  Leaf,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Sidebar from "../components/NagarPalikaDashboard/Sidebar";
import Header from "../components/NagarPalikaDashboard/Header";
import StatsCard from "../components/NagarPalikaDashboard/StatsCard";
import AISummary from "../components/NagarPalikaDashboard/AISummary";
import NotificationCard from "../components/NagarPalikaDashboard/NotificationCard";
import GarbageMap from "../components/NagarPalikaDashboard/Map";
import Analytics from "../components/NagarPalikaDashboard/Analytics";
import StaffManagement from "../components/NagarPalikaDashboard/StaffManagement";
import Settings from "../components/NagarPalikaDashboard/Settings";

const NagarpalikaGarbageDashboard = () => {
  const location = useLocation();
  const {
    notifications = [],
    handleUpload,
    handleFileChange,
    updateDetectionStatus,
    deleteDetection,
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // Filter notifications
  useEffect(() => {
    const filtered = notifications.filter((notification) => {
      const isGarbageRelated = notification.prediction === "Garbage";
      const coordinates = `${notification.latitude ?? 0}, ${
        notification.longitude ?? 0
      }`;
      const matchesSearch = coordinates
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        activeTab === "all" || notification.status === activeTab;

      return isGarbageRelated && matchesSearch && matchesStatus;
    });

    setFilteredNotifications(filtered);
  }, [searchTerm, notifications, activeTab]);

  // Calculate stats
  const stats = {
    total: notifications.filter((n) => n.prediction === "Garbage").length,
    pending: notifications.filter(
      (n) => n.prediction === "Garbage" && n.status === "pending"
    ).length,
    completed: notifications.filter(
      (n) => n.prediction === "Garbage" && n.status === "completed"
    ).length,
    inProgress: notifications.filter(
      (n) => n.prediction === "Garbage" && n.status === "in_progress"
    ).length,
  };

  // Handle file upload
  const handleImageUpload = () => {
    document.getElementById("file-input").click();
  };

  const handleFileInputChange = (e) => {
    handleFileChange(e);
    handleUpload();
  };

  // Handle status update
  const handleStatusUpdate = (notificationId, newStatus) => {
    updateDetectionStatus(notificationId, newStatus);
    setFilteredNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, status: newStatus }
          : notification
      )
    );
  };

  return (
    <div className="flex h-screen bg-green-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <Header handleImageUpload={handleImageUpload} />

       
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
          <StatsCard
            icon={FileImage}
            title="Total Reports"
            value={stats.total}
            borderColor="border-purple-600"
            iconColor="text-purple-600"
            bgColor="bg-purple-100"
          />
          <StatsCard
            icon={AlertTriangle}
            title="Pending"
            value={stats.pending}
            borderColor="border-red-500"
            iconColor="text-red-600"
            bgColor="bg-red-50"
          />
          <StatsCard
            icon={CheckCircle}
            title="In Progress"
            value={stats.inProgress}
            borderColor="border-amber-500"
            iconColor="text-amber-600"
            bgColor="bg-amber-50"
          />
          <StatsCard
            icon={CheckCircle}
            title="Completed"
            value={stats.completed}
            borderColor="border-green-600"
            iconColor="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            icon={Users}
            title="Staff Active"
            value={12}
            borderColor="border-blue-600"
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatsCard
            icon={Leaf}
            title="AI Accuracy"
            value="94%"
            borderColor="border-teal-600"
            iconColor="text-teal-600"
            bgColor="bg-teal-50"
          />
        </div>

        {/* AI Summary Section */}
        <div className="p-6 pt-0">
          <AISummary />
        </div>

        {/* Main Content Area */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <h2 className="text-xl font-bold text-green-900">
              Garbage Reports
            </h2>
            <div className="flex flex-wrap gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by coordinates..."
                  className="pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-green-600 absolute left-3 top-2.5" />
              </div>

              {/* Filter Buttons */}
              <div className="flex space-x-2">
                {["all", "pending", "in_progress", "completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      activeTab === tab
                        ? "bg-green-700 text-white shadow-md"
                        : "bg-white text-green-800 hover:bg-green-100"
                    }`}
                  >
                    {tab.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Nested Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NotificationCard
                        notification={notification}
                        onStatusUpdate={handleStatusUpdate}
                        onDelete={deleteDetection}
                      />
                    </motion.div>
                  ))}
                  {filteredNotifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-green-800">
                      <Leaf className="h-16 w-16 text-green-400 mb-4" />
                      <p className="text-lg font-medium">
                        No detections found matching your criteria
                      </p>
                      <p className="text-green-600 mt-2">
                        Adjust your filters or upload new images
                      </p>
                    </div>
                  )}
                </div>
              }
            />
            <Route
              path="map"
              element={<GarbageMap detections={filteredNotifications} />}
            />
            <Route
              path="analytics"
              element={
                <Analytics detections={notifications} activeTab={activeTab} />
              }
            />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default NagarpalikaGarbageDashboard;
