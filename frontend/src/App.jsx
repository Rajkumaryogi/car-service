import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Services from './pages/Services'
import Bookings from './pages/Bookings'
import Cart from './pages/Cart'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import PrivateRoute from './components/auth/PrivateRoute'
import AdminRoute from './components/auth/AdminRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin' // New admin login page

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Toast Container - should be at the root level */}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
          
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} /> {/* New route */}
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/bookings" element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            } />
            
            <Route path="/cart" element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
            
            {/* 404 Page */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl">Page not found</p>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App