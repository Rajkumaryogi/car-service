import { motion } from "framer-motion";
import { FaTools, FaCarAlt, FaUsers, FaShieldAlt, FaPhone, FaClock } from 'react-icons/fa';
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
              About Bajdoliya Workshop
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
              className="w-full h-auto object-cover"
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
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4 mx-auto">
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
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-40 w-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-extrabold sm:text-4xl mb-6"
            variants={itemVariants}
          >
            Ready to experience the Bajdoliya difference?
          </motion.h2>
          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            <motion.button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Appointment
            </motion.button>
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
