import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaCar,
  FaTools,
  FaUserCog,
  FaShieldAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 // Updated image arrays with different images for mobile and desktop
const desktopImages = [
  "https://c1.wallpaperflare.com/preview/436/386/506/racing-car-engine-engine-mechanical-auto.jpg",
  "https://cdn.prod.website-files.com/63fe4fbdc589b272c333d60b/6407b09eee45b446565a6e70_sitemgr_car-repair.jpg",
  "https://media.istockphoto.com/id/1284285153/photo/auto-mechanic-working-on-car-engine-in-mechanics-garage-repair-service-authentic-close-up-shot.jpg?s=612x612&w=0&k=20&c=7AbRTEvT_5McOvmE1ArLvcowxlEuiPYPvMFEBjQEiAU=",
  "https://www.shutterstock.com/image-photo/car-mechanic-works-garage-repairs-600nw-2066602931.jpg"
];

// Different set of images for mobile
const mobileImages = [
  "https://media.istockphoto.com/id/1387759698/photo/hand-of-car-mechanic-with-wrench-auto-repair-garage-mechanic-works-on-the-engine-of-the-car.jpg?s=612x612&w=0&k=20&c=JVYyKMvP-NN-bTMyIF-pNrifwvjyjKcIRjTVEmSmPsM=",
  "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D",
  "https://png.pngtree.com/thumb_back/fh260/background/20220916/pngtree-auto-mechanic-working-under-car-maintenance-engineer-floor-industry-photo-image_9341172.jpg",
  "https://images.pexels.com/photos/13065694/pexels-photo-13065694.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === desktopImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [desktopImages.length]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const testimonials = [
    {
      quote:
        "Bajdoliya Workshop fixed my car's transmission when no one else could. Amazing service!",
      author: "Rajesh Kumar",
      role: "Regular Customer",
    },
    {
      quote:
        "Honest mechanics who actually care about your car. Will never go anywhere else.",
      author: "Priya Sharma",
      role: "First-time Customer",
    },
    {
      quote:
        "Their emergency service saved me when my car broke down at midnight. Highly recommended!",
      author: "Vikram Patel",
      role: "Business Customer",
    },
  ];

  const services = [
    { id: 1, name: "AC Service & Repair", icon: "1" },
    { id: 2, name: "Batteries", icon: "2" },
    { id: 3, name: "Tyres & Wheels Care", icon: "3" },
    { id: 4, name: "Denting & Painting", icon: "4" },
    { id: 5, name: "Detailing Services", icon: "5" },
    { id: 6, name: "Car Spa & Cleaning", icon: "6" },
    { id: 7, name: "Car Inspections", icon: "7" },
    { id: 8, name: "Windshields & Lights", icon: "8" },
    { id: 9, name: "Suspension & Fitments", icon: "9" },
    { id: 10, name: "Periodic Services", icon: "10" },
    { id: 11, name: "Cluthch & Body Parts", icon: "11" },
    { id: 12, name: "Insurance & Claims", icon: "12" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="bg-white"
    >
      {/* Hero Section with Rotating Background */}
      <div className="relative bg-gray-900 text-white overflow-hidden h-[80vh] min-h-[500px]">
  {/* Desktop Background Images */}
  <div className="hidden md:block absolute inset-0">
    {desktopImages.map((image, index) => (
      <div
        key={`desktop-${index}`}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          index === currentImageIndex ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center center'
        }}
      />
    ))}
  </div>

  {/* Mobile Background Images */}
  <div className="md:hidden absolute inset-0">
    {mobileImages.map((image, index) => (
      <div
        key={`mobile-${index}`}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          index === currentImageIndex ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center center'
        }}
      />
    ))}
  </div>

  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center w-full" variants={container}>
            <motion.h1
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 px-4"
              variants={item}
            >
              Premium Auto Care at{" "}
              <span className="text-red-400">Bajdoliya Workshop</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl max-w-md mx-auto mb-8 px-4"
              variants={item}
            >
              Professional car maintenance and repair services with certified
              mechanics
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 px-4"
              variants={item}
            >
              {user ? (
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm sm:text-base transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Go to Dashboard
                </motion.button>
              ) : (
                <>
                  <motion.button
                    onClick={() => navigate("/login")}
                    className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm sm:text-base transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => navigate("/register")}
                    className="px-5 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md text-sm sm:text-base transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Register
                  </motion.button>
                </>
              )}
              <motion.button
                onClick={() => navigate("/services")}
                className="px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md text-sm sm:text-base transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rest of your existing components remain unchanged */}
      {/* Services Quick Links */}
      <motion.section className="py-12 bg-white" variants={fadeIn}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-2xl font-bold text-center mb-8 text-gray-900"
            variants={item}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            variants={container}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center"
                variants={item}
                whileHover={{ y: -3 }}
                onClick={() => navigate(`/services#${service.id}`)}
              >
                <div className="bg-red-50 p-3 rounded-full mb-3">
                  <img
                    src={`https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/category_icons_new/xxxhdpi/${service.icon}.png`}
                    alt={service.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="font-medium text-gray-900">{service.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section - Stacked on Mobile */}
      <motion.section className="py-12 bg-gray-50" variants={fadeIn}>
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
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mx-auto mb-3">
                <FaTools className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                Quality Service
              </h3>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                Transparent Pricing
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                No hidden fees, upfront pricing
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={item}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 mx-auto mb-3">
                <FaCalendarAlt className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Online scheduling 24/7
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section - Stacked on Mobile */}
      <motion.section className="py-12 bg-white" variants={fadeIn}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-16">
            <motion.div className="mb-8 lg:mb-0 lg:w-1/2" variants={item}>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
                Why Choose Us?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaUserCog className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    ASE Certified Technicians (10+ years experience)
                  </span>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    12-month/12,000-mile warranty
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCar className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Modern diagnostic equipment
                  </span>
                </li>
                <li className="flex items-start">
                  <FaTools className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Genuine parts & quality materials
                  </span>
                </li>
              </ul>
              <motion.button
                onClick={() => navigate("/about")}
                className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm sm:text-base transition-colors"
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
                src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/category_icons_new/xxxhdpi/1.png"
                alt="Mechanic working on car"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials - Single Column on Mobile */}
      <motion.section className="py-12 bg-gray-50" variants={fadeIn}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-8" variants={item}>
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
                      <svg
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
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
        className="py-12  bg-gray-900 text-white p-8 shadow-xl"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="flex flex-col lg:flex-row gap-8 ">
            {/* Google Map Section - Now on Left */}
            <motion.div
              className="w-full lg:w-1/2 order-1 lg:order-none "
              variants={item}
            >
              <div className="h-64 sm:h-80 lg:h-full rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  title="Workshop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.123456789012!2d75.7478112!3d26.8410987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5ea05c93e09%3A0x860a04daca91e807!2sBajdoliya%20Workshop%20(Foam%20Car%20Wash)!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-2xl"
                  style={{ minHeight: "300px" }} // Ensures good mobile display
                ></iframe>
              </div>
            </motion.div>

            {/* CTA Content Section - Now on Right */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div className="mb-6" variants={item}>
                <h2 className="text-2xl font-bold sm:text-3xl mb-2">
                  Ready for Exceptional Service?
                </h2>
                <p className="text-red-100 text-sm sm:text-base">
                  Visit our workshop or schedule your appointment today
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                variants={item}
              >
                <motion.button
                  onClick={() => navigate("/login")}
                  className="px-5 py-3 bg-white text-red-700 font-medium rounded-md text-sm sm:text-base hover:bg-gray-100 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Online
                </motion.button>
                <motion.button
                  onClick={() => navigate("/contact")}
                  className="px-5 py-3 border border-white text-white font-medium rounded-md text-sm sm:text-base hover:bg-red-800 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaPhoneAlt className="mr-2" />
                  Call Now
                </motion.button>
              </motion.div>

              {/* Additional Contact Info for Mobile */}
              <motion.div className="mt-6 block lg:hidden" variants={item}>
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-red-200 mr-2" />
                  <span className="text-red-100 text-sm">
                    B152, Vidhan Shaba Nagar, Jaipur
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-red-200 mr-2" />
                  <span className="text-red-100 text-sm">
                    Mon-Sat: 8AM-8PM | Sun: 10AM-4PM
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
