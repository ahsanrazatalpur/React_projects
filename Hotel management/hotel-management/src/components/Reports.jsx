import React, { useMemo } from "react";
import roomData from "./RoomData";
import { FaBed, FaCheckCircle, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Reports = ({ bookings }) => {
  // Dates and time info
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Housekeeping status from localStorage
  const housekeepingStatuses =
    JSON.parse(localStorage.getItem("housekeepingStatuses")) || {};

  // Metrics
  const totalRoomsCount = roomData.length;

  const bookedRoomsCount = roomData.filter((room) =>
    bookings.some((b) => b.room?.id === room.id)
  ).length;

  const maintenanceRoomsCount = roomData.filter(
    (room) => housekeepingStatuses[room.id]?.isUnderMaintenance
  ).length;

  const availableRoomsCount =
    totalRoomsCount - bookedRoomsCount - maintenanceRoomsCount;

  const revenueThisMonth = bookings.reduce((acc, b) => {
    if (!b.bookedAt) return acc;
    const bookedDate = new Date(b.bookedAt);
    if (
      bookedDate.getMonth() === currentMonth &&
      bookedDate.getFullYear() === currentYear
    ) {
      return acc + (b.room?.price || 0);
    }
    return acc;
  }, 0);

  const occupancyRate = totalRoomsCount
    ? ((bookedRoomsCount / totalRoomsCount) * 100).toFixed(1)
    : "0";

  // Booking trend data for last 7 days
  const bookingTrendData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);
      const dayString = day.toISOString().slice(0, 10);

      const count = bookings.filter(
        (b) => b.bookedAt && b.bookedAt.slice(0, 10) === dayString
      ).length;

      data.push({
        date: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        bookings: count,
      });
    }
    return data;
  }, [bookings, today]);

  // Pie chart data
  const pieData = [
    { name: "Available", value: availableRoomsCount },
    { name: "Booked", value: bookedRoomsCount },
    { name: "Maintenance", value: maintenanceRoomsCount },
  ];

  // CSV export
  const exportCSV = () => {
    const csvRows = [
      ["Room ID", "Title", "Type", "Price", "Status"].join(","),
      ...roomData.map((room) => {
        const isBooked = bookings.some((b) => b.room?.id === room.id);
        const isMaintenance = housekeepingStatuses[room.id]?.isUnderMaintenance;
        const status = isMaintenance ? "Maintenance" : isBooked ? "Booked" : "Available";

        return [
          room.id,
          `"${room.title.replace(/"/g, '""')}"`,
          room.type,
          room.price,
          status,
        ].join(",");
      }),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rooms_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="p-6 space-y-8 max-w-7xl mx-auto md:ml-[240px] md:max-w-[calc(100%-240px)]"
      style={{ boxSizing: "border-box" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Reports Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow flex items-center space-x-4">
          <FaBed className="text-5xl" />
          <div>
            <p className="text-4xl font-semibold">{totalRoomsCount}</p>
            <p>Total Rooms</p>
          </div>
        </div>

        <div className="bg-red-600 text-white rounded-lg p-6 shadow flex items-center space-x-4">
          <FaCheckCircle className="text-5xl" />
          <div>
            <p className="text-4xl font-semibold">{bookedRoomsCount}</p>
            <p>Booked Rooms</p>
          </div>
        </div>

        <div className="bg-yellow-600 text-white rounded-lg p-6 shadow flex items-center space-x-4">
          <FaUsers className="text-5xl" />
          <div>
            <p className="text-4xl font-semibold">{availableRoomsCount}</p>
            <p>Available Rooms</p>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-lg p-6 shadow flex items-center space-x-4">
          <FaMoneyBillWave className="text-5xl" />
          <div>
            <p className="text-4xl font-semibold">${revenueThisMonth}</p>
            <p>Revenue This Month</p>
            <p className="text-sm mt-1">Occupancy: {occupancyRate}%</p>
          </div>
        </div>
      </div>

      {/* Booking Trend Line Chart */}
      <div className="bg-[#1E293B] rounded-lg p-6 shadow text-white">
        <h2 className="text-xl font-semibold mb-4">Booking Trends (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={bookingTrendData}>
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#222" }}
              itemStyle={{ color: "#82ca9d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Room Status Pie Chart */}
      <div className="bg-[#1E293B] rounded-lg p-6 shadow text-white">
        <h2 className="text-xl font-semibold mb-4">Room Status Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Export CSV Button */}
      <div className="text-right">
        <button
          onClick={exportCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Export Rooms Report (CSV)
        </button>
      </div>
    </div>
  );
};

export default Reports;
