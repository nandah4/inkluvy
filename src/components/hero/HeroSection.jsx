import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import {
  LuChevronDown,
  LuSearch,
  LuMapPin,
  LuAccessibility,
  LuCompass,
} from "react-icons/lu";
import { FaBuilding } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";

const FIRST_HERO_FRAME = 1;
const LAST_HERO_FRAME = 33;
const heroFrameSources = Array.from(
  { length: LAST_HERO_FRAME - FIRST_HERO_FRAME + 1 },
  (_, index) => {
    const frameNumber = String(FIRST_HERO_FRAME + index).padStart(3, "0");
    return `/images/hero-frame/frame_${frameNumber}.jpg`;
  },
);

function getFrameFromProgress(progress) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  return Math.round(
    FIRST_HERO_FRAME + clampedProgress * (LAST_HERO_FRAME - FIRST_HERO_FRAME),
  );
}

const heroSequenceVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.16,
    },
  },
};

const titleGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const descriptionVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const widgetVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardSequenceVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.965,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const inlineIconVariantsLeft = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 12,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 9,
      delay: 0.85,
    },
  },
};

const inlineIconVariantsRight = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -12,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 9,
      delay: 1.0,
    },
  },
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const activeFrameRef = useRef(FIRST_HERO_FRAME);
  const [activeFrame, setActiveFrame] = useState(FIRST_HERO_FRAME);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const preloadFrames = () => {
      heroFrameSources.slice(1).forEach((source) => {
        const image = new Image();
        image.decoding = "async";
        image.src = source;
      });
    };

    if (typeof window === "undefined") return undefined;

    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(preloadFrames, {
        timeout: 750,
      });
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = window.setTimeout(preloadFrames, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const updateActiveFrame = (progress) => {
      const nextFrame = getFrameFromProgress(progress);

      if (nextFrame === activeFrameRef.current) return;

      activeFrameRef.current = nextFrame;
      setActiveFrame(nextFrame);
    };

    if (shouldReduceMotion) {
      activeFrameRef.current = FIRST_HERO_FRAME;
      setActiveFrame(FIRST_HERO_FRAME);
      return undefined;
    }

    updateActiveFrame(scrollYProgress.get());
    return scrollYProgress.on("change", updateActiveFrame);
  }, [scrollYProgress, shouldReduceMotion]);

  const cardHover = shouldReduceMotion
    ? undefined
    : {
        y: -4,
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" },
      };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate z-20 h-[260svh] min-h-[1800px]"
      aria-label="Pratinjau perjalanan aksesibilitas Inkluvy"
    >
      <div className="sticky top-0 h-[100svh] min-h-[700px] overflow-visible sm:min-h-[760px] lg:min-h-[800px]">
        {/* Background Frame-by-Frame Image */}
        <div className="absolute inset-0 z-0 size-full md:px-2">
          <img
            src={heroFrameSources[activeFrame - FIRST_HERO_FRAME]}
            alt=""
            aria-hidden="true"
            className="size-full object-cover"
            draggable="false"
            fetchPriority="high"
          />
          {/* Dark Overlay for Text Legibility */}
          <div
            className="absolute md:mx-2 inset-0 z-10 bg-gradient-to-b from-transparent to-black/50"
            aria-hidden="true"
          />
        </div>

        {/* Content Container (Headline + Description + Widget) */}
        <motion.div
          className="relative top-8 z-20 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-4 text-center sm:top-14 sm:px-6 lg:px-16"
          variants={heroSequenceVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          {/* Hero Titles */}
          <motion.div
            variants={titleGroupVariants}
            className="mb-6 max-w-5xl sm:mb-12"
          >
            <motion.h1
              variants={titleVariants}
              className="font-base text-4xl leading-[1.12] text-white sm:text-6xl sm:leading-[1.08] lg:text-7xl lg:leading-[1.05]"
            >
              M
              <motion.span
                variants={inlineIconVariantsLeft}
                className="inline-block bg-gradient-to-t p-2 sm:p-3 rounded-lg sm:rounded-xl from-primary/90 to-secondary mx-1 sm:mx-2"
              >
                <GiCartwheel className="text-base sm:text-[38px] text-white" />
              </motion.span>
              ve Through the C
              <motion.span
                variants={inlineIconVariantsRight}
                className="inline-block bg-gradient-to-t px-1.5 py-2.5 sm:px-2 sm:py-4 rounded-lg sm:rounded-xl from-primary/90 to-secondary mx-1 sm:mx-2"
              >
                <FaBuilding className="text-base sm:text-[35px] text-white" />
              </motion.span>
              ty, Freely.
            </motion.h1>
            <motion.p
              variants={descriptionVariants}
              className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white sm:mt-6 sm:text-base lg:text-lg"
            >
              Discover accessible routes across the city, backed by real reports
              from real people — and help, whenever you need it.
            </motion.p>
          </motion.div>

          {/* Search Planner Widget */}
          <motion.div
            variants={widgetVariants}
            className="mx-auto mt-6 w-full max-w-full text-left sm:mt-10 sm:max-w-[85%] lg:max-w-[80%]"
          >
            {/* Widget Form Body */}
            <motion.div
              variants={cardSequenceVariants}
              className="flex w-full flex-row items-center justify-start gap-3 overflow-x-auto py-1 no-scrollbar"
            >
              {/* Field 1: Looking for */}
              <motion.div
                variants={cardVariants}
                whileHover={cardHover}
                className="min-w-[200px] shrink-0 flex-1 rounded-xl bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:min-w-[240px]"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded bg-primary/20 text-primary">
                    <LuMapPin className="size-3.5" />
                  </span>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Looking for
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Find a Destination"
                  className="mt-3 w-full border-0 bg-transparent p-0 text-base font-normal text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </motion.div>

              {/* Field 2: Access Need */}
              <motion.div
                variants={cardVariants}
                whileHover={cardHover}
                className="min-w-[200px] shrink-0 flex-grow rounded-xl bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:min-w-[240px]"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded bg-primary/20 text-primary">
                    <LuAccessibility className="size-3.5" />
                  </span>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Access Need
                  </label>
                </div>
                <div className="relative mt-3 flex cursor-pointer items-center justify-between">
                  <select className="w-full cursor-pointer appearance-none border-0 bg-transparent p-0 pr-6 text-base font-normal text-gray-900 focus:outline-none focus:ring-0">
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
                variants={cardVariants}
                whileHover={cardHover}
                className="min-w-[200px] shrink-0 flex-grow rounded-xl bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:min-w-[240px]"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded bg-primary/20 text-primary">
                    <LuCompass className="size-3.5" />
                  </span>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Location
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="All Cities"
                  defaultValue="Malang"
                  className="mt-3 w-full border-0 bg-transparent p-0 text-base font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
                />
              </motion.div>

              {/* Submit/Discover Button */}
              <motion.button
                variants={cardVariants}
                whileHover={cardHover}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="flex min-h-12 w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-medium text-white  transition-opacity duration-200 hover:opacity-90 sm:text-base"
              >
                <LuSearch className="size-4" />
                <span>Find Route</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
