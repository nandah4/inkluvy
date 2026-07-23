import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck } from "react-icons/lu";

const testimonialsData = [
  {
    id: "01",
    name: "Siti Rahma",
    email: "siti@inkluvy.id",
    role: "Wheelchair Commuter",
    city: "Malang",
    avatar: "/images/avatars/avatar_siti.png",
    quote:
      "“Navigating public places in my wheelchair used to be a guessing game. Inkluvy lets me plan route ramps beforehand, allowing me to travel with total confidence.”",
  },
  {
    id: "02",
    name: "Budi Santoso",
    email: "budi@inkluvy.id",
    role: "Elderly Cane User",
    city: "Jakarta",
    avatar: "/images/avatars/avatar_budi.png",
    quote:
      "“Navigating uneven streets with a cane is exhausting. Inkluvy shows me paths with low-slopes and smooth paving, giving me back my independent daily walks.”",
  },
  {
    id: "03",
    name: "Aris Wijaya",
    email: "aris@inkluvy.id",
    role: "Wheelchair Athlete",
    city: "Malang",
    avatar: "/images/avatars/avatar_aris.png",
    quote:
      "“Since my accident, travel felt impossible. But Inkluvy's routing directs me only through verified step-free paths, returning my freedom to train and commute independently.”",
  },
  {
    id: "04",
    name: "Hendra Putra",
    email: "hendra@inkluvy.id",
    role: "Amputee Student",
    city: "Bandung",
    avatar: "/images/avatars/avatar_hendra.png",
    quote:
      "“Navigating stairs on crutches drains my energy. Inkluvy's lift-availability alerts save me from getting stuck. It is a game-changer for physical disabled students like me.”",
  },
  {
    id: "05",
    name: "Fadhil Rizky",
    email: "fadhil@inkluvy.id",
    role: "Sidewalk Mapper",
    city: "Surabaya",
    avatar: "/images/avatars/avatar_fadhil.png",
    quote:
      "“As a sidewalk mapping volunteer, I'm proud to contribute. The app is responsive and real-time voice guidance is pin-point accurate.”",
  },
];

export default function CommunityVoices() {
  const [activeTabId, setActiveTabId] = useState("01");
  const activeTestimonial =
    testimonialsData.find((item) => item.id === activeTabId) ??
    testimonialsData[0];

  return (
    <section
      id="community-voices"
      className="relative z-30 bg-white py-16 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F4F3F0] border border-gray-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-800 mb-4 shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Community Stories</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl font-medium leading-tight tracking-tight text-gray-900">
            Loved by Citizens, Built for Everyone
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-normal">
            Direct feedback from citizens navigating cities with safety and
            freedom.
          </p>
        </div>

        {/* Main Outer Container Card */}
        <div className="bg-[#F5F5F3] rounded-2xl md:rounded-[1.4rem] p-4 sm:p-6 lg:p-6 border border-gray-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Author Name/Avatar, Selected Quote & General Impact Metrics */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
              {/* Selected Author Name & Role */}
              <div className="pt-4 flex items-center gap-3">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-base text-gray-900 flex items-center gap-1.5">
                    <span>{activeTestimonial.name}</span>
                    <span className="size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <LuCheck className="size-2.5 stroke-[3]" />
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 font-normal">
                    {activeTestimonial.role} • {activeTestimonial.city}
                  </p>
                </div>
              </div>

              <div>
                {/* Selected Person Bio & Tweet/Quote */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    {/* User Tweet/Quote Statement */}
                    <p className="font-sans text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight text-gray-900">
                      {activeTestimonial.quote}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* General Community Impact Metrics Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-medium text-gray-900">
                    4,800+
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                    Citizen Stories & Feedback
                  </p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-medium text-gray-900">
                    99.4%
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                    User Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: White Card Containing Profile List */}
            <div className="lg:col-span-6 h-full">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/90 flex flex-col justify-between h-full">
                {/* Title Header kept as requested */}
                <h3 className="font-medium text-base sm:text-lg text-gray-900 flex items-center mb-2">
                  Community Profiles
                </h3>

                {/* Profile List matching reference layout with City tag instead of codeID */}
                <div className="flex flex-col divide-y divide-gray-100/90">
                  {testimonialsData.map((profile) => {
                    const isActive = activeTabId === profile.id;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => setActiveTabId(profile.id)}
                        className={`py-3 sm:py-3.5 px-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                          isActive ? "bg-gray-50/90" : "hover:bg-gray-50/60"
                        }`}
                      >
                        {/* Left: Avatar + Name & Email */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative shrink-0">
                            <img
                              src={profile.avatar}
                              alt={profile.name}
                              className={`size-10 sm:size-11 rounded-full object-cover transition-all ${
                                isActive
                                  ? "border-2 border-primary ring-2 ring-primary/20 shadow-xs"
                                  : "border border-gray-200"
                              }`}
                            />
                            {isActive && (
                              <div className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-emerald-500 border-2 border-white text-white flex items-center justify-center">
                                <LuCheck className="size-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate flex items-center gap-1">
                              <span>{profile.name}</span>
                            </h4>
                            <p className="text-xs text-gray-400 font-normal truncate mt-0.5">
                              {profile.email}
                            </p>
                          </div>
                        </div>

                        {/* Right: City Tag replacing codeID */}
                        <div className="shrink-0">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                              isActive
                                ? "bg-[#F4F4F4] text-black border-gray-200/50 font-semibold"
                                : "bg-[#F4F4F4] text-gray-500 border-gray-200/50"
                            }`}
                          >
                            {profile.city}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
