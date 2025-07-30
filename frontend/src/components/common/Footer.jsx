import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCar,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";
import { useState } from "react";
import { subscribeNewsletter } from "../../services/booking";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await subscribeNewsletter(email);

      if (response.success) {
        setMessage({
          text: response.message || "Thank you! Please check your email to confirm your subscription.",
          type: "success",
        });
        setEmail("");
      } else {
        setMessage({
          text: response.message || "Subscription failed. Please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage({
        text: "An error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-800 pt-12 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <img 
                src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/category_icons_new/xxxhdpi/1.png"
                alt="Bajdoliya Workshop Logo"
                className="w-10 h-10 mr-3"
              />
              <h3 className="text-xl font-bold text-gray-900">BAJDOLIYA WORKSHOP</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Your trusted partner for premium car service at Bajdoliya Workshop. We deliver
              excellence with every repair and maintenance service.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" className="text-gray-500 hover:text-red-600 transition-colors">
                <FaFacebook className="text-lg sm:text-xl" />
              </a>
              <a href="https://www.x.com/" className="text-gray-500 hover:text-red-600 transition-colors">
                <FaTwitter className="text-lg sm:text-xl" />
              </a>
              <a href="https://www.instagram.com/" className="text-gray-500 hover:text-red-600 transition-colors">
                <FaInstagram className="text-lg sm:text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/services" className="text-gray-600 hover:text-red-600 transition-colors flex items-center text-sm sm:text-base">
                  <FaTools className="mr-2 text-red-600 flex-shrink-0" /> Services
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-600 hover:text-red-600 transition-colors flex items-center text-sm sm:text-base">
                  <FaCar className="mr-2 text-red-600 flex-shrink-0" /> Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors flex items-center text-sm sm:text-base">
                  <FaShieldAlt className="mr-2 text-red-600 flex-shrink-0" /> Warranty
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors flex items-center text-sm sm:text-base">
                  <FaTools className="mr-2 text-red-600 flex-shrink-0" /> Maintenance Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-900">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="text-red-600 mt-0.5 mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-600 text-sm sm:text-base">
                <strong>
                <a href="tel:+919314201111" className="text-gray-600 hover:text-red-600 transition"></a>
                  +91 93142 01111
                </strong>
                </span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-red-600 mt-0.5 mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-600 text-sm sm:text-base">
                  bajdoliyaworkshop2018@gmail.com
                </span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-red-600 mt-0.5 mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-600 text-sm sm:text-base">
                  B152, Vidhan Shaba Nagar T Point, Dholai, Patrakar Colony, Jaipur - 302020
                </span>
              </li>
              <li className="flex items-start">
                <FaClock className="text-red-600 mt-0.5 mr-3 flex-shrink-0 text-sm sm:text-base" />
                <span className="text-gray-600 text-sm sm:text-base">
                  Mon-Sat: 8:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-900">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-3 text-sm sm:text-base">
              Subscribe to get updates on special offers and maintenance tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Subscribe Now'
                )}
              </button>
              {message.text && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Bajdoliya Workshop. All rights reserved.
          </p>
          <div className="text-gray-500 text-xs sm:text-sm flex items-center">
            <span>Created by </span>
            <a
              href="https://www.linkedin.com/in/rajkumaryogi-jnu"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-red-600 hover:underline"
            >
              YOGI
            </a>
            <span className="mx-1">&</span>
            <a
              href="https://www.linkedin.com/in/yuvraj-choudhary-921087246/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline"
            >
              YUVI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}