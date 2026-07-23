import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuHeart,
  LuMapPin,
  LuNavigation,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";

const ctaContainerVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
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

export default function PlanRouteCta() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="translate-y-16">
        <motion.div
          variants={ctaContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 w-full text-center flex flex-col items-center"
        >
          <div className="max-w-3xl flex flex-col items-center text-center">
            {/* Headline (Dark Gray with Inline Icon Cards) */}
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.18] tracking-tight text-gray-900">
              Start Exploring{" "}
              <span className="inline-flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-200 p-1.5 sm:p-2.5 rounded-xl text-white shadow-xs mx-1 sm:mx-1.5 align-middle rotate-6">
                <LuSparkles className="size-4 sm:size-6 text-white" />
              </span>{" "}
              Accessible Routes Across the{" "}
              <span className="inline-flex items-center justify-center bg-gradient-to-tr from-green-500 to-green-200 p-1.5 sm:p-2.5 rounded-xl text-white shadow-xs mx-1 sm:mx-1.5 align-middle -rotate-6">
                <LuShieldCheck className="size-4 sm:size-6 text-white" />
              </span>{" "}
              City Today.
            </h2>

            {/* Description (Dark Gray with Inline Yellow & Green Icon Cards) */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl">
              Join thousands of users and community contributors building a
              truly inclusive city together. Plan safer paths , report obstacles
              in real time, and access help whenever you need it.
            </p>

            {/* Action Buttons (Centered at Top Area) */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <a
                href="/map"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-black px-7 py-3.5 text-sm sm:text-base font-medium text-white shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Interactive Map</span>
                <LuArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#map"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300/90 bg-white/90 backdrop-blur-md px-6 py-3.5 text-sm sm:text-base font-medium text-gray-800 shadow-2xs transition-all duration-300 hover:bg-white hover:border-gray-400"
              >
                <LuMapPin className="size-4 text-black" />
                <span>Report an Obstacle</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-width Background Image */}
      <div className="max-h-[350px] h-[330px]">
        <img
          src="/images/cta/cta.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
