import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuArrowRight,
  LuCheck,
  LuChevronRight,
  LuGlobe,
  LuHeart,
  LuImage,
  LuMapPin,
  LuPlus,
  LuSearch,
  LuShieldAlert,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuStar,
  LuX,
} from "react-icons/lu";

import {
  Map,
  MapMarker,
  MarkerContent,
  MapControls,
  MapRoute,
} from "../map/MapCanvas";
import { ACCESSIBILITY_STATUS } from "../../lib/accessibilityStatus";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -25,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardContainerVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1,
    },
  },
};

const topBarVariants = {
  hidden: {
    opacity: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
    },
  },
};

const bottomWidgetsVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.35,
    },
  },
};

// Interactive map stops matching /map page for consistency
const routeStops = [
  {
    id: "01",
    title: "Jl. Ijen Boulevard Ramp",
    detail: "Verified Accessible & Safe · 3° Gentle Slope",
    time: "09:00",
    status: "verified",
    type: "Wheelchair Ramp",
    vulnerability: "safe",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.safe.labelWithBadge,
    condition: ACCESSIBILITY_STATUS.safe.label,
    conditionColor: "bg-emerald-500",
    score: "4.9",
    image: "/images/map/map_ramp_condition.png",
    lng: 112.6245,
    lat: -7.9722,
    reporter: "Syahla Aulia",
    reporterAvatar: "/images/profile-avatar.png",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "02",
    title: "Museum Brawijaya Entrance",
    detail: "Elevator & Restroom Active",
    time: "09:15",
    status: "verified",
    type: "Cultural Venue",
    vulnerability: "safe",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.safe.labelWithBadge,
    condition: ACCESSIBILITY_STATUS.safe.label,
    conditionColor: "bg-emerald-500",
    score: "4.8",
    image: "/images/map/map_museum_entrance.png",
    lng: 112.6289,
    lat: -7.9785,
    reporter: "Siti Rahma",
    reporterAvatar: "/images/avatars/avatar_siti.png",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "03",
    title: "Trotoar Jl. Veteran",
    detail: "Construction · Temporary Wooden Ramp",
    time: "09:30",
    status: "warning",
    type: "Obstacle Warning",
    vulnerability: "vulnerable",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.vulnerable.labelWithBadge,
    condition: ACCESSIBILITY_STATUS.vulnerable.label,
    conditionColor: "bg-amber-500",
    score: "4.2",
    image: "/images/map/map_construction_obstacle.png",
    lng: 112.6319,
    lat: -7.9858,
    reporter: "Fadhil Rizky",
    reporterAvatar: "/images/avatars/avatar_fadhil.png",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: "04",
    title: "Stasiun Malang Kota Baru",
    detail: "Lift Peron 2 Active & Staff Ready",
    time: "09:45",
    status: "verified",
    type: "Transit Elevator Hub",
    vulnerability: "safe",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.safe.labelWithBadge,
    condition: ACCESSIBILITY_STATUS.safe.label,
    conditionColor: "bg-emerald-500",
    score: "4.9",
    image: "/images/map/map_station_elevator.png",
    lng: 112.6375,
    lat: -7.9892,
    reporter: "Budi Santoso",
    reporterAvatar: "/images/avatars/avatar_budi.png",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "05",
    title: "Pasar Besar Tactile Path",
    detail: "Tactile blocks partially worn out",
    time: "10:00",
    status: "warning",
    type: "Tactile Block Warning",
    vulnerability: "vulnerable",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.vulnerable.labelWithBadge,
    condition: ACCESSIBILITY_STATUS.vulnerable.label,
    conditionColor: "bg-amber-500",
    score: "4.0",
    image: "/images/community/community_sidewalk_ramp.png",
    lng: 112.6345,
    lat: -7.983,
    reporter: "Maya Indah",
    reporterAvatar: "/images/avatars/avatar_maya.png",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
];

const routeCoordinates = routeStops.map((stop) => [stop.lng, stop.lat]);

export default function AccessibleMapPreview() {
  const [activeStopId, setActiveStopId] = useState("02");
  const [showPopup, setShowPopup] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredStops = routeStops.filter((stop) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "safe") return stop.vulnerability === "safe";
    if (selectedFilter === "vulnerable") return stop.vulnerability === "vulnerable";
    return true;
  });

  const activeStop =
    filteredStops.find((stop) => stop.id === activeStopId) ?? filteredStops[0] ?? routeStops[0];

  return (
    <section
      id="map-preview"
      className="relative z-30 bg-white py-8 sm:py-12 overflow-hidden"
    >
      {/* Header Block with enter/exit scroll animation */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-6 sm:px-10 lg:px-16"
      >
        <h2 className="font-base text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-gray-900">
          Explore the Map
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto font-normal">
          Explore accessible points near you before you take a single step
          outside. This is a live snapshot — the full map has even more.
        </p>
      </motion.div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Outer White Card Wrapper */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-xs flex flex-col gap-4"
        >
          {/* Top Full-Width Header Search Bar */}
          <motion.div
            variants={topBarVariants}
            className="w-full bg-[#F5F5F3] rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 border border-gray-200/80 shadow-2xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
              <div className="size-8 sm:size-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 border border-gray-100 shrink-0">
                <LuGlobe className="size-4 sm:size-5 text-gray-800" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-xs sm:text-base text-gray-900 truncate">
                  Search an accessible route or place...
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 truncate mt-0.5 font-medium">
                  Malang · Real-time · Wheelchair, Ramp & Lift
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/map"
                className="group rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200/90 bg-black text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-2xs transition-all duration-300"
                aria-label="Explore Accessible Map"
              >
                <span className="font-medium text-xs sm:text-sm whitespace-nowrap">Explore Map</span>
                <LuArrowRight className="size-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                className="size-8 sm:size-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-2xs transition-colors shrink-0"
                aria-label="Filter"
              >
                <LuSlidersHorizontal className="size-4" />
              </button>
            </div>
          </motion.div>

          {/* Main Full-Width Map Canvas Card */}
          <div className="rounded-xl overflow-hidden min-h-[480px] sm:min-h-[530px] h-[480px] sm:h-[530px] relative border border-gray-200/80 shadow-sm flex flex-col justify-between">
            {/* Real Mapcn Interactive Map */}
            <Map
              center={[112.6319, -7.9808]}
              zoom={13.6}
              attributionControl={false}
              className="w-full h-full min-h-[460px] sm:min-h-[500px]"
            >
              {/* Polyline Route Path */}
              <MapRoute
                coordinates={routeCoordinates}
                color="#79B9F3"
                width={5}
                opacity={0.9}
              />

              {/* Floating Pill Markers on Map */}
              {filteredStops.map((stop) => {
                const isSelected = activeStopId === stop.id;
                return (
                  <MapMarker
                    key={stop.id}
                    longitude={stop.lng}
                    latitude={stop.lat}
                    coordinates={[stop.lng, stop.lat]}
                    onClick={() => {
                      setActiveStopId(stop.id);
                      setShowPopup(true);
                    }}
                  >
                    <MarkerContent>
                      <div
                        className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold shadow-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#79B9F3] text-white border-[#5ca8ee] scale-110 z-30 shadow-lg"
                            : stop.vulnerability === "vulnerable"
                            ? "bg-amber-50 text-amber-900 border-amber-300 shadow-2xs z-10 font-semibold"
                            : "bg-white text-gray-800 border-gray-200/90 hover:border-gray-300 shadow-2xs z-20"
                        }`}
                      >
                        {stop.vulnerability === "vulnerable" ? (
                          <LuShieldAlert className="size-4 text-amber-600 shrink-0" />
                        ) : (
                          <LuMapPin
                            className={`size-4 ${
                              isSelected ? "text-white" : "text-primary"
                            }`}
                          />
                        )}
                        <span className="font-medium whitespace-nowrap">{stop.title}</span>
                      </div>
                    </MarkerContent>
                  </MapMarker>
                );
              })}

              {/* Map Controls (Zoom / Center) */}
              <MapControls position="top-right" />
            </Map>

            {/* Floating Selected Place Preview Card */}
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-3 right-3 left-3 sm:left-auto sm:right-4 sm:top-4 z-30 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-xl border border-gray-200/80 w-auto sm:w-72 max-w-sm pointer-events-auto"
              >
                {/* Image Banner */}
                <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mb-3">
                  <img
                    src={activeStop.image}
                    alt={activeStop.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="absolute top-2 right-2 size-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:bg-white shadow-xs transition-colors"
                  >
                    <LuX className="size-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1 shadow-xs">
                    <LuStar className="size-4 text-amber-500 fill-amber-500" />
                    <span>{activeStop.score}</span>
                  </div>
                </div>

                {/* Title & Info */}
                <div className="px-0.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="font-bold text-sm text-gray-900 truncate">
                      {activeStop.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      activeStop.vulnerability === "vulnerable"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}>
                      {activeStop.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-normal leading-relaxed">
                    {activeStop.detail}
                  </p>
                  
                  {/* Reporter Info */}
                  <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    <img
                      src={activeStop.reporterAvatar}
                      alt={activeStop.reporter}
                      className="size-4 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                    <span className="flex items-center gap-1">
                      Uploaded by <strong>{activeStop.reporter}</strong>
                      <LuShieldCheck className="size-3 text-emerald-600 shrink-0" title="Verified Reporter" />
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-400 font-medium">
                      {activeStop.time} AM
                    </span>
                    <Link
                      to="/map"
                      className="font-bold text-black hover:underline flex items-center gap-0.5"
                    >
                      View Route →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Floating Card Widgets Overlay */}
            <motion.div
              variants={bottomWidgetsVariants}
              className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5 pointer-events-auto"
            >
              {/* Card 1: Safety Status Layer Filter (LEFT SIDE - 4 cols) */}
              <div className="md:col-span-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-md border border-gray-200/80 flex flex-col justify-start gap-2.5 text-left">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                    Safety Filter
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 font-medium">
                    Filter markers by route condition
                  </p>
                </div>
                
                <div className="flex flex-row md:flex-col lg:flex-row gap-1.5 w-full md:mt-1.5">
                  {[
                    { id: "all", label: "All", badge: "🔍" },
                    { id: "safe", label: ACCESSIBILITY_STATUS.safe.label, badge: ACCESSIBILITY_STATUS.safe.badge },
                    { id: "vulnerable", label: ACCESSIBILITY_STATUS.vulnerable.label, badge: ACCESSIBILITY_STATUS.vulnerable.badge },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedFilter(item.id)}
                      className={`flex-1 py-1 px-2 rounded-lg text-[11px] sm:text-xs font-bold border flex items-center justify-center gap-1 transition-all ${
                        selectedFilter === item.id
                          ? "bg-black text-white border-black shadow-2xs"
                          : "bg-[#F5F5F3] text-gray-700 border-gray-200/60 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-[9px] sm:text-[10px] font-bold shrink-0">{item.badge}</span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card 2: Route Details Waypoint Card with Thumbnail & Author (RIGHT SIDE - 8 cols) */}
              <div className="md:col-span-8 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 shadow-md border border-gray-200/80 flex flex-col justify-between gap-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5 min-w-0">
                    <span className="truncate">Route Details</span>
                  </h4>
                  <Link
                    to="/map"
                    className="text-[11px] sm:text-xs font-bold text-black hover:underline flex items-center gap-0.5 shrink-0 ml-1"
                  >
                    View all ({filteredStops.length}){" "}
                    <LuChevronRight className="size-4" />
                  </Link>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-0.5">
                  {filteredStops.map((stop) => (
                    <div
                      key={stop.id}
                      onClick={() => {
                        setActiveStopId(stop.id);
                        setShowPopup(true);
                      }}
                      className={`min-w-[190px] sm:min-w-[220px] p-2 rounded-lg border transition-all cursor-pointer shrink-0 flex items-start gap-2.5 ${
                        activeStopId === stop.id
                          ? "bg-[#79B9F3]/10 border-[#79B9F3] shadow-2xs"
                          : "bg-[#F5F5F3]/50 border-gray-200/80 hover:bg-gray-100"
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="size-11 sm:size-12 rounded-lg overflow-hidden border border-gray-200/80 shrink-0">
                        <img src={stop.image} alt={stop.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="min-w-0 flex-1 flex flex-col justify-between h-11 sm:h-12">
                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-[11px] sm:text-xs text-gray-900 truncate">
                              {stop.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span
                              className={`size-2 rounded-full shrink-0 ${
                                stop.vulnerability === "vulnerable" ? "bg-amber-500" : "bg-emerald-500"
                              }`}
                            />
                            <span className="text-[9px] sm:text-[10px] text-gray-500 truncate font-semibold">
                              {stop.vulnerability === "vulnerable"
                                ? ACCESSIBILITY_STATUS.vulnerable.label
                                : ACCESSIBILITY_STATUS.safe.verifiedLabel}
                            </span>
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-1 pt-1 border-t border-gray-100 text-[9px] sm:text-[10px] text-gray-400">
                          <img
                            src={stop.reporterAvatar}
                            alt={stop.reporter}
                            className="w-4 h-4 rounded-full object-cover border border-gray-200 shrink-0"
                          />
                          <span className="truncate flex items-center gap-1">
                            By {stop.reporter}
                            <LuShieldCheck className="size-3 text-emerald-600 shrink-0" title="Verified Reporter" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
