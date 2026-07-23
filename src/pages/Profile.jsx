import { Link } from "react-router-dom";
import {
  LuPlus,
  LuStar,
  LuActivity,
  LuCompass,
  LuCalendar,
  LuClock,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ActivityTrendChart from "../components/profile/ActivityTrendChart";
import SectionIcon from "../components/ui/SectionIcon";
import { ACCESSIBILITY_STATUS } from "../lib/accessibilityStatus";

// Dashboard Statistics (No points context, replaced with verified reports count)
const statsData = [
  { value: "54", label: "Total Reports" },
  { value: "96%", label: "Accuracy Rate" },
  { value: "48", label: "Reports Verified" },
];

// Active Reports & Waypoints (adapted from "My Courses")
const activeReports = [
  {
    id: "rep-1",
    title: "Jl. Veteran Ramp",
    category: "Lowokwaru, Malang",
    status: "safe",
    statusLabel: ACCESSIBILITY_STATUS.safe.label,
    detail: "Concrete ramp verified. Rails sturdy.",
    stats: "12 verifiers verified",
    score: "4.9",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    progress: "3/3 verifications",
    image: "/images/map/map_ramp_condition.png",
  },
  {
    id: "rep-2",
    title: "Stasiun Malang Elevator",
    category: "Klojen, Malang",
    status: "safe",
    statusLabel: ACCESSIBILITY_STATUS.safe.label,
    detail: "Platform 2 elevator confirmed fully active.",
    stats: "45 commuters assisted",
    score: "4.8",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    progress: "Verified by 45",
    image: "/images/map/map_station_elevator.png",
  },
  {
    id: "rep-3",
    title: "Trotoar Jl. Veteran",
    category: "Lowokwaru, Malang",
    status: "vulnerable",
    statusLabel: ACCESSIBILITY_STATUS.vulnerable.label,
    detail: "Cable excavation ongoing. Temporary ramp.",
    stats: "8 warnings submitted",
    score: "4.2",
    color: "bg-amber-50 text-amber-900 border-amber-200/80",
    progress: "Under Repair",
    image: "/images/map/map_construction_obstacle.png",
  },
];

const scheduleEvents = [
  {
    timeRange: "10:00 - 12:00",
    title: "Assist Wheelchair Commuter",
    location: "Malang Station Central Gate",
    volunteer: "Siti Rahma",
    avatar: "/images/avatars/avatar_siti.png",
    colorClass: "border-emerald-200 bg-emerald-50/80",
    accentClass: "bg-emerald-500",
    textClass: "text-emerald-700",
    avatarBorder: "border-emerald-300",
  },
  {
    timeRange: "14:00 - 15:30",
    title: "Obstacle Verification Task",
    location: "Jl. Veteran Construction Zone",
    volunteer: "Fadhil Rizky",
    avatar: "/images/avatars/avatar_fadhil.png",
    colorClass: "border-blue-200 bg-blue-50/80",
    accentClass: "bg-blue-500",
    textClass: "text-blue-700",
    avatarBorder: "border-blue-300",
  },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F5F5F3] text-gray-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-24 w-full">
        {/* Profile Header Dashboard Banner (bg-white page body) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 sm:mb-10">
          <div className="flex items-center gap-4">
            {/* Profile Avatar Added */}
            <img
              src="/images/profile-avatar.png"
              alt="Syahla Aulia"
              className="size-14 sm:size-16 rounded-full object-cover border border-gray-300 shrink-0"
            />
            <div>
              <h1 className="font-sans text-xl sm:text-2xl font-bold text-gray-950">
                Welcome back, Syahla
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5 leading-relaxed">
                Keep mapping, make Malang accessible! Your contributions make a
                difference.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
            {statsData.map((stat, idx) => (
              <div key={idx} className="shrink-0">
                <h3 className="font-sans text-lg sm:text-xl font-medium text-gray-950 leading-none">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Layout Section */}
        <div className="space-y-8">
          {/* Row 1: compact, equal-height schedule and activity cards */}
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {/* Volunteer Schedule Card (Redesigned like Image 1) */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs sm:p-6 lg:h-[400px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <SectionIcon
                    icon={LuCalendar}
                    colorClass="from-primary/50 text-primary"
                  />
                  <div>
                    <h2 className="font-sans font-bold text-sm sm:text-base text-gray-900 leading-tight">
                      September 15, 2026
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                      2 Events, Today
                    </p>
                  </div>
                </div>

                {/* Calendar Navigation Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous day"
                    className="size-7 rounded-full bg-white hover:bg-gray-550/10 text-gray-700 flex items-center justify-center border border-gray-200/80 shadow-3xs cursor-pointer"
                  >
                    <LuChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next day"
                    className="size-7 rounded-full bg-white hover:bg-gray-550/10 text-gray-700 flex items-center justify-center border border-gray-200/80 shadow-3xs cursor-pointer"
                  >
                    <LuChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="grid flex-1 content-center gap-3">
                {scheduleEvents.map((event) => (
                  <div
                    key={event.title}
                    className={`relative flex items-center gap-3 overflow-hidden rounded-xl border p-3.5 transition-transform duration-300 hover:-translate-y-0.5 bg-white`}
                  >
                    <span className={`absolute inset-y-0 left-0 w-1 `} />
                    <div className="min-w-0 flex-1 pl-1">
                      <span
                        className={`flex items-center gap-1.5 text-[10px] font-bold text-grey-600`}
                      >
                        <LuClock className="size-3" />
                        {event.timeRange}
                      </span>
                      <h4 className="mt-1 text-xs font-bold leading-snug text-gray-950 sm:text-sm">
                        {event.title}
                      </h4>
                      <p className="mt-0.5 truncate text-xs font-medium text-gray-500">
                        {event.location}
                      </p>
                    </div>
                    <img
                      src={event.avatar}
                      alt={event.volunteer}
                      className={`size-9 shrink-0 rounded-full border object-cover`}
                      title={`Assisting ${event.volunteer}`}
                    />
                  </div>
                ))}
              </div>

              {/* Mission Link */}

              <Link
                to="/map"
                className="w-full py-3.5 bg-black text-white rounded-xl text-xs font-bold shadow-3xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LuPlus className="size-4" />
                <span>Join Mapping Mission</span>
              </Link>
            </div>

            {/* Activity Trend Card (Redesigned with Safe/Caution Trend Lines) */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs sm:p-6 lg:h-[400px]">
              <div className="flex items-center gap-3.5">
                <SectionIcon
                  icon={LuActivity}
                  colorClass="from-primary/50 text-primary"
                />
                <div>
                  <h2 className="font-sans font-bold text-sm sm:text-base text-gray-900 leading-tight">
                    Activity Trend
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                    Last 7 days contributions by condition status
                  </p>
                </div>
              </div>

              <ActivityTrendChart />
            </div>
          </div>

          {/* Row 2: My Active Reports spanning the full width */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <SectionIcon
                  icon={LuCompass}
                  colorClass="from-primary/50 text-primary"
                />
                <div>
                  <h2 className="font-sans font-bold text-sm sm:text-base text-gray-900 leading-tight">
                    My Active Reports
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                    Active mapped pathways and obstacle warnings
                  </p>
                </div>
              </div>
              <Link
                to="/map"
                className="text-xs text-black font-semibold hover:underline"
              >
                See all
              </Link>
            </div>

            {/* Horizontal List of Report Cards (Inner Cards are bg-white) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeReports.map((report) => (
                <div
                  key={report.id}
                  className="group rounded-xl border border-gray-200/80 p-3.5 hover:border-gray-400 hover:shadow-2xs transition-all flex flex-col justify-between h-full bg-white"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="h-32 rounded-lg overflow-hidden mb-3 relative border border-gray-250/50">
                      <img
                        src={report.image}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border ${report.color}`}
                        >
                          {report.statusLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-gray-950 truncate">
                        {report.title}
                      </h4>
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                      {report.category}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-2 font-normal leading-relaxed line-clamp-2">
                      {report.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
