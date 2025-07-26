import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as adminService from "../../services/admin";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  FaTools,
  FaUserShield,
  FaRupeeSign,
  FaClock,
  FaPlus,
  FaSpinner,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 60,
  });
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await adminService.getAllServices();
        setServices(data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate("/admin-login");
        } else {
          toast.error("Failed to load services");
          console.error("Error fetching services:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!newService.name.trim()) newErrors.name = "Name is required";
    if (newService.price <= 0) newErrors.price = "Price must be greater than 0";
    if (newService.duration < 15)
      newErrors.duration = "Minimum duration is 15 minutes";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value || 0) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const addedService = await adminService.addService(newService);
      setServices([...services, addedService]);
      setNewService({
        name: "",
        description: "",
        price: 0,
        duration: 60,
      });
      toast.success("Service added successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to add service";
      toast.error(errorMessage);
      console.error("Error adding service:", err);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await adminService.deleteService(serviceId);
        setServices(services.filter((service) => service._id !== serviceId));
        toast.success("Service deleted successfully");
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to delete service";
        toast.error(errorMessage);
        console.error("Error deleting service:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
            <p className="text-lg">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <FaTools className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold">Service Management</h1>
          </div>
          {user?.email === "rajyogi1811@gmail.com" && (
            <span className="flex items-center gap-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              <FaUserShield />
              Super Admin
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Services List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FaTools />
                Current Services ({services.length})
              </h2>
            </div>

            {services.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium flex items-center justify-end gap-1">
                            <FaRupeeSign className="text-gray-500 text-sm" />
                            {service.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                            <FaClock className="text-gray-400 text-xs" />
                            {service.duration} mins
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="text-red-500 hover:text-red-700 opacity-70 group-hover:opacity-100 transition-opacity p-2"
                          title="Delete service"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FaTools className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Services Available
                </h3>
                <p className="text-gray-500">
                  Add your first service using the form
                </p>
              </div>
            )}
          </div>
          {/* Add Service Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaPlus />
              Add New Service
            </h2>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500" />
                  Service Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={newService.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <FaRupeeSign className="text-blue-500" />
                    Price (₹)*
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newService.price}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    min="0"
                    step="0.01"
                    required
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    Duration (mins)*
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={newService.duration}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    }`}
                    min="15"
                    step="15"
                    required
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white ${
                  Object.keys(errors).length > 0
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
                disabled={Object.keys(errors).length > 0}
              >
                <FaPlus />
                Add Service
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
