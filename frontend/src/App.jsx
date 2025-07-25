import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminUsers from "./components/admin/AdminUsers";
import AdminBookings from "./components/admin/AdminBookings";
import AdminServices from "./components/admin/AdminServices";
import Services from "./pages/Services";
import Bookings from "./pages/Bookings";
import Cart from "./pages/Cart";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminUserDetails from "./components/admin/AdminUserDetails";


function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* Conditional rendering for Navbar */}
        <Routes>
          {/* Routes without Navbar */}
          <Route path="/admin-login" element={null} />
          <Route path="/admin/*" element={null} />

          {/* All other routes will render Navbar */}
          <Route path="*" element={<Navbar />} />
        </Routes>

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <Bookings />
                </PrivateRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/:userId"
              element={
                <AdminRoute>
                  <AdminUserDetails />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <AdminRoute>
                  <AdminBookings />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/services"
              element={
                <AdminRoute>
                  <AdminServices />
                </AdminRoute>
              }
            />

            {/* 404 Page */}
            {/* <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl">Page not found</p>
              </div>
            } /> */}
          </Routes>
        </main>

        {/* Conditional rendering for Footer */}
        <Routes>
          {/* Routes without Footer */}
          <Route path="/login" element={null} />
          <Route path="/register" element={null} />
          <Route path="/admin-login" element={null} />
          <Route path="/admin/*" element={null} />

          {/* All other routes will render Footer */}
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
