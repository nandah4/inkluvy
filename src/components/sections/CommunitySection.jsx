import { motion, useReducedMotion } from "framer-motion";
import {
  LuArrowUpRight,
  LuBadgeCheck,
  LuClock3,
  LuHeart,
  LuMapPin,
  LuMessageCircle,
  LuUsers,
} from "react-icons/lu";

const reports = [
  {
    category: "Access point",
    title: "Lift at Stasiun Kota is working again",
    detail: "Updated by Raka · 8 min ago",
    location: "Klojen, Malang",
    tone: "blue",
  },
  {
    category: "Hazard alert",
    title: "Temporary cones now mark the uneven pavement",
    detail: "Updated by Dita · 21 min ago",
    location: "Jalan Ijen, Malang",
    tone: "yellow",
  },
  {
    category: "Facility",
    title: "New accessible restroom open near the park",
    detail: "Updated by Arif · 42 min ago",
    location: "Taman Kota, Malang",
    tone: "green",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const reportContainerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
};

const reportVariants = {
  hidden: { opacity: 0, x: 22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function ReportCard({ report, shouldReduceMotion }) {
  const tone = {
    blue: { icon: "bg-blue-50 text-city-blue", badge: "bg-blue-50 text-city-blue" },
    yellow: { icon: "bg-accent-50 text-accent-600", badge: "bg-accent-50 text-accent-600" },
    green: { icon: "bg-emerald-50 text-emerald-700", badge: "bg-emerald-50 text-emerald-700" },
  }[report.tone];

  return (
    <motion.article
      variants={reportVariants}
      whileHover={shouldReduceMotion ? undefined : { x: 5, transition: { duration: 0.2 } }}
      className="group rounded-2xl border border-city-ink/10 bg-white p-5 shadow-[0_16px_36px_rgba(21,34,56,0.05)] transition-shadow duration-300 hover:shadow-[0_20px_42px_rgba(21,34,56,0.1)]"
    >
      <div className="flex items-start gap-4">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone.icon}`}><LuBadgeCheck className="size-5" aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${tone.badge}`}>{report.category}</span>
            <span className="text-[0.68rem] text-slate-400">{report.detail}</span>
          </div>
          <h3 className="mt-3 max-w-lg font-display text-lg font-bold leading-tight tracking-[-0.035em] text-city-ink">{report.title}</h3>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-city-slate">
            <span className="inline-flex items-center gap-1.5"><LuMapPin className="size-3.5 text-city-blue" aria-hidden="true" /> {report.location}</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700"><LuHeart className="size-3.5" aria-hidden="true" /> Helpful</span>
          </div>
        </div>
        <LuArrowUpRight className="mt-1 size-4 shrink-0 text-slate-300 transition-colors group-hover:text-city-blue" aria-hidden="true" />
      </div>
    </motion.article>
  );
}

export default function CommunitySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="community" className="relative overflow-hidden bg-city-fog py-28 sm:py-36">
      <div className="relative mx-auto max-w-[1376px] px-6 sm:px-12 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <motion.div
            variants={revealVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-city-blue"><LuUsers className="size-3.5" aria-hidden="true" /> Built with the community</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[0.98] tracking-[-0.065em] text-city-ink sm:text-5xl">Small updates can make a whole journey feel possible.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-city-slate">Orang yang melewati kota setiap hari membantu menjaga informasi tetap manusiawi, segar, dan bisa dipercaya.</p>
            </div>

            <div className="mt-10 max-w-sm rounded-[1.5rem] bg-city-ink p-6 text-white shadow-[0_24px_60px_rgba(21,34,56,0.18)] sm:mt-14 sm:p-7">
              <LuMessageCircle className="size-7 text-accent-400" aria-hidden="true" />
              <blockquote className="mt-5 font-display text-2xl font-bold leading-tight tracking-[-0.045em]">“I can plan my route with confidence now—not just hope.”</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <img src="/images/profile-avatar.png" alt="Alya, Inkluvy community member" className="size-9 rounded-full object-cover ring-2 ring-white/10" />
                <div>
                  <p className="text-sm font-semibold">Alya Prameswari</p>
                  <p className="mt-0.5 text-xs text-slate-400">Wheelchair user · Malang</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              variants={revealVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.22 }}
              className="flex items-end justify-between gap-5 border-b border-city-ink/15 pb-5"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Recently reported</p>
                <p className="mt-2 text-sm text-city-slate">Live from people moving through Malang</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" /> 12 online</span>
            </motion.div>

            <motion.div
              variants={reportContainerVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-5 space-y-3"
            >
              {reports.map((report) => <ReportCard key={report.title} report={report} shouldReduceMotion={shouldReduceMotion} />)}
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-city-slate">
              <span className="inline-flex items-center gap-1.5"><LuClock3 className="size-3.5" aria-hidden="true" /> Updates are verified by nearby members</span>
              <a href="#features" className="inline-flex items-center gap-1.5 font-bold text-city-blue transition hover:gap-2.5">See how reporting works <LuArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
