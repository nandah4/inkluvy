import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";

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
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4F8FD] to-[#79B9F3]/35 text-gray-900 pt-16 sm:pt-24 pb-12 sm:pb-16 border-t border-gray-200/80">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 w-full"
      >
        {/* Main 3-Column Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pb-16 sm:pb-20">
          
          {/* Left Column: Brand Logo, Social Icons, Email, Address */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            {/* Official Inkluvy Brand Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 font-display text-2xl font-medium tracking-tight text-gray-900 transition-opacity hover:opacity-85"
            >
              <img
                src="/logo/Logo.png"
                alt="Logo Inkluvy"
                className="h-9 w-auto object-contain"
              />
              <span>INKLUVY</span>
            </a>

            {/* Social Media Round Outline Buttons */}
            <div className="flex items-center gap-2.5 mt-1">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="size-9 rounded-full border border-gray-300 bg-white/80 flex items-center justify-center text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xs"
              >
                <FaFacebookF className="size-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="size-9 rounded-full border border-gray-300 bg-white/80 flex items-center justify-center text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xs"
              >
                <FaInstagram className="size-3.5" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="size-9 rounded-full border border-gray-300 bg-white/80 flex items-center justify-center text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xs"
              >
                <FaLinkedinIn className="size-3.5" />
              </a>
              <a
                href="#twitter"
                aria-label="X (Twitter)"
                className="size-9 rounded-full border border-gray-300 bg-white/80 flex items-center justify-center text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xs"
              >
                <FaXTwitter className="size-3.5" />
              </a>
            </div>

            {/* Email Contact */}
            <div className="mt-1">
              <a
                href="mailto:hello@inkluvy.id"
                className="text-lg sm:text-xl font-medium tracking-tight text-gray-900 hover:text-secondary transition-colors"
              >
                hello@inkluvy.id
              </a>
            </div>

            {/* Address Lines */}
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              <p>Jl. Veteran No. 8, Ketawanggede,</p>
              <p>Kec. Lowokwaru, Kota Malang,</p>
              <p>Jawa Timur, Indonesia 65145</p>
            </div>
          </div>

          {/* Center Column: Connector Diagram + CTA Capsule Button */}
          <div className="lg:col-span-5 flex items-center justify-center px-2">
            <div className="flex items-center gap-3 sm:gap-5 w-full justify-center">
              
              {/* Left Bracket & Dot Matrix Graphic */}
              <div className="relative flex items-center">
                {/* Dot Matrix Decorative Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="size-1 rounded-full bg-secondary" />
                  ))}
                </div>
                {/* SVG Bracket Line */}
                <div className="h-20 sm:h-24 w-3 sm:w-4 border-y border-l border-gray-400/60 rounded-l-lg ml-1.5" />
                <div className="w-4 sm:w-8 h-[1px] bg-gray-400/60" />
              </div>

              {/* Center CTA Capsule Button */}
              <a
                href="#map-preview"
                className="group shrink-0 inline-flex items-center gap-2.5 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm sm:text-base font-medium tracking-tight">Explore Map</span>
                <span className="bg-primary/25 border border-primary/40 text-primary text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                  FREE
                </span>
              </a>

              {/* Right Bracket & Dot Matrix Graphic */}
              <div className="relative flex items-center">
                <div className="w-4 sm:w-8 h-[1px] bg-gray-400/60" />
                <div className="h-20 sm:h-24 w-3 sm:w-4 border-y border-r border-gray-400/60 rounded-r-lg mr-1.5" />
                {/* Dot Matrix Decorative Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="size-1 rounded-full bg-secondary" />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Inkluvy Navigation Links */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-3 font-display">
            <a
              href="#home"
              className="text-base sm:text-lg font-normal text-gray-700 hover:text-black transition-colors"
            >
              Home
            </a>
            <a
              href="#map-preview"
              className="text-base sm:text-lg font-normal text-gray-700 hover:text-black transition-colors"
            >
              Accessible Map
            </a>
            <a
              href="#how-it-works"
              className="text-base sm:text-lg font-normal text-gray-700 hover:text-black transition-colors"
            >
              How It Works
            </a>
            <a
              href="#core-features"
              className="text-base sm:text-lg font-normal text-gray-700 hover:text-black transition-colors"
            >
              Core Features
            </a>
            <a
              href="#community"
              className="text-base sm:text-lg font-medium text-gray-700 hover:text-black transition-colors"
            >
              Community Stories
            </a>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-900/10 text-xs sm:text-sm text-gray-600 font-normal">
          <div>
            <a
              href="#terms"
              className="underline hover:text-gray-900 transition-colors underline-offset-4 font-normal"
            >
              Terms and conditions
            </a>
          </div>

          <div>
            <span className="font-normal">© 2026 Inkluvy. All Rights Reserved</span>
          </div>

          <div>
            <a
              href="#privacy"
              className="underline hover:text-gray-900 transition-colors underline-offset-4 font-normal"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Giant Bottom Brand Watermark */}
        <div className="mt-6 sm:mt-10 w-full text-center pointer-events-none select-none overflow-hidden">
          <h2 className="text-[18vw] leading-[0.82] font-bold tracking-tighter text-[#3874FF]/10 uppercase font-display">
            inkluvy
          </h2>
        </div>
      </motion.div>
    </footer>
  );
}
