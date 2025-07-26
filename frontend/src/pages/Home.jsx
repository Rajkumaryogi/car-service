import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaCar, FaTools, FaUserCog, FaShieldAlt, FaPhone, FaMapMarkerAlt, FaClock, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import { MdCarRepair, MdLocalCarWash } from 'react-icons/md';
import Services from "./Services";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const testimonials = [
    {
      quote: "Bajdoliya Workshop fixed my car's transmission when no one else could. Amazing service!",
      author: "Rajesh Kumar",
      role: "Regular Customer"
    },
    {
      quote: "Honest mechanics who actually care about your car. Will never go anywhere else.",
      author: "Priya Sharma",
      role: "First-time Customer"
    },
    {
      quote: "Their emergency service saved me when my car broke down at midnight. Highly recommended!",
      author: "Vikram Patel",
      role: "Business Customer"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="bg-white"
    >
      {/* Hero Section - Mobile Optimized */}
      <div className="relative bg-gray-900 text-white overflow-hidden h-[80vh] min-h-[500px]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center w-full"
            variants={container}
          >
            <motion.h1 
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 px-4"
              variants={item}
            >
              Premium Auto Care at <span className="text-blue-400">Bajdoliya Workshop</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl max-w-md mx-auto mb-8 px-4"
              variants={item}
            >
              Professional car maintenance and repair services with certified mechanics
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-3 px-4"
              variants={item}
            >
              {user ? (
                <motion.button
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-3 bg-blue-600 text-white font-medium rounded-md text-sm sm:text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Go to Dashboard
                </motion.button>
              ) : (
                <>
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="px-5 py-3 bg-blue-600 text-white font-medium rounded-md text-sm sm:text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/register')}
                    className="px-5 py-3 bg-gray-600 text-white font-medium rounded-md text-sm sm:text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Register
                  </motion.button>
                </>
              )}
              <motion.button
                onClick={() => navigate('/services')}
                className="px-5 py-3 bg-green-600 text-white font-medium rounded-md text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Services Section - Full Width on Mobile */}
      <motion.section 
        className="py-12 bg-gray-50"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Services />
        </div>
      </motion.section>

      {/* Features Section - Stacked on Mobile */}
      <motion.section 
        className="py-12 bg-white"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
            variants={container}
          >
            <motion.div
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={item}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 mx-auto mb-3">
                <FaTools className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Quality Service</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Certified mechanics with latest tools
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={item}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mx-auto mb-3">
                <FaDollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                No hidden fees, upfront pricing
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={item}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100 mx-auto mb-3">
                <FaCalendarAlt className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Easy Booking</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Online scheduling 24/7
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section - Full Width on Mobile */}
      <motion.section 
        className="py-12 bg-gray-50"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Services />
        </div>
      </motion.section>

      {/* About Section - Stacked on Mobile */}
      <motion.section 
        className="py-12 bg-white"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-16">
            <motion.div 
              className="mb-8 lg:mb-0 lg:w-1/2"
              variants={item}
            >
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
                Why Choose Us?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaUserCog className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">ASE Certified Technicians (10+ years experience)</span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">12-month/12,000-mile warranty</span>
                </li>
                <li className="flex items-start">
                  <FaCar className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Modern diagnostic equipment</span>
                </li>
                <li className="flex items-start">
                  <FaTools className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Genuine parts & quality materials</span>
                </li>
              </ul>
              <motion.button
                onClick={() => navigate('/about')}
                className="mt-6 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More About Us
              </motion.button>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 rounded-lg overflow-hidden shadow-md"
              variants={item}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32b8e9a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Mechanic working on car"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials - Single Column on Mobile */}
      <motion.section 
        className="py-12 bg-gray-50"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-8"
            variants={item}
          >
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Customer Testimonials
            </h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
              Hear from our satisfied customers
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3"
            variants={container}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-5 rounded-lg shadow-sm"
                variants={item}
                whileHover={{ y: -3 }}
              >
                <div className="mb-3 flex justify-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-sm sm:text-base mb-3">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-gray-900 font-medium text-sm sm:text-base">
                  {testimonial.author}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {testimonial.role}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - Stacked on Mobile */}
      <motion.section 
        className="py-12 bg-blue-700 text-white"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div 
              className="mb-6 lg:mb-0 lg:w-1/2"
              variants={item}
            >
              <h2 className="text-2xl font-bold sm:text-3xl mb-2">
                Ready for Exceptional Service?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Schedule your appointment today
              </p>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 lg:w-1/2 lg:justify-end"
              variants={item}
            >
              <motion.button
                onClick={() => navigate('/login')}
                className="px-5 py-3 bg-white text-blue-700 font-medium rounded-md text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Online
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                className="px-5 py-3 border border-white text-white font-medium rounded-md text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Call Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;