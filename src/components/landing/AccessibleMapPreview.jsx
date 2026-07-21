import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuCheck,
  LuChevronRight,
  LuGlobe,
  LuHeart,
  LuMapPin,
  LuPlus,
  LuSearch,
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

const routeStops = [
  {
    id: "01",
    title: "Stasiun Kota",
    detail: "Lift & Ramp verified active",
    time: "09:00",
    status: "active",
    type: "Verified Access",
    condition: "Lift & Ramp Verified",
    conditionColor: "bg-emerald-500",
    score: "4.9",
    image: "/images/features/feature-1.png",
    lng: 112.6375,
    lat: -7.9785,
  },
  {
    id: "02",
    title: "Simpang Merdeka",
    detail: "Tactile paving & low slope",
    time: "09:20",
    status: "verified",
    type: "Wheelchair Approved",
    condition: "Low Slope & Tactile Paving",
    conditionColor: "bg-emerald-500",
    score: "4.8",
    image: "/images/features/feature-2.png",
    lng: 112.6326,
    lat: -7.9825,
  },
  {
    id: "03",
    title: "Taman Kota",
    detail: "Accessible drop-off zone",
    time: "09:40",
    status: "pending",
    type: "Community Verified",
    condition: "Accessible Drop-off Zone",
    conditionColor: "bg-emerald-500",
    score: "4.7",
    image: "/images/features/feature-3.png",
    lng: 112.6285,
    lat: -7.9865,
  },
  {
    id: "04",
    title: "Balai Kota Access",
    detail: "Wide sidewalk · 100% paved",
    time: "10:00",
    status: "pending",
    type: "Low Slope Path",
    condition: "100% Paved Sidewalk",
    conditionColor: "bg-emerald-500",
    score: "4.9",
    image: "/images/features/feature-1.png",
    lng: 112.634,
    lat: -7.9755,
  },
  {
    id: "05",
    title: "Monas Access Gate",
    detail: "Elevator active · ramp open",
    time: "10:20",
    status: "pending",
    type: "Elevator Active",
    condition: "Elevator Active & Open Ramp",
    conditionColor: "bg-emerald-500",
    score: "4.8",
    image: "/images/features/feature-2.png",
    lng: 112.625,
    lat: -7.973,
  },
  {
    id: "06",
    title: "Halte Central",
    detail: "Wheelchair accessible ramp",
    time: "10:30",
    status: "pending",
    type: "Destination Ready",
    condition: "Wheelchair Ramp Ready",
    conditionColor: "bg-emerald-500",
    score: "4.9",
    image: "/images/features/feature-3.png",
    lng: 112.621,
    lat: -7.969,
  },
];

const routeCoordinates = routeStops.map((stop) => [stop.lng, stop.lat]);

export default function AccessibleMapPreview() {
  const [activeStopId, setActiveStopId] = useState("01");
  const [showPopup, setShowPopup] = useState(true);
  const activeStop =
    routeStops.find((stop) => stop.id === activeStopId) ?? routeStops[0];

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
                <LuArrowRight className="size-3.5 sm:size-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                className="size-8 sm:size-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-2xs transition-colors shrink-0"
                aria-label="Filter"
              >
                <LuSlidersHorizontal className="size-3.5 sm:size-4" />
              </button>
            </div>
          </motion.div>

          {/* Main Full-Width Map Canvas Card */}
          <div className="rounded-xl overflow-hidden min-h-[480px] sm:min-h-[530px] h-[480px] sm:h-[530px] relative border border-gray-200/80 shadow-sm flex flex-col justify-between">
            {/* Real Mapcn Interactive Map */}
            <Map
              center={[112.63, -7.977]}
              zoom={13.2}
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
              {routeStops.map((stop) => {
                const isSelected = activeStopId === stop.id;
                return (
                  <MapMarker
                    key={stop.id}
                    longitude={stop.lng}
                    latitude={stop.lat}
                    onClick={() => {
                      setActiveStopId(stop.id);
                      setShowPopup(true);
                    }}
                  >
                    <MarkerContent>
                      <div
                        className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold shadow-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#F5F5F3] text-gray-900 border-white scale-110 z-30"
                            : "bg-white text-gray-800 border-gray-200 hover:scale-105 z-20"
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            stop.status === "verified" ||
                            stop.status === "active"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
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
                    <LuStar className="size-3.5 text-amber-500 fill-amber-500" />
                    <span>{activeStop.score}</span>
                  </div>
                </div>

                {/* Title & Info */}
                <div className="px-0.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="font-bold text-sm text-gray-900 truncate">
                      {activeStop.title}
                    </h4>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                      {activeStop.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeStop.detail}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-400">
                      {activeStop.time} AM
                    </span>
                    <span className="font-bold text-primary hover:underline cursor-pointer">
                      View Route →
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Floating Card Widgets Overlay */}
            <motion.div
              variants={bottomWidgetsVariants}
              className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5 pointer-events-auto"
            >
              {/* Card 1: Plan Custom Route (LEFT SIDE - 4 cols) */}
              <div className="md:col-span-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 shadow-md border border-gray-200/80 flex flex-row md:flex-col items-center justify-between md:justify-center text-left md:text-center gap-2">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                    Plan Custom Route
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 font-medium">
                    Set access needs & filters
                  </p>
                </div>
                <button
                  type="button"
                  className="size-7 sm:size-8 rounded-full bg-primary hover:scale-105 transition-transform shadow-xs text-white flex items-center justify-center shrink-0"
                >
                  <LuPlus className="size-4 text-white" />
                </button>
              </div>

              {/* Card 2: Waypoints & Route Conditions Board (RIGHT SIDE - 8 cols) */}
              <div className="md:col-span-8 bg-[#ffffff]/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 shadow-md border border-gray-200/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 flex items-center gap-1.5 min-w-0">
                    <LuShieldCheck className="size-3.5 sm:size-4 text-emerald-600 shrink-0" />
                    <span className="truncate">Route Waypoints & Conditions</span>
                  </h4>
                  <span className="text-[11px] sm:text-xs font-bold text-black hover:underline cursor-pointer flex items-center gap-0.5 shrink-0 ml-1">
                    View all ({routeStops.length}){" "}
                    <LuChevronRight className="size-3.5" />
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-0.5">
                  {routeStops.map((stop) => (
                    <div
                      key={stop.id}
                      onClick={() => {
                        setActiveStopId(stop.id);
                        setShowPopup(true);
                      }}
                      className={`min-w-[135px] sm:min-w-[155px] p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                        activeStopId === stop.id
                          ? "bg-primary/15 border-primary shadow-2xs"
                          : "bg-gray-50/80 border-gray-200/80 hover:bg-gray-100/80"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-xs text-gray-900 truncate">
                          {stop.id}. {stop.title}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {stop.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`size-2 rounded-full shrink-0 ${stop.conditionColor}`}
                        />
                        <p className="text-[11px] sm:text-xs text-gray-600 font-medium truncate">
                          {stop.condition}
                        </p>
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
