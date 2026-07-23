import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBell,
  LuStar,
  LuMail,
  LuMailOpen,
  LuArchive,
  LuTrash2,
  LuClock,
  LuShieldAlert,
  LuShieldCheck,
  LuChevronRight,
  LuMapPin,
  LuHeart,
} from "react-icons/lu";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// SOS emergency notifications - Malang City scope only
const initialSosNotifications = [
  {
    id: "notif-1",
    type: "sos",
    title: "Active SOS Request: Wheelchair Lift Support Needed",
    message:
      "Budi Handoko requested manual lift assistance near Museum Brawijaya due to sidewalk curb excavation blockages.",
    locationName: "Jl. Ijen (Depan Museum Brawijaya)",
    coordinates: [112.6268, -7.976],
    time: "Just Now",
    read: false,
    favorite: false,
    archived: false,
    reporter: "Budi Handoko (Wheelchair Commuter)",
    reporterAvatar: "/images/avatars/avatar_budi_disability_1784680279512.png",
    actionLabel: "Respond & Open Map",
    stopId: "stop-sos-1",
  },
  {
    id: "notif-4",
    type: "sos",
    title: "Active SOS Request: Guide Companion Requested",
    message:
      "Siti Aminah requested human guide assistance to Stasiun Malang terminal platform due to sudden path construction blockades.",
    locationName: "Stasiun Malang (Sisi Barat)",
    coordinates: [112.6335, -7.987],
    time: "5 Minutes Ago",
    read: false,
    favorite: false,
    archived: false,
    reporter: "Siti Aminah (Visually Impaired)",
    reporterAvatar: "/images/avatars/avatar_siti_disability_1784680263685.png",
    actionLabel: "Respond & Open Map",
    stopId: "stop-sos-2",
  },
  {
    id: "notif-6",
    type: "sos",
    title: "Resolved SOS: Wheelchair Ramp Guide Assist",
    message:
      "Hendra Wijaya requested assistant to navigate through a steep slope near Alun-Alun Malang. Completed by volunteer Budi Santoso.",
    locationName: "Alun-Alun Malang (South Entrance)",
    coordinates: [112.6305, -7.9822],
    time: "2 Hours Ago",
    read: true,
    favorite: false,
    archived: true,
    reporter: "Hendra Wijaya (Wheelchair User)",
    reporterAvatar: "/images/avatars/avatar_hendra_1784680149451.png",
    actionLabel: "View Location on Map",
    stopId: "stop-2",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialSosNotifications);
  const [activeTab, setActiveTab] = useState("active"); // 'active' | 'resolved'
  const [expandedId, setExpandedId] = useState(null);

  const handleToggleResolve = (id, e) => {
    e.stopPropagation();
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, archived: !n.archived, read: true } : n,
      ),
    );
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "active") return !n.archived;
    if (activeTab === "resolved") return n.archived;
    return true;
  });

  const countActive = notifications.filter((n) => !n.archived).length;
  const countResolved = notifications.filter((n) => n.archived).length;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex-1 mx-auto max-w-[1440px] w-full px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-16"
      >
        <div className="max-w-4xl mx-auto flex flex-col">
          {/* Header Title Bar with Location Badge */}
          <div className="pb-6 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-950 flex items-center gap-3">
                <LuShieldAlert className="size-7 text-red-600 shrink-0" />
                <span>Emergency SOS Dispatch</span>
              </h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Monitor active emergency requests and direct navigation guides
                to support citizens in distress.
              </p>
            </div>

            {/* City Restriction Indicator */}
            <div className="flex items-center gap-2 bg-[#F5F5F3] px-3.5 py-2 rounded-lg border border-gray-250/70 self-start text-xs font-medium text-gray-800 shadow-2xs shrink-0">
              <LuMapPin className="size-3.5 text-gray-600 shrink-0" />
              <span>Active City: Malang</span>
            </div>
          </div>

          {/* SOS Dispatch Filter Tabs */}
          <div className="flex items-center border-b border-gray-200 bg-white">
            <button
              onClick={() => setActiveTab("active")}
              className={`py-3.5 px-6 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "active"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-red-500"
              }`}
            >
              <LuShieldAlert className="size-4 shrink-0" />
              <span>Active SOS Alerts</span>
            </button>

            <button
              onClick={() => setActiveTab("resolved")}
              className={`py-3.5 px-6 text-xs sm:text-sm font-normal flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "resolved"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <LuShieldCheck className="size-4 shrink-0 font-medium" />
              <span>Resolved / Completed</span>
            </button>
          </div>

          {/* SOS Inbox Row Grid */}
          <div className="flex flex-col border-x border-b border-gray-200 rounded-b-xl overflow-hidden shadow-2xs">
            <AnimatePresence initial={false} mode="popLayout">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => {
                  const isExpanded = expandedId === notif.id;
                  const isUnreadActive = !notif.read && !notif.archived;

                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      layout
                      className={`flex flex-col border-b border-gray-150 last:border-0 transition-colors ${
                        isExpanded
                          ? "bg-gray-50/70"
                          : isUnreadActive
                            ? "bg-red-50/30 hover:bg-red-50/45"
                            : "bg-white hover:bg-gray-50/40"
                      }`}
                    >
                      {/* Row Header */}
                      <div
                        onClick={() => handleRowClick(notif.id)}
                        className="flex items-center px-4 sm:px-6 py-4 gap-3.5 select-none cursor-pointer text-xs sm:text-sm min-w-0"
                      >
                        {/* 1. Pulsing dot indicator for new alert */}
                        <div className="w-2.5 shrink-0 flex items-center justify-center">
                          {isUnreadActive && (
                            <span className="size-2.5 rounded-full bg-red-650 animate-ping shrink-0" />
                          )}
                        </div>

                        {/* 2. Red Alert Bell Badge (Lucide Icons) */}
                        <div
                          className={`size-8 rounded-lg border flex items-center justify-center shrink-0 ${
                            notif.archived
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200/80"
                          }`}
                        >
                          {notif.archived ? (
                            <LuShieldCheck className="size-4 text-emerald-600" />
                          ) : (
                            <LuShieldAlert className="size-4 text-red-600 " />
                          )}
                        </div>

                        {/* 3. Title with Inline Shield */}
                        <div className="flex-1 min-w-0 pr-2 flex items-center gap-1.5 font-normal">
                          <span
                            className={`block truncate ${
                              notif.read ? "text-gray-650" : "text-gray-900"
                            }`}
                          >
                            {notif.title}
                          </span>
                        </div>

                        {/* 4. Relative time */}
                        <span className="text-[11px] text-gray-400 font-medium shrink-0 flex items-center gap-1 font-sans">
                          <LuClock className="size-3" />
                          {notif.time}
                        </span>
                      </div>

                      {/* Expanded Section Accordion */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-1.5 pl-16 pr-6 flex flex-col sm:flex-row items-start justify-between gap-5 border-t border-gray-100">
                              {/* Left Content details */}
                              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                <img
                                  src={notif.reporterAvatar}
                                  alt={notif.reporter}
                                  className="size-9 rounded-full object-cover border border-gray-250 shrink-0 mt-0.5"
                                />
                                <div className="space-y-1.5 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-gray-900 leading-tight">
                                      {notif.reporter}
                                    </span>
                                    <LuShieldCheck
                                      className="size-3.5 text-emerald-500 shrink-0"
                                      title="Verified Contributor"
                                    />
                                  </div>

                                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-normal">
                                    {notif.message}
                                  </p>

                                  {/* Map Location Coordinates Section */}
                                  <Link
                                    to={`/map?stop=${notif.stopId}`}
                                    className="inline-flex items-center gap-1.5 bg-[#F5F5F3] hover:bg-gray-200/80 px-2.5 py-1.5 rounded-lg border border-gray-200/80 text-[10px] sm:text-[11px] font-bold text-gray-800 transition-colors mt-2"
                                  >
                                    <LuMapPin className="size-3.5 text-red-650 shrink-0" />
                                    <span>
                                      Location: {notif.locationName} [
                                      {notif.coordinates[0]},{" "}
                                      {notif.coordinates[1]}]
                                    </span>
                                  </Link>
                                </div>
                              </div>

                              {/* Right Actions */}
                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleToggleResolve(notif.id, e)
                                  }
                                  className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                    notif.archived
                                      ? "border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                                      : "border-emerald-250 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/60"
                                  }`}
                                  title={
                                    notif.archived
                                      ? "Re-open SOS Request"
                                      : "Mark as Resolved"
                                  }
                                >
                                  <span>
                                    {notif.archived
                                      ? "Re-open SOS"
                                      : "Resolve SOS"}
                                  </span>
                                </button>

                                <Link
                                  to={`/map?stop=${notif.stopId}`}
                                  className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition-all shadow-2xs cursor-pointer inline-flex items-center gap-1"
                                >
                                  <span>{notif.actionLabel}</span>
                                  <LuChevronRight className="size-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-b-xl">
                  <div className="size-14 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100 mb-4">
                    <LuBell className="size-6 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900">
                    No SOS Alerts
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs mt-1 leading-normal font-normal">
                    You're all caught up! No active SOS requests in this queue.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
