import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuUsers,
  LuBuilding2,
  LuBus,
  LuCheck,
  LuArrowUpRight,
} from "react-icons/lu";

const trustHighlights = [
  {
    icon: LuShieldCheck,
    title: "100% Data Terverifikasi",
    description:
      "Setiap rampa, ubin pemandu, dan lift publik diverifikasi langsung oleh relawan kontributor lokal sebelum dipublikasikan di peta.",
    badge: "5+ Verifikator / Laporan",
  },
  {
    icon: LuBus,
    title: "Integrasi Transit Publik",
    description:
      "Terhubung langsung dengan titik transit bus lantai rendah (Low-floor) dan stasiun kereta api dengan jalur rampa prioritas.",
    badge: "Koneksi Real-time",
  },
  {
    icon: LuUsers,
    title: "Jaringan Relawan SOS",
    description:
      "Lebih dari 250+ relawan pemuda dan komunitas disabilitas lokal Malang yang siap siaga merespons panggilan navigasi darurat.",
    badge: "24/7 Response Readiness",
  },
];

const partnerLogos = [
  {
    name: "Dinas Perhubungan Kota Malang",
    category: "Pemerintah Daerah",
    icon: LuBuilding2,
  },
  {
    name: "Pertuni Malang",
    category: "Persatuan Tunanetra Indonesia",
    icon: LuUsers,
  },
  {
    name: "HWDI Jawa Timur",
    category: "Himpunan Wanita Disabilitas",
    icon: LuShieldCheck,
  },
  {
    name: "Stasiun Malang Kota Baru",
    category: "Aksesibilitas Kereta",
    icon: LuBus,
  },
];

export default function VerifiedPartners() {
  return (
    <section className="py-20 bg-gray-50/60 border-y border-gray-150 relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <LuShieldCheck className="size-4 text-emerald-600" />
            <span>Ekosistem Terpercaya</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 leading-snug">
            Dipercaya oleh Komunitas & Pioneer Kota Inklusif
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Inkluvy berkolaborasi erat dengan organisasi disabilitas, pemerintah daerah, dan jaringan transit publik untuk menjamin keakuratan navigasi kota.
          </p>
        </div>

        {/* 3 Key Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 rounded-xl bg-gray-100/80 border border-gray-200/60 flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  <span>Lihat Standar Aksesibilitas</span>
                  <LuArrowUpRight className="size-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Logos & Network Matrix */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-150">
            <div>
              <h4 className="text-base font-bold text-gray-950">
                Mitra Strategis & Jaringan Verifikasi Kota
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Bekerjasama menjaga inklusivitas ruang publik dan transportasi umum di Malang.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-200 px-3.5 py-2 rounded-xl shrink-0 self-start sm:self-auto">
              <LuCheck className="size-4 text-emerald-600" />
              <span>1,480+ Fasilitas Terverifikasi</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {partnerLogos.map((partner) => {
              const PartnerIcon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="p-4 sm:p-5 rounded-xl bg-gray-50/60 border border-gray-150 flex items-center gap-3.5 hover:bg-gray-100/80 transition-colors"
                >
                  <div className="size-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 shrink-0">
                    <PartnerIcon className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 truncate">
                      {partner.name}
                    </h5>
                    <p className="text-[10px] text-gray-500 font-medium truncate">
                      {partner.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
