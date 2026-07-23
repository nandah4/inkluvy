import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuChevronRight,
  LuClock,
  LuCompass,
  LuFilter,
  LuGift,
  LuHeadphones,
  LuHeart,
  LuImage,
  LuLayers,
  LuLifeBuoy,
  LuMapPin,
  LuNavigation,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPhoneCall,
  LuPlus,
  LuSearch,
  LuShieldAlert,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuSparkles,
  LuUpload,
  LuUser,
  LuVolume2,
  LuVolumeX,
  LuX,
} from "react-icons/lu";

import {
  Map,
  MapMarker,
  MarkerContent,
  MapControls,
  MapRoute,
} from "../components/map/MapCanvas";
import { ACCESSIBILITY_STATUS } from "../lib/accessibilityStatus";

// Route coordinates through Malang city
const routeCoordinates = [
  [112.6245, -7.9722], // Start: Jl. Ijen Boulevard
  [112.6289, -7.9785], // Mid 1: Museum Brawijaya
  [112.6319, -7.9858], // Mid 2: Alun-Alun Malang
  [112.6375, -7.9892], // End: Stasiun Malang Kota Baru
];

// User current location coordinates
const userLocationCoordinates = [112.6268, -7.975];

// Interactive map stops with 2 main vulnerability categories (Accessible & Safe 🟢 & Caution / Vulnerable 🟡)
const initialStops = [
  {
    id: "stop-1",
    name: "Jl. Ijen Boulevard Ramp",
    category: "Wheelchair Ramp",
    coordinates: [112.6245, -7.9722],
    slope: "3° (Gentle)",
    status: ACCESSIBILITY_STATUS.safe.verifiedLabel,
    type: "ramp",
    vulnerability: "safe",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.safe.labelWithBadge,
    details:
      "Rampa beton khusus disabilitas dengan railing stainless ganda. Kondisi sangat baik.",
    updatedTime: "10 mins ago",
    reporter: "Syahla Aulia",
    reporterAvatar: "/images/profile-avatar.png",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: "/images/map/map_ramp_condition.png",
  },
  {
    id: "stop-2",
    name: "Museum Brawijaya Entrance",
    category: "Accessible Cultural Venue",
    coordinates: [112.6289, -7.9785],
    slope: "4° (Low Slope)",
    status: "Elevator & Restroom Active",
    type: "facility",
    vulnerability: "safe",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.safe.labelWithBadge,
    details:
      "Pintu masuk khusus kursi roda di sisi barat, lift peron aktif dan toilet aksesibel bersih.",
    updatedTime: "15 mins ago",
    reporter: "Siti Rahma",
    reporterAvatar: "/images/avatars/avatar_siti.png",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: "/images/map/map_museum_entrance.png",
  },
  {
    id: "stop-3",
    name: "Trotoar Jl. Veteran",
    category: "Construction Obstacle",
    coordinates: [112.6319, -7.9858],
    slope: "Caution Needed",
    status: "Rampa Kayu Sementara",
    type: "warning",
    vulnerability: "vulnerable",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.vulnerable.labelWithBadge,
    details:
      "Pengerjaan saluran air di trotoar. Kontraktor memasang rampa kayu darurat dengan rambu kuning.",
    updatedTime: "1 hour ago",
    reporter: "Fadhil Rizky",
    reporterAvatar: "/images/avatars/avatar_fadhil.png",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    image: "/images/map/map_construction_obstacle.png",
  },
  {
    id: "stop-4",
    name: "Stasiun Malang Kota Baru (Lift Peron)",
    category: "Transit Elevator Hub",
    coordinates: [112.6375, -7.9892],
    slope: "0° (Level Access)",
    status: "Lift & Staff Assist Ready",
    type: "elevator",
    vulnerability: "safe",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.safe.labelWithBadge,
    details:
      "Lift peron 2 beroperasi penuh. Petugas siap membantu pengguna kursi roda dan lansia.",
    updatedTime: "5 mins ago",
    reporter: "Budi Santoso",
    reporterAvatar: "/images/avatars/avatar_budi.png",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: "/images/map/map_station_elevator.png",
  },
  {
    id: "stop-5",
    name: "Ubin Pemandu Aus Depan Pasar Besar",
    category: "Tactile Block Warning",
    coordinates: [112.6345, -7.983],
    slope: "Medium Caution",
    status: "Perlu Perbaikan Ubin",
    type: "warning",
    vulnerability: "vulnerable",
    vulnerabilityLabel: ACCESSIBILITY_STATUS.vulnerable.labelWithBadge,
    details:
      "Sebagian ubin pengarah tunanetra aus/terlepas akibat gesekan kendaraan parkir tepi jalan.",
    updatedTime: "2 hours ago",
    reporter: "Maya Indah",
    reporterAvatar: "/images/avatars/avatar_maya.png",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    image: "/images/community/community_sidewalk_ramp.png",
  },
  {
    id: "stop-sos-1",
    name: "[SOS] Wheelchair Assistance Needed",
    category: "Emergency SOS Support",
    coordinates: [112.6268, -7.9760],
    slope: "Immediate Help Req",
    status: "Awaiting Volunteer",
    type: "sos",
    vulnerability: "vulnerable",
    vulnerabilityLabel: "🚨 Emergency SOS",
    details: "Wheelchair user stuck at high curb due to sidewalk excavation. Requests manual lift support.",
    updatedTime: "2 mins ago",
    reporter: "Budi Handoko (Wheelchair Commuter)",
    reporterAvatar: "/images/avatars/avatar_budi_disability_1784680279512.png",
    badgeColor: "bg-red-50 text-red-750 border-red-200 animate-pulse",
    image: null,
  },
  {
    id: "stop-sos-2",
    name: "[SOS] Blind Guide Companion Requested",
    category: "Emergency SOS Support",
    coordinates: [112.6335, -7.9870],
    slope: "Immediate Help Req",
    status: "Awaiting Volunteer",
    type: "sos",
    vulnerability: "vulnerable",
    vulnerabilityLabel: "🚨 Emergency SOS",
    details: "Tunanetra commuter lost connection to tactile path due to sudden blockades. Requests guide to terminal.",
    updatedTime: "5 mins ago",
    reporter: "Siti Aminah (Visually Impaired)",
    reporterAvatar: "/images/avatars/avatar_siti_disability_1784680263685.png",
    badgeColor: "bg-red-50 text-red-750 border-red-200 animate-pulse",
    image: null,
  },
];

