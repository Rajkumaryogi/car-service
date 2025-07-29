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
  FaArrowLeft,
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <FaUserEdit className="text-red-600 text-xl" />
              </div>
              <span className="text-gray-800">Welcome, {user?.name}</span>
            </h1>
            <p className="text-gray-600 mt-1">Your dashboard overview</p>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <FaUserEdit />
            Edit Profile
          </button>
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  disabled={isProfileLoading}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                    disabled={isProfileLoading}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={isProfileLoading}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    disabled={isProfileLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProfileLoading}
                    className={`px-5 py-2.5 rounded-lg text-white font-medium ${
                      isProfileLoading
                        ? "bg-red-400"
                        : "bg-red-600 hover:bg-red-700"
                    } transition-colors shadow-sm`}
                  >
                    {isProfileLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin" />
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
        <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaCar className="text-red-600" />
                </div>
                Your Vehicles
              </h2>
              <p className="text-gray-600 mt-1">Manage your registered vehicles</p>
            </div>
            <button
              onClick={() => setShowAddCarModal(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              disabled={isLoading}
            >
              <FaPlus />
              Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.cars?.length > 0 ? (
              user.cars.map((car, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <FaCar className="text-red-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {car?.model || "Car Added: Refresh the Page"}
                      {car?.year && ` (${car.year})`}
                    </h3>
                  </div>
                  {car?.licensePlate && (
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaIdCard className="text-red-400" />
                      {car.licensePlate}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FaCar className="text-2xl text-red-600" />
                </div>
                <p className="text-gray-600 mb-4">No vehicles registered yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Car Modal */}
        {showAddCarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
              {/* Modal Header */}
              <div className="bg-red-600 p-5 text-white">
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
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                      <FaCar className="text-red-500" />
                      Vehicle Model
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="model"
                        value={newCar.model}
                        onChange={handleCarInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g. Toyota Camry"
                        required
                        disabled={isLoading}
                      />
                      <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Year Field */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                      <FaCalendarDay className="text-red-500" />
                      Manufacturing Year
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="year"
                        value={newCar.year}
                        onChange={handleCarInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g. 2020"
                        required
                        disabled={isLoading}
                      />
                      <FaCalendarDay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* License Plate Field */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                      <FaIdCard className="text-red-500" />
                      License Plate
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="licensePlate"
                        value={newCar.licensePlate}
                        onChange={handleCarInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    disabled={isLoading}
                  >
                    <FaTimes />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium ${
                      isLoading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                    } transition-colors shadow-sm`}
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Adding...
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <FaCalendarAlt className="text-red-600" />
              </div>
              Recent Bookings
            </h2>
            <p className="text-gray-600 mt-1">Your service appointments</p>
          </div>
          
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white p-5 rounded-lg border border-gray-200 hover:border-red-200 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-red-100 p-2 rounded-full">
                          <FaTools className="text-red-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800">
                          {booking.serviceType?.name || "Service"}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm flex items-center gap-2 ml-9">
                        <FaClock className="text-red-400" />
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
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 self-start sm:self-center ${
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
            <div className="bg-gray-50 p-8 rounded-lg text-center border border-dashed border-gray-300">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-2xl text-red-600" />
              </div>
              <p className="text-gray-600 mb-4">No bookings yet</p>
              <a
                href="/services"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
              >
                <FaPlus />
                Book a Service
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}