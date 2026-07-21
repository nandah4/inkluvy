import { useRef } from "react";
import { motion } from "framer-motion";

// Animation variants
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

const leftCardVariants = {
  hidden: {
    opacity: 0,
    x: -45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rightCardVariants = {
  hidden: {
    opacity: 0,
    x: 45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const features = [
  {
    id: "feature-1",
    tag: "Accessible Routes",
    title: "See the City Before You Step Into It",
    description:
      "Every path is mapped and verified in real time — ramps, curb cuts, elevators, and sensory-friendly routes included. Filter by your specific access need and get a route you can trust before you even leave home.",
    image: "/images/features/feature-1.png",
    cursorClass: "cursor-location-pin",
    imageLeft: false, // Text on Left, Image on Right
  },
  {
    id: "feature-2",
    tag: "Community Reporting",
    title: "Flag It, So No One Else Gets Stuck",
    description:
      "Spot a broken elevator, blocked ramp, or unmapped stairs? Report it in seconds. Every flag is verified by the community, turning individual experiences into a safer route for everyone who comes next.",
    image: "/images/features/feature-2.png",
    cursorClass: "cursor-flag",
    imageLeft: true, // Image on Left, Text on Right
  },
  {
    id: "feature-3",
    tag: "24/7 Safety Network",
    title: "Help Is One Tap Away",
    description:
      "If a route stops feeling safe, trigger SOS instantly. Your live location is sent straight to trusted contacts and nearby volunteers — so you're never navigating the city truly alone.",
    image: "/images/features/feature-3.png",
    cursorClass: "cursor-sos-help",
    imageLeft: false, // Text on Left, Image on Right
  },
];

export default function CoreFeaturesSection() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative z-30 bg-white py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Header Block with cool enter/exit scroll animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={headerVariants}
        className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
      >
        <h2 className="font-base text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-gray-900">
          Everything You Need to Move Safely
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto font-normal">
          Simplify how you move through the city — plan accessible routes,
          report obstacles in real time, and get emergency help whenever you
          need it.
        </p>
      </motion.div>

      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 space-y-5 lg:space-y-10">
        {features.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch"
          >
            {/* Text Card */}
            <motion.div
              variants={item.imageLeft ? rightCardVariants : leftCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className={`bg-[#F5F5F3] rounded-2xl p-8 sm:p-10 lg:p-14 flex flex-col justify-between max-h-[360px] ${
                item.imageLeft ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div>
                {/* Pill Tag */}
                <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-800 flex items-center gap-2 w-fit">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>{item.tag}</span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-3xl sm:text-2xl font-semibold text-gray-900 leading-[1.15] tracking-tight mt-6 sm:mt-8">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 sm:mt-5 max-w-lg font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>

            {/* Image Card */}
            <motion.div
              variants={item.imageLeft ? leftCardVariants : rightCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className={`rounded-2xl overflow-hidden bg-gray-100 max-h-[360px] relative shadow-sm border border-gray-100/80 group ${
                item.cursorClass
              } ${item.imageLeft ? "lg:order-1" : "lg:order-2"}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