// Transit Vehicle Itinerary with priority indicators
const transitItinerary = [
  {
    id: "transit-1",
    step: 1,
    type: "bus",
    lineName: "Malang Trans Line 1A (Ijen Direction)",
    from: "Halte Ijen Boulevard",
    to: "Halte Alun-Alun Malang",
    duration: "12 mins",
    wheelchairPriority: true,
    priorityIndicator: "Priority Seating & Wheelchair Space Available ♿",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    details:
      "Low-floor bus equipped with an automatic folding ramp. Front entrance boarding recommended.",
    icon: "🚌",
    image: "/images/map/low_floor_bus.png",
  },
  {
    id: "transit-2",
    step: 2,
    type: "transfer",
    lineName: "Tactile Platform Connection",
    from: "Halte Alun-Alun Malang",
    to: "Alun-Alun Transit Point",
    duration: "3 mins",
    wheelchairPriority: false,
    priorityIndicator: null,
    badgeColor: "bg-gray-200 text-gray-700 border-gray-200",
    details:
      "Follow the yellow tactile guiding blocks on the pavement for a safe 50m walk/roll transfer.",
    icon: "🦯",
    image: null,
  },
  {
    id: "transit-3",
    step: 3,
    type: "bus",
    lineName: "City Shuttle Bus B2 (Malang Hub)",
    from: "Alun-Alun Transit Point",
    to: "Stasiun Malang (South Gate)",
    duration: "8 mins",
    wheelchairPriority: true,
    priorityIndicator: "Priority Seating Available ♿",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    details:
      "Equipped with low-floor access. Priority seating occupies the front left row.",
    icon: "🚌",
    image: "/images/map/electric_shuttle.png",
  },
  {
    id: "transit-4",
    step: 4,
    type: "train",
    lineName: "Malang Commuter Line (Platform 1)",
    from: "Stasiun Malang Kota Baru",
    to: "Tujuan Akhir (Destination)",
    duration: "Local Rail",
    wheelchairPriority: true,
    priorityIndicator: "Priority Coach with Dedicated Wheelchair Space ♿",
    badgeColor: "bg-blue-50 text-blue-750 border-blue-200",
    details:
      "Priority space located in Coach 1 and Coach 5. Station agents provide manual ramps on request.",
    icon: "🚆",
    image: "/images/map/inkluvy_cab.png",
  },
];

