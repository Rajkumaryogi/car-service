import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import * as bookingService from "../services/booking";
import {
  addUserCar,
  updateUserProfile,
  getUserProfile,
} from "../services/user";
import { toast } from "react-toastify";
import {
  FaUserEdit,
  FaCar,
  FaPlus,
  FaTimes,
  FaCalendarAlt,
  FaTools,
  FaSpinner,
  FaCheck,
  FaClock,
  FaMoneyBillWave,
  FaCalendarDay,
  FaIdCard,
} from "react-icons/fa";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newCar, setNewCar] = useState({
    model: "",
    year: "",
    licensePlate: "",
  });
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await bookingService.getUserBookings();
        setBookings(bookingsData);

        // Load user profile data
        const userData = await getUserProfile();
        setProfileData({
          name: userData.name,
          phone: userData.phone || "",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const addedCar = await addUserCar(newCar);

      setUser({
        ...user,
        cars: [...(user.cars || []), addedCar],
      });

      setShowAddCarModal(false);
      setNewCar({ model: "", year: "", licensePlate: "" });
      toast.success("Car added successfully!");
    } catch (err) {
      console.error("Add car error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to add car. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsProfileLoading(true);

    try {
      const updatedUser = await updateUserProfile(profileData);

      setUser({
        ...user,
        name: updatedUser.name,
        phone: updatedUser.phone,
      });

      toast.success("Profile updated successfully!");
      setShowProfileModal(false);
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <FaUserEdit className="text-blue-600" />
          Welcome, {user?.name}
        </h1>
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
        >
          <FaUserEdit />
          Edit Profile
        </button>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isProfileLoading}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isProfileLoading}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isProfileLoading}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
                  disabled={isProfileLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProfileLoading}
                  className={`px-4 py-2 rounded text-white ${
                    isProfileLoading
                      ? "bg-blue-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition-colors`}
                >
                  {isProfileLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cars Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
            <FaCar className="text-blue-600" />
            Your Cars
          </h2>
          <button
            onClick={() => setShowAddCarModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            disabled={isLoading}
          >
            <FaPlus />
            Add Your Car
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.cars?.length > 0 ? (
            user.cars.map((car, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaCar className="text-gray-500" />
                  <h3 className="font-medium text-lg">
                    {car?.model || "Car Added: Refresh the Page"}
                    {car?.year && ` (${car.year})`}
                  </h3>
                </div>
                {car?.licensePlate && (
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaMoneyBillWave className="text-sm" />
                    {car.licensePlate}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full bg-gray-50 p-6 rounded-lg text-center">
              <FaCar className="mx-auto text-3xl text-gray-400 mb-3" />
              <p className="text-gray-500">No cars added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-blue-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaCar className="text-xl" />
                  <h3 className="text-xl font-semibold">Add Your Vehicle</h3>
                </div>
                <button
                  onClick={() => setShowAddCarModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                  disabled={isLoading}
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddCar} className="p-6">
              <div className="space-y-5">
                {/* Model Field */}
                <div className="relative">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    Vehicle Model
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="model"
                      value={newCar.model}
                      onChange={handleCarInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Toyota Camry"
                      required
                      disabled={isLoading}
                    />
                    <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Year Field */}
                <div className="relative">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <FaCalendarDay className="text-blue-500" />
                    Manufacturing Year
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="year"
                      value={newCar.year}
                      onChange={handleCarInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 2020"
                      required
                      disabled={isLoading}
                    />
                    <FaCalendarDay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* License Plate Field */}
                <div className="relative">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <FaIdCard className="text-blue-500" />
                    License Plate
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="licensePlate"
                      value={newCar.licensePlate}
                      onChange={handleCarInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. ABC-1234"
                      required
                      disabled={isLoading}
                    />
                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(false)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  disabled={isLoading}
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium ${
                    isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors`}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Adding Vehicle...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Add Vehicle
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" />
          Recent Bookings
        </h2>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaTools />
                      <h3 className="font-semibold">
                        {booking.serviceType?.name || "Service"}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <FaClock className="text-xs" />
                      {new Date(booking.scheduledDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                      booking.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status === "Approved" && (
                      <FaCheck className="text-xs" />
                    )}
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <FaCalendarAlt className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-500">No bookings yet</p>
            <a
              href="/services"
              className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              <FaPlus />
              Book a Service
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
