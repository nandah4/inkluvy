import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LuMenu,
  LuX,
  LuBell,
  LuUser,
  LuLogOut,
  LuChevronDown,
  LuChevronRight,
} from "react-icons/lu";
import { FaGlobeAfrica } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PRIMARY_NAVIGATION } from "../../lib/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState("EN");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    alert("Logged out successfully.");
    navigate("/");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto w-full transition-all duration-300 ${
          isScrolled ? "bg-white shadow-xs" : "bg-transparent py-0"
        }`}
      >
        <div className="mx-auto flex py-4 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo & Navigation Group on the Left */}
          <div className="flex items-center gap-10">
            {/* Brand/Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 font-display text-xl font-medium text-black transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 focus-visible:outline-offset-4"
            >
              <img
                src="/logo/Logo.png"
                alt="Logo Inkluvy"
                className="h-8 w-auto object-contain"
              />
              <span>INKLUVY</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Navigasi utama desktop"
            >
              {PRIMARY_NAVIGATION.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`text-sm tracking-wide transition-colors sm:py-1.5 duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 focus-visible:outline-offset-4 ${
                      isActive
                        ? "font-medium text-black"
                        : "font-normal text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Section: Language Switcher, Red Rounded SOS Notification, and Redesigned Profile Badge */}
          <div className="hidden items-center gap-6 lg:flex">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === "EN" ? "ID" : "EN")}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-2 transition-colors shrink-0 cursor-pointer hover:bg-gray-100/60"
              title="Change Language"
            >
              <FaGlobeAfrica className="size-4" />
              <span className="font-sans font-medium">{lang}</span>
            </button>

            {/* Red Rounded SOS Notification Button */}
            <Link
              to="/notifications"
              className="relative px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all shrink-0 cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-sm shadow-red-200/50"
              title="SOS Notifications"
            >
              <LuBell className="size-3.5" />
              <span>SOS</span>
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-650 ring-1 ring-white animate-ping" />
            </Link>

            {/* Clean Profile Badge Pill with Good Whitespace & Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 rounded-full transition-all duration-200 shrink-0 cursor-pointer"
              >
                <img
                  src="/images/profile-avatar.png"
                  alt="Syahla Aulia"
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-gray-900 leading-tight">
                    Syahla Aulia
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium leading-none mt-0.5">
                    Contributor
                  </span>
                </div>
                <LuChevronDown
                  className={`size-4 text-gray-400 ml-0.5 transition-transform duration-200 ${
                    isProfileDropdownOpen ? "rotate-180 text-gray-800" : ""
                  }`}
                />
              </button>

              {/* Ultra Clean Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-2.5 w-56 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl shadow-xl shadow-black/5 p-2 z-50"
                  >
                    {/* User Header Info inside Dropdown */}
                    <div className="p-3 rounded-xl bg-[#F5F5F3]/70 mb-1 flex items-center gap-3">
                      <img
                        src="/images/profile-avatar.png"
                        alt="Syahla Aulia"
                        className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-950 truncate leading-tight">
                          Syahla Aulia
                        </h4>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-normal truncate mt-0.5">
                          syahla@inkluvy.id
                        </p>
                      </div>
                    </div>

                    <div className="my-1 border-t border-gray-100" />

                    {/* Menu Links */}
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 text-xs font-medium text-gray-700 hover:text-gray-950 hover:bg-gray-100/70 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center text-gray-600 transition-colors">
                          <LuUser className="size-4" />
                        </div>
                        <span>Profile</span>
                      </div>
                      <LuChevronRight className="size-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50/70 rounded-xl transition-colors text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-red-50 group-hover:bg-red-100/80 flex items-center justify-center text-red-600 transition-colors">
                          <LuLogOut className="size-4" />
                        </div>
                        <span>Logout</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-800 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent-400"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <LuX className="size-6" />
              ) : (
                <LuMenu className="size-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 px-6 py-6 shadow-lg lg:hidden animate-in slide-in-from-top duration-200">
            <nav
              className="flex flex-col gap-4 mb-6"
              aria-label="Navigasi utama mobile"
            >
              {PRIMARY_NAVIGATION.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={closeMenu}
                    className={`text-base py-2 border-b border-slate-50 last:border-0 ${
                      isActive
                        ? "font-semibold text-black"
                        : "font-normal text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            {/* Mobile Profile & Extras Area */}
            <div className="pt-5 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-3.5">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 shrink-0 py-1"
                >
                  <img
                    src="/images/profile-avatar.png"
                    alt="Syahla Aulia"
                    className="size-9 rounded-full object-cover border border-gray-200/80"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                      Syahla Aulia
                    </span>
                    <span className="text-[10px] sm:text-xs text-blue-500 font-bold tracking-wide mt-0.5">
                      Contributor
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  {/* Language Toggle Mobile */}
                  <button
                    type="button"
                    onClick={() => setLang(lang === "EN" ? "ID" : "EN")}
                    className="px-2 py-1.5 text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaGlobeAfrica className="size-4 text-sky-500" />
                    <span>{lang}</span>
                  </button>

                  {/* Notification Bell Mobile with SOS Label */}
                  <Link
                    to="/notifications"
                    onClick={closeMenu}
                    className="relative px-2 py-1.5 text-red-750 cursor-pointer flex items-center gap-2"
                    title="SOS"
                  >
                    <div className="relative">
                      <LuBell className="size-4 text-red-600" />
                      <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-650 ring-1 ring-white animate-pulse" />
                    </div>
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-xs font-bold text-red-600">
                        SOS
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </header>
  );
}
