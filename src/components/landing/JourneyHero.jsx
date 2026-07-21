import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  LuMapPin,
  LuSearch,
  LuAccessibility,
  LuSparkles,
  LuChevronDown,
  LuCompass,
  LuNavigation,
} from "react-icons/lu";

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(12px)",
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

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15,
    },
  },
};

const widgetContainerVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const widgetCardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const inlineIconVariantsLeft = {
  hidden: { opacity: 0, scale: 0.3, rotate: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 10,
    transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 },
  },
};

const inlineIconVariantsRight = {
  hidden: { opacity: 0, scale: 0.3, rotate: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -10,
    transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.65 },
  },
};

export default function JourneyHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center py-24 sm:py-32 overflow-hidden bg-white">
      {/* Background: Smooth blended vertical gradient aurora stripes, clipped by rounded-full container */}
      {/* Outer edges extend past viewport so only inner rounded side is visible */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* === LEFT SIDE: Perfect circle, half offscreen, no clip === */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full z-0"
          style={{ width: "600px", height: "600px", left: "-320px" }}
        >
          {/* Vertical gradient stripes with blur spread */}
          <div className="absolute inset-0 flex items-stretch">
            <div
              className="flex-1 h-full blur-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.20), rgba(121,185,243,0.35), rgba(121,185,243,0.15))",
              }}
            />
            <div
              className="flex-1 h-full blur-xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.30), rgba(121,185,243,0.50), rgba(121,185,243,0.25))",
              }}
            />
            <div
              className="flex-1 h-full blur-lg"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.40), rgba(121,185,243,0.62), rgba(121,185,243,0.32))",
              }}
            />
            <div
              className="flex-1 h-full blur-xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.50), rgba(121,185,243,0.72), rgba(121,185,243,0.40))",
              }}
            />
            <div
              className="flex-1 h-full blur-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.38), rgba(121,185,243,0.58), rgba(121,185,243,0.30))",
              }}
            />
            <div
              className="flex-1 h-full blur-3xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.22), rgba(121,185,243,0.38), rgba(121,185,243,0.18))",
              }}
            />
          </div>
        </div>

        {/* === RIGHT SIDE: Perfect circle, half offscreen, no clip (mirrored) === */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full z-0"
          style={{ width: "600px", height: "600px", right: "-320px" }}
        >
          {/* Vertical gradient stripes with blur spread (mirrored) */}
          <div className="absolute inset-0 flex items-stretch">
            <div
              className="flex-1 h-full blur-3xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.22), rgba(121,185,243,0.38), rgba(121,185,243,0.18))",
              }}
            />
            <div
              className="flex-1 h-full blur-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.38), rgba(121,185,243,0.58), rgba(121,185,243,0.30))",
              }}
            />
            <div
              className="flex-1 h-full blur-xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.50), rgba(121,185,243,0.72), rgba(121,185,243,0.40))",
              }}
            />
            <div
              className="flex-1 h-full blur-lg"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.40), rgba(121,185,243,0.62), rgba(121,185,243,0.32))",
              }}
            />
            <div
              className="flex-1 h-full blur-xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.30), rgba(121,185,243,0.50), rgba(121,185,243,0.25))",
              }}
            />
            <div
              className="flex-1 h-full blur-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(121,185,243,0.20), rgba(121,185,243,0.35), rgba(121,185,243,0.15))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 w-full text-center">
        {/* Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-md border border-gray-200/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold text-gray-700 shadow-2xs mb-6 sm:mb-10 max-w-[92vw] sm:max-w-none"
        >
          <span className="text-yellow-500 font-bold flex items-center gap-1 shrink-0">
            <LuSparkles className="size-3 sm:size-3.5 fill-yellow-500 text-yellow-500" />
            Verified Access
          </span>
          <span className="text-gray-400 shrink-0">•</span>
          <span className="text-gray-400 font-medium truncate sm:whitespace-normal">
            Scaling 100+ accessible routes daily
          </span>
        </motion.div>

        {/* Main Hero Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900">
            Every Step{" "}
            <motion.span
              variants={inlineIconVariantsRight}
              className="inline-flex items-center justify-center bg-gradient-to-tr from-primary to-primary/20 p-1.5 sm:p-2.5 lg:p-3 rounded-xl shadow-xs mx-1 sm:mx-1.5 align-middle -rotate-6"
            >
              <LuNavigation className="size-5 sm:size-7 lg:size-9 text-white" />
            </motion.span>{" "}
            , Every Person{" "}
            <motion.span
              variants={inlineIconVariantsLeft}
              className="inline-flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-200 p-1.5 sm:p-2.5 lg:p-3 rounded-xl text-white shadow-xs mx-1 sm:mx-1.5 align-middle rotate-6"
            >
              <LuAccessibility className="size-5 sm:size-7 lg:size-9 text-white" />
            </motion.span>{" "}
            Deserves Easy Movement.
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-normal"
        >
          Discover accessible routes across the city, backed by real reports
          from real people — and help, whenever you need it.
        </motion.p>

        {/* Search Planner Widget */}
        <motion.div
          variants={widgetContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mx-auto mt-8 w-full text-left sm:mt-14 max-w-full sm:max-w-2xl lg:max-w-4xl"
        >
          {/* Widget Form Body */}
          <motion.div className="flex w-full flex-row items-center justify-start gap-2.5 sm:gap-3 overflow-x-auto py-1 no-scrollbar">
            {/* Field 1: Looking for */}
            <motion.div
              variants={widgetCardVariants}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              className="border border-gray-200 min-w-[170px] shrink-0 flex-1 rounded-xl bg-white p-3 sm:p-3.5 sm:min-w-[200px] transition-all duration-200 hover:shadow-md hover:border-gray-300"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="grid size-5.5 sm:size-6 place-items-center rounded bg-primary/20 text-primary">
                  <LuMapPin className="size-3.5" />
                </span>
                <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-gray-500">
                  Looking for
                </label>
              </div>
              <input
                type="text"
                placeholder="Find a Destination"
                className="mt-2 text-sm sm:text-base w-full border-0 bg-transparent p-0 font-normal text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
              />
            </motion.div>

            {/* Field 2: Access Need */}
            <motion.div
              variants={widgetCardVariants}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              className="border border-gray-200 min-w-[170px] shrink-0 flex-grow rounded-xl bg-white p-3 sm:p-3.5 sm:min-w-[200px] transition-all duration-200 hover:shadow-md hover:border-gray-300"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="grid size-5.5 sm:size-6 place-items-center rounded bg-primary/20 text-primary">
                  <LuAccessibility className="size-3.5" />
                </span>
                <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-gray-500">
                  Access Need
                </label>
              </div>
              <div className="relative mt-2 flex cursor-pointer items-center justify-between">
                <select className="w-full cursor-pointer appearance-none border-0 bg-transparent p-0 pr-6 text-sm sm:text-base font-normal text-gray-900 focus:outline-none focus:ring-0">
                  <option>Select Access Need</option>
                  <option>Wheelchair Ramps</option>
                  <option>Tactile Guiding Blocks</option>
                  <option>Elevators & Lifts</option>
                  <option>Accessible Restrooms</option>
                </select>
                <LuChevronDown className="pointer-events-none absolute right-0 size-4 text-slate-500" />
              </div>
            </motion.div>

            {/* Field 3: Location */}
            <motion.div
              variants={widgetCardVariants}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              className="border border-gray-200 min-w-[150px] shrink-0 flex-grow rounded-xl bg-white p-3 sm:p-3.5 sm:min-w-[180px] transition-all duration-200 hover:shadow-md hover:border-gray-300"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="grid size-5.5 sm:size-6 place-items-center rounded bg-primary/20 text-primary">
                  <LuCompass className="size-3.5" />
                </span>
                <label className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </label>
              </div>
              <input
                type="text"
                placeholder="All Cities"
                defaultValue="Malang"
                className="mt-2 text-sm sm:text-base w-full border-0 bg-transparent p-0 font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
              />
            </motion.div>

            {/* Submit/Discover Button */}
            <Link
              to="/map"
              className="flex min-h-[46px] sm:min-h-12 w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-6 sm:px-7 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 shadow-sm"
            >
              <LuSearch className="size-4" />
              <span>Find Route</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
