import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaTools, FaCar, FaOilCan, FaWrench } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://car-service-production.up.railway.app/api/send-message/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("🎉 Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
          setTimeout(() => setSuccessMessage(""), 5000);
        } else {
          setApiError(data.message || "Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setApiError("Network error. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.3 },
  };

  const tapEffect = {
    scale: 0.98,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="text-red-600">Contact</span> Our Workshop
          </motion.h2>
          <motion.p
            variants={item}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Need car service or have questions? Our team is ready to help!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-2 border-red-600"
          >
            <div className="p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaTools className="text-red-600 mr-3" />
                Service Inquiry Form
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={item}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </motion.div>

                <motion.div variants={item}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </motion.div>

                <motion.div variants={item}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                    placeholder="Describe your car service needs (model, issue, etc.)"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </motion.div>

                <motion.div variants={item}>
                  <motion.button
                    type="submit"
                    whileHover={hoverEffect}
                    whileTap={tapEffect}
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FaWrench className="mr-2" />
                        Request Service
                      </span>
                    )}
                  </motion.button>
                </motion.div>

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 text-green-700 rounded-lg text-center"
                  >
                    {successMessage}
                  </motion.div>
                )}

                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-100 text-red-700 rounded-lg text-center"
                  >
                    {apiError}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Google Map */}
            <motion.div
              variants={item}
              className="h-64 sm:h-80 lg:h-96 rounded-2xl shadow-xl overflow-hidden border-l-2 border-red-600 hover:shadow-2xl transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.01 }}
            >
              <iframe
                title="Workshop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.123456789012!2d75.7478112!3d26.8410987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5ea05c93e09%3A0x860a04daca91e807!2sBajdoliya%20Workshop%20(Foam%20Car%20Wash)!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="rounded-2xl"
              ></iframe>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={item}
              className="bg-white p-8 rounded-2xl shadow-xl border-l-2 border-red-600 space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaCar className="text-red-600 mr-3" />
                Workshop Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-red-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Workshop Address</h4>
                    <p className="text-gray-600">B152, Vidhan Shaba Nagar T Point, Dhalai, Jaipur, Patrakar Colony, Jaipur - 302020 (Near Patrakar Colony)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-red-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <a href="mailto:bajdoliyaworkshop2018@gmail.com" className="text-gray-600 hover:text-red-600 transition">
                      bajdoliyaworkshop2018@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhoneAlt className="text-red-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <a href="tel:+919314201111" className="text-gray-600 hover:text-red-600 transition">
                      +91 93142 01111
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaOilCan className="text-red-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Working Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Follow Our Workshop</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: <FaFacebook />, color: "hover:text-red-600", href: "https://www.facebook.com/" },
                    { icon: <FaInstagram />, color: "hover:text-red-600", href: "https://www.instagram.com/" },
                    { icon: <FaTwitter />, color: "hover:text-red-600", href: "https://x.com/" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-600 text-2xl ${social.color} transition-colors`}
                      whileHover={{ y: -3 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;