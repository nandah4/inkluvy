import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuUsers,
  LuShare2,
  LuSparkles,
  LuShieldCheck,
  LuInfo,
  LuCheck,
  LuBuilding2,
} from "react-icons/lu";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SectionIcon from "../components/ui/SectionIcon";
import { mockEvents } from "../data/communityData";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find event by ID or fallback to first event
  const initialEvent =
    mockEvents.find((e) => e.id === id || e.slug === id) || mockEvents[0];
  const [event, setEvent] = useState(initialEvent);

  const [isAttending, setIsAttending] = useState(false);
  const [attendeesCount, setAttendeesCount] = useState(
    event.attendeesCount || 48,
  );
  const [copied, setCopied] = useState(false);

  const handleToggleRSVP = () => {
    if (isAttending) {
      setAttendeesCount((prev) => prev - 1);
      setIsAttending(false);
    } else {
      setAttendeesCount((prev) => prev + 1);
      setIsAttending(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-16 mx-auto max-w-[1440px]"
      >
        {/* Top Back Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-black bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all"
          >
            <LuArrowLeft className="size-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all"
          >
            <LuShare2 className="size-3.5" />
            <span>{copied ? "Link Copied! ✓" : "Share Event"}</span>
          </button>
        </div>

        {/* Hero Event Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs mb-8">
          {/* Event Banner Image */}
          <div className="h-52 sm:h-72 w-full relative bg-gray-900 overflow-hidden">
            <img
              src={event.banner || "/images/community_hero_illustration.png"}
              alt={event.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Event Details Content Container */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 leading-snug">
                {event.title}
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-gray-600 font-medium flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/70">
                  <LuCalendar className="size-4 text-emerald-600" />
                  {event.date}
                </span>

                <span className="flex items-center gap-1.5 text-gray-700 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200/70">
                  <LuClock className="size-4 text-gray-500" />
                  {event.time}
                </span>
              </p>
            </div>

            {/* Location & Organizer Info (Clean Unboxed Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <div className="flex items-start gap-3">
                <SectionIcon
                  icon={LuMapPin}
                  colorClass="from-emerald-50 text-emerald-600"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider">
                    Event Location
                  </h4>
                  <p className="text-sm text-gray-900 font-bold mt-0.5">
                    {event.location}
                  </p>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
                    {event.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <SectionIcon
                  icon={LuBuilding2}
                  colorClass="from-amber-50 text-amber-600"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider">
                    Organizer
                  </h4>
                  <p className="text-sm text-gray-900 font-bold mt-0.5">
                    {event.organizer}
                  </p>
                  <p className="text-xs text-gray-500 font-normal mt-0.5">
                    Official Inkluvy Malang Community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Description & Agenda vs Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* About Event */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <SectionIcon
                  icon={LuInfo}
                  colorClass="from-blue-50 text-blue-600"
                />
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  Event Description
                </h3>
              </div>

              <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-line space-y-3">
                {event.description}
              </div>
            </div>

            {/* Agenda & Schedule */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col gap-6">
                <div className="flex items-center gap-2.5">
                  <SectionIcon
                    icon={LuClock}
                    colorClass="from-emerald-50 text-emerald-600"
                  />
                  <h3 className="font-bold text-base sm:text-lg text-gray-900">
                    Event Schedule (Agenda)
                  </h3>
                </div>

                <div className="relative pl-7 border-l-2 border-emerald-300 space-y-9 my-2">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[37px] top-1 size-4 rounded-full bg-emerald-500 border-2 border-white ring-4 ring-emerald-50" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                        {item.time}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                        {item.activity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Eye-catching RSVP Action Widget */}
            <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col gap-4 border border-gray-800">
              <div className="flex items-center justify-between">
                {/* Attendee Avatar Pile */}
                <div className="flex items-center -space-x-2 overflow-hidden">
                  {event.attendees &&
                    event.attendees.map((att, i) => (
                      <img
                        key={i}
                        src={att.avatar}
                        alt={att.name}
                        className="inline-block size-8 rounded-full ring-2 ring-black object-cover"
                      />
                    ))}
                  <span className="flex size-8 items-center justify-center rounded-full bg-gray-800 text-[10px] font-bold text-gray-300 ring-2 ring-black">
                    +{attendeesCount - (event.attendees?.length || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-500/30">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Capacity Filled</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
                  <span>Registered Attendees</span>
                  <span className="font-extrabold text-white text-sm">
                    {attendeesCount}{" "}
                    <span className="text-gray-500 font-normal">
                      / {event.maxCapacity || 100}
                    </span>
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-xs"
                    style={{
                      width: `${Math.min(100, (attendeesCount / (event.maxCapacity || 100)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleRSVP}
                className={`w-full py-3 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isAttending
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-white text-gray-950 hover:bg-gray-100"
                }`}
              >
                {isAttending ? (
                  <>
                    <LuCheck className="size-4 stroke-[3]" />
                    <span>You're Registered (Cancel RSVP)</span>
                  </>
                ) : (
                  <span>Confirm Attendance (RSVP) →</span>
                )}
              </button>
            </div>

            {/* Accessibility Features Provided */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <SectionIcon
                  icon={LuSparkles}
                  colorClass="from-emerald-50 text-emerald-600"
                />
                <h3 className="font-bold text-sm text-gray-900">
                  Accessibility Features Available
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {event.accessibilityFeatures &&
                  event.accessibilityFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="py-2.5 flex items-start gap-3 text-xs text-gray-700 font-medium"
                    >
                      <LuCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
