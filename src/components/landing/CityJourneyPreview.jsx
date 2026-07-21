import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { LuCheck, LuArrowDown } from "react-icons/lu";

const FIRST_FRAME = 1;
const LAST_FRAME = 33;
const frameSources = Array.from(
  { length: LAST_FRAME - FIRST_FRAME + 1 },
  (_, i) => {
    const num = String(FIRST_FRAME + i).padStart(3, "0");
    return `/images/hero-frame/frame_${num}.jpg`;
  },
);

function getFrameIndex(progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.round(clamped * (LAST_FRAME - FIRST_FRAME));
}

export default function CityJourneyPreview() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const activeFrameRef = useRef(0);
  const [activeFrame, setActiveFrame] = useState(0);

  // Custom Cursor Badge States
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames
  useEffect(() => {
    const preload = () => {
      frameSources.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      });
    };

    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 1000 });
      return () => window.cancelIdleCallback(id);
    }

    const tid = setTimeout(preload, 100);
    return () => clearTimeout(tid);
  }, []);

  // Update frame on scroll
  useEffect(() => {
    const update = (progress) => {
      const next = getFrameIndex(progress);
      if (next === activeFrameRef.current) return;
      activeFrameRef.current = next;
      setActiveFrame(next);
    };

    if (shouldReduceMotion) {
      activeFrameRef.current = 0;
      setActiveFrame(0);
      return;
    }

    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [scrollYProgress, shouldReduceMotion]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      style={{
        height: shouldReduceMotion
          ? "100svh"
          : `${(LAST_FRAME - FIRST_FRAME + 1) * 12 + 100}vh`,
      }}
      aria-label="Scroll-driven city journey preview"
    >
      {/* Sticky container — stays fixed below navbar while user scrolls through frames */}
      <div className="sticky top-20 sm:top-24 flex h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] items-center justify-center">
        {/* Floating Card Container (Framed with max-width & padding, generous spacing from navbar) */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[16/9] max-h-[70vh] sm:max-h-[74vh] rounded-2xl sm:rounded-3xl lg:rounded-[30px] overflow-hidden border border-gray-200/60 cursor-none"
          >
            {/* Frame-by-frame image */}
            <img
              src={frameSources[activeFrame]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Custom Floating Cursor Badge ('Scroll') */}
      <AnimatePresence>
        {isHovered && !shouldReduceMotion && (
          <motion.div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <div className="flex items-center gap-2 bg-primary/70 backdrop-blur-md border border-white/20 text-white px-5 py-3.5 rounded-full shadow-2xl text-xs sm:text-sm font-medium tracking-wide">
              <LuArrowDown className="size-5 animate-bounce" />
              <span className="whitespace-nowrap">Scroll</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