export default function AccessibleMap() {
  const [stops, setStops] = useState(initialStops);
  const [activeStopId, setActiveStopId] = useState("stop-2");
  const [activeTab, setActiveTab] = useState("route"); // 'route' | 'facilities'
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showSosModal, setShowSosModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const stopParam = searchParams.get("stop");
    if (stopParam) {
      setActiveStopId(stopParam);
      // If it's a SOS stop, also set the filter to 'sos' or 'all' so that it shows on the map!
      if (stopParam.startsWith("stop-sos")) {
        setSelectedFilter("sos");
        setActiveTab("facilities"); // Switch tab to see it listed
      }
    }
  }, [searchParams]);

  // Search & Navigation States
  const [startPoint, setStartPoint] = useState("Jl. Ijen Boulevard, Malang");
  const [destinationPoint, setDestinationPoint] = useState(
    "Stasiun Malang Kota Baru",
  );
  const [accessNeed, setAccessNeed] = useState("Wheelchair Ramps");

  const activeStop = stops.find((s) => s.id === activeStopId) || stops[0];

  const filteredStops = stops.filter((stop) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "safe") return stop.vulnerability === "safe";
    if (selectedFilter === "vulnerable")
      return stop.vulnerability === "vulnerable";
    return stop.type === selectedFilter;
  });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F5F5F3] font-sans">
      {/* Real Mapcn Interactive Map Layer */}
      <div className="absolute inset-0 z-0">
        <Map
          center={[112.6319, -7.9858]}
          zoom={13.8}
          attributionControl={false}
          className="w-full h-full"
        >
          {/* Main Accessible Polyline Route Path - Segmented by condition */}
          {/* Segment 1: Safe (Blue) */}
          <MapRoute
            coordinates={[
              [112.6245, -7.9722], // Start: Jl. Ijen Boulevard
              [112.6289, -7.9785], // Mid 1: Museum Brawijaya
            ]}
            color="#3874FF"
            width={6}
            opacity={0.95}
          />
          {/* Segment 2: Caution/Vulnerable (Yellow/Amber) */}
          <MapRoute
            coordinates={[
              [112.6289, -7.9785], // Mid 1: Museum Brawijaya
              [112.6319, -7.9858], // Mid 2: Trotoar Jl. Veteran
            ]}
            color="#FBBF24" // Yellow for caution
            width={6}
            opacity={0.95}
          />
          {/* Segment 3: Safe (Blue) */}
          <MapRoute
            coordinates={[
              [112.6319, -7.9858], // Mid 2: Trotoar Jl. Veteran
              [112.6375, -7.9892], // End: Stasiun Malang Kota Baru
            ]}
            color="#3874FF"
            width={6}
            opacity={0.95}
          />

          {/* User Current Location Marker ("Your Location") */}
          <MapMarker
            longitude={userLocationCoordinates[0]}
            latitude={userLocationCoordinates[1]}
            coordinates={userLocationCoordinates}
          >
            <MarkerContent>
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="cursor-pointer px-3 py-1.5 rounded-full shadow-lg border border-blue-300 bg-[#3874FF] text-white flex items-center gap-2 z-40"
              >
                <span className="size-2 rounded-full bg-white animate-ping" />
                <span className="text-xs font-medium whitespace-nowrap">
                  Your Location
                </span>
              </motion.div>
            </MarkerContent>
          </MapMarker>

          {/* Interactive Map Markers for Places & Obstacles */}
          {filteredStops.map((stop) => {
            const isSelected = activeStopId === stop.id;
            return (
              <MapMarker
                key={stop.id}
                longitude={stop.coordinates[0]}
                latitude={stop.coordinates[1]}
                coordinates={stop.coordinates}
                onClick={() => {
                  setActiveStopId(stop.id);
                  if (!isSidebarOpen) setIsSidebarOpen(true);
                }}
              >
                <MarkerContent>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`cursor-pointer px-3 py-1.5 rounded-full shadow-md border flex items-center gap-1.5 transition-all duration-200 ${
                      isSelected
                        ? stop.type === "sos"
                          ? "bg-red-600 text-white border-red-700 shadow-lg z-30 font-bold"
                          : "bg-[#79B9F3] text-white border-[#5ca8ee] shadow-lg  z-30 font-bold"
                        : stop.type === "sos"
                          ? "bg-red-50 text-red-700 border-red-300 shadow-md shadow-red-200/40 z-25 font-bold animate-pulse"
                          : stop.vulnerability === "vulnerable"
                            ? "bg-amber-50 text-amber-900 border-amber-300/90 shadow-2xs z-10 font-semibold"
                            : "bg-white text-gray-800 border-gray-200/90 hover:border-gray-300 shadow-2xs z-20"
                    }`}
                  >
                    {stop.type === "sos" ? (
                      <LuShieldAlert className={`size-3.5 shrink-0 ${isSelected ? "text-white" : "text-red-500 animate-bounce"}`} />
                    ) : stop.vulnerability === "vulnerable" ? (
                      <LuShieldAlert className="size-3.5  shrink-0" />
                    ) : (
                      <LuMapPin
                        className={`size-3.5 ${
                          isSelected ? "text-white" : "text-primary"
                        }`}
                      />
                    )}
                    <span className="text-xs font-medium whitespace-nowrap">
                      {stop.name}
                    </span>
                  </motion.div>
                </MarkerContent>
              </MapMarker>
            );
          })}

          {/* Floating Map Zoom & Recenter Controls */}
          <div className="absolute right-6 bottom-8 z-20">
            <MapControls />
          </div>
        </Map>
      </div>

      {/* Floating Top Bar */}
      <header className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 pointer-events-none flex items-center justify-between gap-2 sm:gap-4">
        {/* Top Left: Back Button & Restore Sidebar Toggle */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/"
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/90 shadow-md hover:bg-gray-100 transition-all"
            title="Return to Home"
          >
            <LuArrowLeft className="size-4" />
          </Link>

          {/* Restore / Open Sidebar Button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl border backdrop-blur-md shadow-md flex items-center gap-1.5 sm:gap-2 text-xs font-bold transition-all ${
              isSidebarOpen
                ? "bg-white/95 text-gray-800 border-gray-200/90"
                : "bg-black text-white border-black"
            }`}
            title={
              isSidebarOpen ? "Minimize Sidebar" : "Open Route Planner Sidebar"
            }
          >
            {isSidebarOpen ? (
              <>
                <LuPanelLeftClose className="size-4 text-gray-700" />
                <span className="hidden sm:inline">Hide Panel</span>
              </>
            ) : (
              <>
                <LuPanelLeftOpen className="size-4 text-emerald-400" />
                <span className="text-[11px] sm:text-xs">Open Panel</span>
              </>
            )}
          </button>

          <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
        </div>

        {/* Top Right: Voice Guidance Toggle & Emergency SOS Button */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5">
          {/* Emergency SOS Assist Trigger */}
          <button
            type="button"
            onClick={() => setShowSosModal(true)}
            className="px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1 sm:gap-2 transition-all hover:scale-[1.02] border border-red-500 animate-pulse"
          >
            <LuLifeBuoy className="size-4" />
            <span className="hidden sm:inline">Emergency SOS</span>
            <span className="inline sm:hidden text-[11px]">SOS</span>
          </button>
        </div>
      </header>

      {/* Floating Left Sidebar matching Community Card Background bg-[#F5F5F3] */}
      <aside
        className={`absolute top-16 left-3 sm:top-20 sm:left-4 z-30 w-[calc(100vw-24px)] sm:w-[420px] max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-100px)] transition-all duration-300 pointer-events-auto flex flex-col ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-[calc(100vw+24px)] sm:-translate-x-[460px] opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#F5F5F3]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-gray-200/90 shadow-xl flex flex-col max-h-full overflow-hidden">
          {/* Header & Close Minimizer Button */}
          <div className="flex items-center justify-between pb-3 mb-3 shrink-0">
            <div className="flex items-center gap-2">
              <img
                src="/logo/Logo.png"
                alt="Logo Inkluvy"
                className="h-6 w-auto"
              />
              <h3 className="font-bold text-sm text-gray-900">
                Route Planner & Conditions
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-gray-200/80 text-gray-700 hover:bg-gray-300 transition-colors"
              title="Minimize Sidebar"
            >
              <LuPanelLeftClose className="size-4" />
            </button>
          </div>

          {/* Tabs: Route Planner | Transportation | Facilities */}
          <div className="flex flex-col gap-2 mb-3 shrink-0">
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200/70">
              <button
                type="button"
                onClick={() => setActiveTab("route")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                  activeTab === "route"
                    ? "bg-[#F5F5F3] text-gray-900 shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Route
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("transportation")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                  activeTab === "transportation"
                    ? "bg-[#F5F5F3] text-gray-900 shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Transportation
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("facilities")}
                className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                  activeTab === "facilities"
                    ? "bg-[#F5F5F3] text-gray-900 shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Facilities
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="w-full py-1.5 rounded-lg text-xs font-bold bg-black text-white hover:bg-gray-800 transition-all shadow-2xs flex items-center justify-center gap-1"
            >
              <LuPlus className="size-3" />
              <span>Report Route Condition</span>
            </button>
          </div>

          {/* Tab 1: Route Planner Controls & Waypoints */}
          {activeTab === "route" && (
            <div className="flex flex-col space-y-3.5 overflow-y-auto pr-1 pb-2 custom-scrollbar min-h-0">
              {/* Route Input Form */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200/90 space-y-2 shrink-0">
                {/* Start Location */}
                <div className="flex items-center gap-2 bg-[#F5F5F3] px-3 py-2 rounded-lg border border-gray-200/60">
                  <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
                  <input
                    type="text"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                    className="w-full text-xs font-medium text-gray-900 bg-transparent focus:outline-none min-w-0"
                    placeholder="Start Point"
                  />
                </div>

                {/* Destination Location */}
                <div className="flex items-center gap-2 bg-[#F5F5F3] px-3 py-2 rounded-lg border border-gray-200/60">
                  <LuMapPin className="size-3.5 text-primary shrink-0" />
                  <input
                    type="text"
                    value={destinationPoint}
                    onChange={(e) => setDestinationPoint(e.target.value)}
                    className="w-full text-xs font-medium text-gray-900 bg-transparent focus:outline-none min-w-0"
                    placeholder="Destination"
                  />
                </div>

                {/* Access Need Selector */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] font-bold text-gray-500 uppercase shrink-0">
                    Access Need:
                  </span>
                  <select
                    value={accessNeed}
                    onChange={(e) => setAccessNeed(e.target.value)}
                    className="text-xs font-bold text-gray-900 bg-[#F5F5F3] border border-gray-200/60 rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer truncate"
                  >
                    <option value="wheelchair">👩‍🦽 Wheelchair & Low Slope (&lt;5° Ramp)</option>
                    <option value="blind">🦯 Blind & Tactile Guiding (Guiding Blocks)</option>
                    <option value="senior">🦼 Senior & Low Stairs (Gentle Pathway)</option>
                    <option value="deaf">👂 Visual & Elevator Access (Lifts & Signals)</option>
                  </select>
                </div>
              </div>

              {/* Waypoints & Real-time Condition Cards with Reporter Info & Images */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between pb-1">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <LuNavigation className="size-3.5 text-primary" />
                    <span>Waypoints & Reporter Info</span>
                  </h4>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {stops.filter((s) => s.type !== "sos").length} Stops
                  </span>
                </div>

                <div className="space-y-2.5">
                  {stops.filter((s) => s.type !== "sos").map((stop, idx) => {
                    const isSelected = activeStopId === stop.id;
                    return (
                      <div
                        key={stop.id}
                        onClick={() => setActiveStopId(stop.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                          isSelected
                            ? "bg-black text-white border-black shadow-md"
                            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-900"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`size-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-white text-black"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <h5 className="font-bold text-xs truncate">
                              {stop.name}
                            </h5>
                          </div>

                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                              isSelected
                                ? "bg-white/20 text-white border-white/30"
                                : stop.badgeColor
                            }`}
                          >
                            {stop.vulnerabilityLabel}
                          </span>
                        </div>

                        <p
                          className={`text-[11px] leading-relaxed font-normal ${
                            isSelected ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {stop.details}
                        </p>

                        {/* Real Spot Condition Image Preview */}
                        {stop.image && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageModal(stop);
                            }}
                            className="relative group rounded-lg overflow-hidden h-28 w-full border border-gray-200/60 mt-0.5 cursor-zoom-in"
                          >
                            <img
                              src={stop.image}
                              alt={stop.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                              <LuImage className="size-4" />
                              <span>View Condition Photo</span>
                            </div>
                          </div>
                        )}

                        {/* Accessible Ride Options to this Stop */}
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-gray-800 space-y-2 text-left">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                              Accessible Ride Options
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-[#1C1C1E] p-2 rounded-lg text-center flex flex-col items-center gap-1.5 border border-gray-800">
                                <img
                                  src="/images/map/inkluvy_cab.png"
                                  alt="Inkluvy Cab"
                                  className="w-10 h-auto object-contain rounded bg-white p-0.5"
                                />
                                <span className="text-[9px] font-bold text-white block leading-tight">
                                  Inkluvy Cab
                                </span>
                                <span className="text-[8px] text-emerald-400 font-semibold leading-none">
                                  Ready
                                </span>
                              </div>
                              <div className="bg-[#1C1C1E] p-2 rounded-lg text-center flex flex-col items-center gap-1.5 border border-gray-800">
                                <img
                                  src="/images/map/low_floor_bus.png"
                                  alt="Low Bus"
                                  className="w-10 h-auto object-contain rounded bg-white p-0.5"
                                />
                                <span className="text-[9px] font-bold text-white block leading-tight">
                                  Low Bus
                                </span>
                                <span className="text-[8px] text-emerald-400 font-semibold leading-none">
                                  Every 10m
                                </span>
                              </div>
                              <div className="bg-[#1C1C1E] p-2 rounded-lg text-center flex flex-col items-center gap-1.5 border border-gray-800">
                                <img
                                  src="/images/map/electric_shuttle.png"
                                  alt="E-Shuttle"
                                  className="w-10 h-auto object-contain rounded bg-white p-0.5"
                                />
                                <span className="text-[9px] font-bold text-white block leading-tight">
                                  E-Shuttle
                                </span>
                                <span className="text-[8px] text-amber-400 font-semibold leading-none">
                                  Req Assist
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Reporter & Updated Time Footer */}
                        <div
                          className={`pt-2 flex items-center justify-between text-[11px] font-medium ${
                            isSelected ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <img
                              src={stop.reporterAvatar}
                              alt={stop.reporter}
                              className="size-4 rounded-full object-cover border border-gray-300 shrink-0"
                            />
                            <span className="truncate flex items-center gap-1">
                              Reported by{" "}
                              <strong
                                className={
                                  isSelected ? "text-white" : "text-gray-900"
                                }
                              >
                                {stop.reporter}
                              </strong>
                              <LuShieldCheck
                                className={`size-3 shrink-0 ${
                                  isSelected ? "text-emerald-300" : "text-emerald-600"
                                }`}
                                title="Verified Reporter"
                              />
                            </span>
                          </div>
                          <span className="flex items-center gap-1 shrink-0 text-[10px]">
                            <LuClock className="size-3" />
                            {stop.updatedTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Nearby Accessible Facilities & Hazard Level Filter (2 Categories) */}
          {activeTab === "facilities" && (
            <div className="flex flex-col space-y-3 overflow-y-auto pr-1 pb-2 custom-scrollbar min-h-0">
              <h4 className="text-xs font-bold text-gray-900 uppercase">
                Filter Route Condition
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "All", type: "all" },
                  {
                    label: ACCESSIBILITY_STATUS.safe.labelWithBadge,
                    type: "safe",
                  },
                  {
                    label: ACCESSIBILITY_STATUS.vulnerable.labelWithBadge,
                    type: "vulnerable",
                  },
                  {
                    label: "🚨 Emergency SOS",
                    type: "sos",
                  },
                ].map((f) => (
                  <button
                    key={f.type}
                    type="button"
                    onClick={() => setSelectedFilter(f.type)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      selectedFilter === f.type
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                {filteredStops.map((stop) => (
                  <div
                    key={stop.id}
                    onClick={() => setActiveStopId(stop.id)}
                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-gray-900">
                        {stop.name}
                      </h5>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stop.badgeColor}`}
                      >
                        {stop.vulnerabilityLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{stop.details}</p>

                    <div className="flex items-center justify-between gap-1.5 text-[11px] text-gray-500 pt-1.5 ">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={stop.reporterAvatar}
                          alt={stop.reporter}
                          className="size-4 rounded-full object-cover border border-gray-200"
                        />
                        <span className="flex items-center gap-1">
                          Reporter: {stop.reporter}
                          <LuShieldCheck className="size-3 text-emerald-600 shrink-0" title="Verified Reporter" />
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {stop.updatedTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Transportation Transit Itinerary list with Priority Access indicators */}
          {activeTab === "transportation" && (
            <div className="flex flex-col space-y-3.5 overflow-y-auto pr-1 pb-2 custom-scrollbar min-h-0">
              <div className="flex items-center justify-between pb-1 shrink-0">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <LuNavigation className="size-3.5 text-primary" />
                  <span>Transit Itinerary & Priority Access</span>
                </h4>
                <span className="text-[11px] text-gray-500 font-medium">
                  {transitItinerary.length} Steps
                </span>
              </div>

              <div className="space-y-3.5">
                {transitItinerary.map((transit) => (
                  <div
                    key={transit.id}
                    className="p-3.5 bg-white rounded-xl border border-gray-200 flex flex-col gap-2.5 shadow-2xs"
                  >
                    {/* Step tag & Transit Line name */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="size-5 rounded-full text-[10px] font-bold bg-black text-white flex items-center justify-center">
                          {transit.step}
                        </span>
                        <span className="text-base leading-none">
                          {transit.icon}
                        </span>
                        <h5 className="font-bold text-xs text-gray-950">
                          {transit.lineName}
                        </h5>
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold bg-[#F5F5F3] px-2 py-0.5 rounded-full">
                        {transit.duration}
                      </span>
                    </div>

                    {/* Transit Stop Route details */}
                    <div className="text-[11px] space-y-1 pl-1 bg-[#F5F5F3]/50 p-2 rounded-lg border border-gray-200/50">
                      <div className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-gray-400">Board: </span>
                        <strong className="text-gray-900 font-bold">
                          {transit.from}
                        </strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-red-500 shrink-0" />
                        <span className="text-gray-400">Alight: </span>
                        <strong className="text-gray-900 font-bold">
                          {transit.to}
                        </strong>
                      </div>
                    </div>

                    {/* Accessibility & instructions */}
                    <p className="text-[11px] text-gray-500 leading-normal font-normal">
                      {transit.details}
                    </p>

                    {/* Priority seating / Wheelchair Access Indicator */}
                    {transit.wheelchairPriority && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-250 bg-emerald-50/50 text-[10px] font-bold text-emerald-700 self-start">
                        <span>{transit.priorityIndicator}</span>
                      </div>
                    )}

                    {/* Vehicle Photo illustration if available */}
                    {transit.image && (
                      <div className="relative rounded-lg overflow-hidden h-24 w-full border border-gray-200 bg-[#F5F5F3] flex items-center justify-center p-1.5 mt-0.5">
                        <img
                          src={transit.image}
                          alt={transit.lineName}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Floating Bottom Filter Controls: English System Labels */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[92vw]">
        <div className="bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border border-gray-200 shadow-lg flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-gray-700 hidden sm:inline shrink-0">
            Route Condition:
          </span>
          {[
            { label: "All", type: "all" },
            { label: ACCESSIBILITY_STATUS.safe.labelWithBadge, type: "safe" },
            {
              label: ACCESSIBILITY_STATUS.vulnerable.labelWithBadge,
              type: "vulnerable",
            },
            { label: "🚨 Emergency SOS", type: "sos" },
          ].map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => setSelectedFilter(item.type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === item.type
                  ? "bg-black text-white shadow-2xs"
                  : "bg-[#F5F5F3] text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImageModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-5 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedImageModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-10"
              >
                <LuX className="size-5" />
              </button>

              <div className="rounded-xl overflow-hidden max-h-[60vh] w-full border border-gray-200">
                <img
                  src={selectedImageModal.image}
                  alt={selectedImageModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-gray-900">
                    {selectedImageModal.name}
                  </h4>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${selectedImageModal.badgeColor}`}
                  >
                    {selectedImageModal.vulnerabilityLabel}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-normal">
                  {selectedImageModal.details}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <img
                    src={selectedImageModal.reporterAvatar}
                    alt={selectedImageModal.reporter}
                    className="size-5 rounded-full object-cover border border-gray-300"
                  />
                  <span>
                    Reported by <strong>{selectedImageModal.reporter}</strong> •{" "}
                    {selectedImageModal.updatedTime}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Emergency SOS Modal */}
      <AnimatePresence>
        {showSosModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-red-200 text-center relative"
            >
              <button
                type="button"
                onClick={() => setShowSosModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <LuX className="size-4" />
              </button>

              <div className="size-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 animate-bounce">
                <LuLifeBuoy className="size-7" />
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-1">
                Emergency SOS Assist
              </h3>
              <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                Send your real-time GPS location ({activeStop.name}) to nearest
                verified volunteers & emergency services.
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      "Emergency alert sent! Nearby volunteer team has been notified.",
                    );
                    setShowSosModal(false);
                  }}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <LuPhoneCall className="size-4" />
                  <span>Call Nearby Volunteer Assist</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSosModal(false)}
                  className="w-full py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clean Refined Report Obstacle Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <LuX className="size-4" />
              </button>

              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Report Accessibility Obstacle
              </h3>

              <p className="text-xs md:text-sm text-gray-500 mb-6 leading-relaxed">
                Help citizens and fellow mappers by sharing real-time route
                conditions or obstacle updates on the map.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Report published successfully! You earned +50 Contributor Points 🎉",
                  );
                  setShowReportModal(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={activeStop.name}
                    readOnly
                    className="w-full rounded-xl bg-[#EAEAEA] border border-gray-200/90 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-600 cursor-not-allowed focus:outline-none"
                  />
                </div>

                {/* Route Status & Photo Evidence in 1 Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Route Status
                    </label>
                    <select className="w-full rounded-xl bg-[#F5F5F3] border border-gray-200/90 px-3.5 py-2.5 text-xs md:text-sm text-gray-900 focus:border-gray-400 focus:bg-white focus:outline-none cursor-pointer transition-all">
                      <option value="vulnerable">
                        {ACCESSIBILITY_STATUS.vulnerable.labelWithBadge}
                      </option>
                      <option value="safe">
                        {ACCESSIBILITY_STATUS.safe.labelWithBadge}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Photo Evidence
                    </label>
                    <label className="flex items-center justify-center gap-2 bg-[#F5F5F3] hover:bg-gray-200/60 border border-dashed border-gray-300 rounded-xl px-3 py-2.5 cursor-pointer text-xs md:text-sm font-medium text-gray-700 transition-colors">
                      <LuUpload className="size-4 text-gray-500 shrink-0" />
                      <span className="truncate">Upload Photo</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Condition Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe obstacle condition, ramp slope, or alternative accessible route..."
                    className="w-full rounded-xl bg-[#F5F5F3] border border-gray-200/90 px-3.5 py-2.5 text-xs md:text-sm text-gray-900 focus:border-gray-400 focus:bg-white focus:outline-none resize-none transition-all"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold shadow-md hover:bg-gray-800 transition-colors"
                  >
                    Report Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
