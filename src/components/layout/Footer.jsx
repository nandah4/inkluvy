import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import {
  ACCOUNT_NAVIGATION,
  PRIMARY_NAVIGATION,
} from "../../lib/navigation";

const footerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background text-gray-900 pt-16 sm:pt-20 pb-10 sm:pb-12">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 w-full"
      >
        {/* Main Layout: Left Brand Logo & Right 3 Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 sm:pb-20">
          {/* Left Column: Brand Logo */}
          <div className="lg:col-span-5 flex flex-col items-start justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-85"
            >
              <img
                src="/logo/Logo.png"
                alt="Logo Inkluvy"
                className="h-9 sm:h-10 w-auto object-contain"
              />
              <span>INKLUVY</span>
            </Link>
          </div>

          {/* Right Columns: navigation mirrors the available app routes */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Primary navigation — shared with the navbar */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                Explore
              </h4>
              {PRIMARY_NAVIGATION.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Profile controls available from the navbar */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                Account
              </h4>
              {ACCOUNT_NAVIGATION.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Support and contact */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                Contact
              </h4>
              <a
                href="mailto:hello@inkluvy.id"
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                hello@inkluvy.id
              </a>
              <Link
                to="/support"
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Support Center
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching reference image (Copyright on left, Round Colored Social Icons on right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/90 text-xs sm:text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-600">
              © 2026 Inkluvy. All rights reserved
            </span>
          </div>

          {/* Round Colored Social Media Icon Buttons matching reference image */}
          <div className="flex items-center gap-2.5">
            <a
              href="#facebook"
              aria-label="Facebook"
              className="size-7 sm:size-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-2xs"
            >
              <FaFacebookF className="size-3.5" />
            </a>
            <a
              href="#linkedin"
              aria-label="LinkedIn"
              className="size-7 sm:size-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-2xs"
            >
              <FaLinkedinIn className="size-3.5" />
            </a>
            <a
              href="#youtube"
              aria-label="YouTube"
              className="size-7 sm:size-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-2xs"
            >
              <FaYoutube className="size-3.5" />
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="size-7 sm:size-8 rounded-full bg-[#E4405F] text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-2xs"
            >
              <FaInstagram className="size-3.5" />
            </a>
            <a
              href="#twitter"
              aria-label="X (Twitter)"
              className="size-7 sm:size-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition-opacity shadow-2xs"
            >
              <FaXTwitter className="size-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
