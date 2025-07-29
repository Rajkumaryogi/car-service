import { motion } from "framer-motion";
import { FaTools, FaCarAlt, FaUsers, FaShieldAlt, FaPhone, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import { MdEngineering } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const teamMembers = [
    {
      name: "Mr. Bajdoliya",
      role: "Founder & Lead Technician",
      bio: "25+ years of automotive experience specializing in engine diagnostics",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Service Manager",
      bio: "Ensures smooth operations and exceptional customer experiences",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Mike Rodriguez",
      role: "Master Technician",
      bio: "Specializes in electrical systems and advanced diagnostics",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }
  ];

  const features = [
    {
      icon: <FaTools className="h-6 w-6" />,
      title: "Expert Technicians",
      description: "ASE-certified with 10+ years experience on all makes and models"
    },
    {
      icon: <FaShieldAlt className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "12-month/12,000-mile warranty on all services"
    },
    {
      icon: <GiCarWheel className="h-6 w-6" />,
      title: "Modern Equipment",
      description: "Latest diagnostic tools for precise repairs"
    },
    {
      icon: <FaCarAlt className="h-6 w-6" />,
      title: "Transparent Pricing",
      description: "No hidden fees, detailed estimates upfront"
    },
    {
      icon: <MdEngineering className="h-6 w-6" />,
      title: "Custom Solutions",
      description: "Services tailored to your needs and budget"
    },
    {
      icon: <FaUsers className="h-6 w-6" />,
      title: "Customer Focus",
      description: "Your satisfaction is our top priority"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white"
    >
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8"
          variants={fadeIn}
        >
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6"
              variants={itemVariants}
            >
              About <span className="text-red-400">Bajdoliya Workshop</span>
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-xl"
              variants={itemVariants}
            >
              Your trusted automotive service partner with a legacy of excellence
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <motion.section 
          className="mb-16 lg:grid lg:grid-cols-2 lg:gap-16 items-center"
          variants={containerVariants}
        >
          <motion.div className="mb-8 lg:mb-0" variants={itemVariants}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2010, Bajdoliya Workshop began as a small garage with a vision to provide 
              honest, reliable car services to our community.
            </p>
            <p className="text-lg text-gray-600">
              Our founder brought over 20 years of experience and a passion for solving mechanical problems. 
              Today, we continue his legacy with certified technicians and state-of-the-art equipment.
            </p>
          </motion.div>
          <motion.div 
            className="relative rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://miro.medium.com/v2/resize:fit:4320/1*JktzC9GrA_l4yz0cCy8a5Q.jpeg"
              alt="Workshop interior"
              className="w-full h-auto object-cover border-2 border-red-600"
            />
          </motion.div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section 
          className="mb-16"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Why Choose Us?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              We go beyond standard repairs to deliver exceptional service
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Team */}
        <motion.section variants={containerVariants}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Meet Our Team
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              The skilled professionals who keep your vehicles running smoothly
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-40 w-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-red-100 shadow-lg">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-red-600 mb-3">{member.role}</p>
                <p className="text-gray-600">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* CTA */}
      <motion.section 
      className="bg-gray-900 text-white py-12"
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Google Map Section - Left Side */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <div className="h-64 sm:h-80 lg:h-96 rounded-xl shadow-2xl overflow-hidden border-2 border-red-500">
              <iframe
                title="Bajdoliya Workshop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.123456789012!2d75.7478112!3d26.8410987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5ea05c93e09%3A0x860a04daca91e807!2sBajdoliya%20Workshop%20(Foam%20Car%20Wash)!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl"
              />
            </div>

            {/* Address Box - Mobile Only */}
            <div className="mt-4 lg:hidden bg-gray-800 p-4 rounded-lg">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Our Location</h4>
                  <p className="text-gray-300 text-sm">
                    B152, Vidhan Shaba Nagar T Point, Dhalai, Jaipur - 302020
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Content - Right Side */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
              Ready to experience the <span className="text-red-400">Bajdoliya</span> difference?
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg">
              Visit our premium workshop or schedule your appointment today for exceptional car care.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <motion.button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-white text-red-600 font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarAlt className="mr-2" />
                Book Appointment
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone className="mr-2" />
                Contact Us
              </motion.button>
            </div>

            {/* Additional Info - Desktop Only */}
            <div className="mt-8 hidden lg:block bg-gray-800 p-4 rounded-lg">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Bajdoliya Workshop</h4>
                  <p className="text-gray-300 text-sm">
                    B152, Vidhan Shaba Nagar T Point<br />
                    Dhalai, Jaipur - 302020<br />
                    Near Patrakar Colony
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    <strong>Hours:</strong> Mon-Sat 8AM-8PM | Sun 10AM-4PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
    </motion.div>
  );
};

export default About;