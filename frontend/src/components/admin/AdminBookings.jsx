import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext";
import * as adminService from "../../services/admin";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  FaCalendarAlt,
  FaUserShield,
  FaFilter,
  FaTools,
  FaUser,
  FaCar,
  FaClock,
  FaInfoCircle,
  FaTable,
} from "react-icons/fa";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAllBookings();
        setBookings(data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/admin-login");
        } else {
          toast.error("Failed to load bookings");
          console.error("Error fetching bookings:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    if (socket) {
      socket.on("adminNotification", (newBooking) => {
        toast.info(`New booking received: ${newBooking.serviceType?.name}`);
        setBookings((prev) => [newBooking, ...prev]);
      });
    }

    return () => {
      if (socket) socket.off("adminNotification");
    };
  }, [navigate, socket]);

  const updateBookingStatus = async (id, status) => {
    try {
      await adminService.updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
      toast.success(`Booking status updated to ${status}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update booking status";
      toast.error(errorMessage);
      console.error("Error updating booking:", err);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  const statusOptions = [
    { value: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
    { value: "Approved", color: "bg-green-100 text-green-800", icon: "✓" },
    { value: "Completed", color: "bg-blue-100 text-blue-800", icon: "✔️" },
    { value: "Cancelled", color: "bg-red-100 text-red-800", icon: "✗" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold">Booking Management</h1>
          </div>

          <div className="flex items-center gap-4">
            {user?.email === "rajyogi1811@gmail.com" && (
              <span className="flex items-center gap-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                <FaUserShield />
                Super Admin
              </span>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Booking</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]"
                  >
                    <div className="flex items-center gap-2">
                      <FaTools className="flex-shrink-0" />
                      <span>Service</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]"
                  >
                    <div className="flex items-center gap-2">
                      <FaUser className="flex-shrink-0" />
                      <span>User</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]"
                  >
                    <div className="flex items-center gap-2">
                      <FaCar className="flex-shrink-0" />
                      <span>Vehicle</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]"
                  >
                    <div className="flex items-center gap-2">
                      <FaClock className="flex-shrink-0" />
                      <span>Date & Time</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 max-w-[250px]">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                          <FaTools className="text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {booking.serviceType?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{booking.serviceType?.price?.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-[200px]">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {booking.user?.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {booking.user?.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-[200px]">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {booking.car?.model}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {booking.car?.licensePlate}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.scheduledDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(booking.scheduledDate).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          updateBookingStatus(booking._id, e.target.value)
                        }
                        className={`border rounded-lg px-3 py-1 text-sm w-full max-w-[180px] ${
                          statusOptions.find(
                            (opt) => opt.value === booking.status
                          )?.color || ""
                        }`}
                      >
                        {statusOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className={option.color}
                          >
                            {option.icon} {option.value}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaTools className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {booking.serviceType?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ₹{booking.serviceType?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateBookingStatus(booking._id, e.target.value)
                    }
                    className={`text-xs px-2 py-1 rounded ${
                      statusOptions.find((opt) => opt.value === booking.status)
                        ?.color || ""
                    }`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 mt-3">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">
                        {booking.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.user?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCar className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">
                        {booking.car?.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.car?.licensePlate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-gray-400" />
                    <div>
                      <p className="text-sm">
                        {new Date(booking.scheduledDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.scheduledDate).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaTable className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-500">
                There are currently no bookings matching your filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
