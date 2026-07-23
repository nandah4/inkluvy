import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FaBuilding } from "react-icons/fa";

const stats = [
  { numeric: 500, suffix: "+", label: "Accessible points mapped" },
  { numeric: 100, suffix: "+", label: "Cities covered" },
  {
    numeric: 1200,
    suffix: "+",
    label: "Community reports verified",
    format: true,
  },
];

// Headline Animation Variants
const headlineContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textChunkVariants = {
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
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const inlineImageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 13,
      delay: 0.15,
    },
  },
};

// Stats Grid Animation Variants
const statsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const statItemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function StatItem({ numeric, suffix, label, format }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numeric, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (textRef.current) {
          const rounded = Math.round(value);
          textRef.current.textContent = format
            ? rounded.toLocaleString("en-US") + suffix
            : rounded + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, numeric, suffix, format]);

  return (
    <motion.div
      ref={containerRef}
      variants={statItemVariants}
      className="flex flex-col items-center py-6 sm:py-0 px-4 flex-1"
    >
      <span
        ref={textRef}
        className="font-base text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900"
      >
        0{suffix}
      </span>
      <span className="mt-3 text-sm sm:text-base text-gray-500 font-normal text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function ImpactStats() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative z-30 bg-white py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Title */}
        <motion.div className="flex gap-3 items-center justify-center mb-8">
          {/* icon building */}
          <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <motion.h2 className="text-center text-base sm:text-lg tracking-wide text-gray-900 font-medium">
            About Inkluvy
          </motion.h2>
        </motion.div>
        {/* Headline with Inline Images */}
        <div className="text-center mx-auto">
          <motion.h2
            variants={headlineContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="font-base text-[24px] sm:text-4xl lg:text-5xl leading-[1.35] sm:leading-[1.25] lg:leading-[1.2] tracking-tight text-gray-900 font-normal"
          >
            <motion.span variants={textChunkVariants} className="inline">
              We envision a city where
            </motion.span>{" "}
            <motion.span
              variants={inlineImageVariants}
              className="inline-flex align-middle w-10 h-7 sm:w-14 sm:h-10 lg:w-16 lg:h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm mx-1 sm:mx-2 -translate-y-0.5"
            >
              <img
                src="/images/about/wheelchair-ramp.jpg"
                className="size-full object-cover"
                alt="wheelchair ramp"
              />
            </motion.span>{" "}
            <motion.span variants={textChunkVariants} className="inline">
              every path is accessible — not an exception, but the standard.
              Where
            </motion.span>{" "}
            <motion.span
              variants={inlineImageVariants}
              className="inline-flex align-middle w-10 h-7 sm:w-14 sm:h-10 lg:w-16 lg:h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm mx-1 sm:mx-2 -translate-y-0.5"
            >
              <img
                src="/images/about/photo-metal-texture-pattern.jpg"
                className="size-full object-cover"
                alt="tactile paving block"
              />
            </motion.span>{" "}
            <motion.span variants={textChunkVariants} className="inline">
              every sidewalk speaks to those who need it most, and
            </motion.span>{" "}
            <motion.span
              variants={inlineImageVariants}
              className="inline-flex align-middle w-10 h-7 sm:w-14 sm:h-10 lg:w-16 lg:h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm mx-1 sm:mx-2 -translate-y-0.5"
            >
              <img
                src="/images/about/person-crossing.jpg"
                className="size-full object-cover"
                alt="person crossing street safely"
              />
            </motion.span>{" "}
            <motion.span variants={textChunkVariants} className="inline">
              every journey is planned with confidence, not guesswork.
            </motion.span>
          </motion.h2>
        </div>

        {/* Stats Grid with Dividers */}
        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="mt-20 mx-auto flex flex-col sm:flex-row justify-between divide-y sm:divide-y-0 sm:divide-x divide-gray-200 max-w-4xl w-full"
        >
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              numeric={stat.numeric}
              suffix={stat.suffix}
              label={stat.label}
              format={stat.format}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
