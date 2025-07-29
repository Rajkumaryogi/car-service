import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { toast } from 'react-toastify';
import { FaUserCircle, FaSpinner, FaCar, FaTools, FaKey } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const { user, loading, login, adminLogout } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && !user.isAdmin && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate, adminLogout]);

  const handleLogin = async (email, password) => {
    try {
      const user = await login(email, password);
      toast.success('Login successful! Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials and try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Login error:', err.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full py-12 text-center">
          <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
          <div className="text-lg text-gray-700">Checking authentication status...</div>
        </div>
      </div>
    );
  }

  if (user && !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md w-full py-12 text-center">
          <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
          <div className="text-lg text-gray-700">Redirecting to your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-white">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header with Car Service Theme */}
        <div className="text-center mb-8">
          <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
            <FaKey className="text-3xl text-red-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome to <span className="text-red-600">Bajdoliya Workshop</span>
          </h1>
          <p className="text-gray-600">Sign in to manage your vehicle services</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {/* Login Form */}
        <LoginForm onSubmit={handleLogin} />
        
        {/* Footer Links */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              Register now
            </Link>
          </p>
          
          <p className="text-gray-600 text-sm">
            <Link 
              to="/forgot-password" 
              className="text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              Forgot your password?
            </Link>
          </p>
          
          <div className="pt-4 border-t border-gray-100">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-red-600 text-sm transition-colors"
            >
              <FaCar className="mr-2" />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}