import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    filter: "blur(10px)",
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

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.92,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const testimonials = [
  {
    id: 1,
    name: "Siti Rahma",
    handle: "@siti.rahma",
    city: "Malang",
    avatar: "/images/profile-avatar.png",
    tagline: "Inkluvy Community",
    date: "Nov 20, 2025",
    quote: (
      <>
        Akhirnya saya bisa keliling kota tanpa rasa takut terjebak di tangga
        atau lift mati. Fitur laporan{" "}
        <span className="font-bold text-gray-900">real-time komunitas</span>{" "}
        benar-benar mengubah cara saya bepergian setiap hari. 🚀
      </>
    ),
  },
  {
    id: 2,
    name: "Budi Santoso",
    handle: "@budi.santoso",
    city: "Jakarta",
    avatar: "/images/profile-avatar.png",
    tagline: "Jakarta Mobility",
    date: "Dec 14, 2025",
    quote: (
      <>
        Rute landai dan{" "}
        <span className="font-bold text-gray-900">trotoar rata</span> yang
        direkomendasikan Inkluvy sangat membantu saya dan istri saat jalan pagi.
        Sangat informatif dan{" "}
        <span className="font-bold text-gray-900">ramah lansia</span>! 🔥
      </>
    ),
  },
  {
    id: 3,
    name: "Maya & Aris",
    handle: "@maya.commuter",
    city: "Bandung",
    avatar: "/images/profile-avatar.png",
    tagline: "Family Transit",
    date: "Jan 08, 2026",
    quote: (
      <>
        Membawa stroller bayi di angkutan umum dulu sangat merepotkan. Dengan
        Inkluvy, kami{" "}
        <span className="font-bold text-gray-900">
          bisa tahu stasiun mana yang punya lift aktif
        </span>{" "}
        sebelum berangkat. 🚼
      </>
    ),
  },
  {
    id: 4,
    name: "Fadhil Rizky",
    handle: "@fadhil.rizky",
    city: "Surabaya",
    avatar: "/images/profile-avatar.png",
    tagline: "Urban Access",
    date: "Feb 02, 2026",
    quote: (
      <>
        Sebagai relawan pemetaan trotoar, saya bangga bisa berkontribusi. UI-nya
        sangat responsif dan{" "}
        <span className="font-bold text-gray-900">
          navigasi suaranya sangat presisi
        </span>
        . 🧡
      </>
    ),
  },
  {
    id: 5,
    name: "Dewi Lestari",
    handle: "@dewi.lestari",
    city: "Yogyakarta",
    avatar: "/images/profile-avatar.png",
    tagline: "Inclusive Jogja",
    date: "Mar 11, 2026",
    quote: (
      <>
        Fitur{" "}
        <span className="font-bold text-gray-900">
          umpan balik haptic dan audio reader
        </span>{" "}
        di Inkluvy sangat membantu kawan-kawan disabilitas netra berjalan
        mandiri di kota. ♿
      </>
    ),
  },
  {
    id: 6,
    name: "Andi Wijaya",
    handle: "@andi.wijaya",
    city: "Semarang",
    avatar: "/images/profile-avatar.png",
    tagline: "Semarang Transit",
    date: "Apr 19, 2026",
    quote: (
      <>
        Peringatan dini saat ada perbaikan jalan dan{" "}
        <span className="font-bold text-gray-900">rampa busway yang aktif</span>{" "}
        membuat perjalanan kerja jauh lebih efisien. 🌿
      </>
    ),
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative z-30 bg-white py-20 sm:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header Block with enter/exit animation */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 bg-[#F4F3F0] border border-gray-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-800 mb-4 shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Community Stories</span>
          </div>

          <h2 className="font-base text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-gray-900">
            Loved by Citizens, Built for Everyone
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto font-normal">
            Hear directly from wheelchair users, elderly citizens, and families
            who now navigate the city with more safety and independence.
          </p>
        </motion.div>

        {/* Testimonials Cards Grid with Staggered Entrance Animation */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.018,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-white rounded-[1.75rem] sm:rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-gray-300"
            >
              <div>
                {/* Top User Header Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="size-11 rounded-full object-cover border border-gray-100 shadow-2xs shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1 truncate">
                        <span>{item.name}</span>
                        <span className="size-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <LuCheck className="size-2 stroke-[3]" />
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400 font-normal truncate">
                        {item.handle}
                      </p>
                    </div>
                  </div>

                  {/* Role Badge Pill */}
                  <span className="bg-[#F4F3F0] text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200/60 shrink-0">
                    {item.city}
                  </span>
                </div>

                {/* Main Quote Content with Bold Emphasis */}
                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal mt-3 md:mt-6">
                  {item.quote}
                </p>
              </div>

              {/* Bottom Footer Row */}
              <div className="border-t border-dashed border-gray-200 pt-3 mt-4 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>{item.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
