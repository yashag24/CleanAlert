import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';

const Analytics = ({ detections, activeTab }) => {
  // Check if detections is null, undefined, or empty
  if (!detections || detections.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-l-green-800 border-t border-r border-b border-gray-200 p-6">
        <h3 className="text-lg font-bold text-green-900 mb-4">Detection Trends</h3>
        <p className="text-gray-500">No detection data available.</p>
      </div>
    );
  }

  // Process data for the chart
  const processData = (detections) => {
    const dailyData = detections.reduce((acc, detection) => {
      // Skip if timestamp is missing or prediction is not "Garbage"
      if (!detection.timestamp || detection.prediction !== "Garbage") return acc;

      // Filter based on activeTab
      const matchesStatus =
        activeTab === "all" || detection.status === activeTab;
      if (!matchesStatus) return acc;

      const date = format(parseISO(detection.timestamp), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = { date, count: 0 };
      }
      acc[date].count++;
      return acc;
    }, {});

    const result = Object.values(dailyData).sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );
    return result;
  };

  // Process location data for the bar chart
  const processLocationData = (detections) => {
    const locationData = detections.reduce((acc, detection) => {
      // Skip if location_name is missing or prediction is not "Garbage"
      if (!detection.location_name || detection.prediction !== "Garbage") return acc;

      // Filter based on activeTab
      const matchesStatus =
        activeTab === "all" || detection.status === activeTab;
      if (!matchesStatus) return acc;

      const location = detection.location_name;
      if (!acc[location]) {
        acc[location] = { location, count: 0 };
      }
      acc[location].count++;
      return acc;
    }, {});

    const result = Object.values(locationData).sort((a, b) => b.count - a.count);
    return result;
  };

  const chartData = processData(detections);
  const locationData = processLocationData(detections);

  // Calculate average detections per day
  const totalDetections = chartData.reduce((sum, entry) => sum + entry.count, 0);
  const averageDetections = totalDetections / chartData.length || 0;

  // Get the status label and color for the chart
  const statusConfig = {
    all: {
      label: "All Detections",
      stroke: "#047857", // Green-800
      fill: "#10b981", // Green-500
    },
    pending: {
      label: "Pending Detections",
      stroke: "#b45309", // Amber-700
      fill: "#fbbf24", // Amber-400
    },
    in_progress: {
      label: "In Progress Detections",
      stroke: "#1e40af", // Blue-800
      fill: "#3b82f6", // Blue-500
    },
    completed: {
      label: "Completed Detections",
      stroke: "#065f46", // Emerald-800
      fill: "#10b981", // Emerald-500
    },
  };

  const { label, stroke, fill } = statusConfig[activeTab];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-l-green-800 border-t border-r border-b border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-bold text-green-900 mb-2">{label} Trends</h3>

        {/* Subtitle with Insights */}
        <p className="text-sm text-gray-600 mb-6">
          {chartData.length > 0
            ? `Average detections per day: ${averageDetections.toFixed(2)}`
            : "No data to display."}
        </p>

        {/* Chart */}
        <div className="h-[300px] mb-8 p-4 bg-white rounded-lg border border-gray-200">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(parseISO(date), 'MMM d')}
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#ccc' }}
              />
              <YAxis
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#ccc' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                labelFormatter={(date) => format(parseISO(date), 'MMMM d, yyyy')}
                formatter={(value) => [`Detections: ${value}`, 'Count']}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke={stroke}
                fill={fill}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              {/* Average Line */}
              <ReferenceLine
                y={averageDetections}
                stroke="#666"
                strokeDasharray="3 3"
              >
                <Label
                  value={`Avg: ${averageDetections.toFixed(2)}`}
                  position="insideTopRight"
                  fill="#666"
                  fontSize={12}
                />
              </ReferenceLine>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Location Breakdown */}
        <h3 className="text-lg font-bold text-green-900 mb-4">Location Breakdown</h3>
        <div className="h-[300px] p-4 bg-white rounded-lg border border-gray-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={locationData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis
                dataKey="location"
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#ccc' }}
              />
              <YAxis
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#ccc' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value) => [`Detections: ${value}`, 'Count']}
              />
              <Bar
                dataKey="count"
                fill={fill}
                fillOpacity={0.8}
              />
              <Legend
                formatter={() => `Detections by Location`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;