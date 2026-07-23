import { useRef } from "react";
import { motion } from "framer-motion";
import {
  LuMapPin,
  LuRoute,
  LuInfo,
  LuShieldCheck,
  LuMap,
} from "react-icons/lu";

// Animation configs
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, delay: 0.5 },
  },
};

const steps = [
  {
    step: "Step - 1",
    title: "Explore",
    description: "Browse the map to find accessible routes and points near you",
    icon: LuMapPin,
    colorClass: "text-red-500 bg-gradient-to-b from-red-500/50 to-white",
  },
  {
    step: "Step - 2",
    title: "Plan",
    description:
      "Filter by your specific access need, get a route with an accessibility score",
    icon: LuRoute,
    colorClass: "text-emerald-500 bg-gradient-to-b from-emerald-500/50 to-white",
  },
  {
    step: "Step - 3",
    title: "Report",
    description: "Spot a hazard? Flag it in seconds to help the community",
    icon: LuInfo,
    colorClass: "text-amber-500 bg-gradient-to-b from-amber-500/50 to-white",
  },
  {
    step: "Step - 4",
    title: "Stay Safe",
    description: "Get instant help via SOS if something goes wrong",
    icon: LuShieldCheck,
    colorClass: "text-blue-500 bg-gradient-to-b from-blue-500/50 to-white",
  },
];

export default function JourneySteps() {
  const containerRef = useRef(null);

  return (
    <section
      id="how-it-works"
      className="relative z-30 py-24 overflow-hidden"
    >
      {/* Background Subtle Gradient Top-Center Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-to-b from-white to-transparent opacity-60 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Header Block with enter/exit scroll animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-20 sm:mb-28"
        >
          <h2 className="font-base text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-gray-900">
            How Inkluvy works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto font-normal">
            Simplify accessibility navigation with tools that help you plan,
            report, and stay safe so you can travel with absolute peace of mind.
          </p>
        </motion.div>

        {/* Timeline Steps Layout */}
        <div className="relative">
          
          {/* Horizontal Connecting Line (Desktop) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={lineVariants}
            className="absolute top-[26px] left-[12%] right-[12%] h-[1.5px] border-t border-dashed border-gray-200 z-0 hidden md:block" 
          />

          {/* Vertical Connecting Line (Mobile) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={lineVariants}
            className="absolute left-[20px] top-[20px] bottom-[20px] w-[1.5px] border-l border-dashed border-gray-200 z-0 md:hidden" 
          />

          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 lg:gap-10 w-full"
          >
            {steps.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  variants={stepVariants}
                  className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center relative z-10 group gap-4 md:gap-0"
                >
                  {/* Outer Icon Box */}
                  <div className={`size-9 sm:size-12 rounded-lg flex items-center justify-center border border-gray-100 ${item.colorClass} group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                    <div>
                      <IconComponent className="size-5 sm:size-6" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-start md:items-center">
                    {/* Step Pill */}
                    <div className="mt-0 md:mt-6 px-3.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-[10px] sm:text-xs text-gray-600 font-medium tracking-wide">
                      {item.step}
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 md:mt-6 font-medium text-base sm:text-xl text-gray-900">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 md:mt-3 text-xs sm:text-sm leading-relaxed text-gray-500 max-w-[260px] md:mx-auto font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
