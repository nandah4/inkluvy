import { ACCESSIBILITY_STATUS } from "../lib/accessibilityStatus";

export const mockUsers = [
  {
    id: "syahla-aulia",
    name: "Syahla Aulia",
    avatar: "/images/profile-avatar.png",
    coverImage: "/images/community/community_hero_illustration.png",
    role: "Verified Contributor",
    tier: "Gold Mapper",
    reportsCount: 142,
    verifiedRoutes: 38,
    joinedDate: "January 2025",
    location: "Malang, Jawa Timur",
    bio: "Pengguna kursi roda aktif & advokat aksesibilitas perkotaan. Suka memetakan jalur rampa dan transportasi publik inklusif di Malang Raya.",
    disabilityType: "Pengguna Kursi Roda",
    preferences: [
      "Rampa Landaian ≤ 6°",
      "Lift Aksesibel",
      "Trotoar Paving Rata",
    ],
    badges: [
      {
        id: 1,
        name: "Top Mapper 2026",
        icon: "🏆",
        color: "bg-amber-100 text-amber-800",
      },
      {
        id: 2,
        name: "Lift Guardian",
        icon: "🛗",
        color: "bg-blue-100 text-blue-800",
      },
      {
        id: 3,
        name: "Verified Explorer",
        icon: "🛡️",
        color: "bg-emerald-100 text-emerald-800",
      },
    ],
  },
  {
    id: "fadhil-rizky",
    name: "Fadhil Rizky",
    avatar: "/images/avatars/avatar_fadhil.png",
    coverImage: "/images/community/community_sidewalk_ramp.png",
    role: "Gold Mapper",
    tier: "Gold Mapper",
    reportsCount: 210,
    verifiedRoutes: 56,
    joinedDate: "March 2025",
    location: "Klojen, Malang",
    bio: "Relawan pemetaan fasilitas fisik dan pengawas trotoar publik. Selalu siap melaporkan rintangan jalan dan perbaikan sementara.",
    disabilityType: "Relawan Aksesibilitas",
    preferences: ["Jalur Tactile Paving", "Lampu Penyeberangan Suara"],
    badges: [
      {
        id: 1,
        name: "Master Reporter",
        icon: "📢",
        color: "bg-purple-100 text-purple-800",
      },
      {
        id: 2,
        name: "Community Star",
        icon: "⭐",
        color: "bg-amber-100 text-amber-800",
      },
    ],
  },
  {
    id: "siti-rahma",
    name: "Siti Rahma",
    avatar: "/images/avatars/avatar_siti.png",
    coverImage: "/images/community/community_elevator_update.png",
    role: "Silver Mapper",
    tier: "Silver Mapper",
    reportsCount: 185,
    verifiedRoutes: 29,
    joinedDate: "June 2025",
    location: "Lowokwaru, Malang",
    bio: "Penyandang Low Vision yang rutin menggunakan panduan suara dan ubin pemandu (guiding block) di area kampus dan pusat perbelanjaan.",
    disabilityType: "Tunanetra / Low Vision",
    preferences: [
      "Tactile Guiding Block",
      "Panduan Audio Haptic",
      "Penerangan Tinggi",
    ],
    badges: [
      {
        id: 1,
        name: "Voice Guide Pioneer",
        icon: "🎙️",
        color: "bg-rose-100 text-rose-800",
      },
      {
        id: 2,
        name: "Silver Contributor",
        icon: "🥈",
        color: "bg-slate-100 text-slate-800",
      },
    ],
  },
];

export const mockPosts = [
  {
    id: "post-danger-1",
    authorId: "fadhil-rizky",
    author: "Dimas Anggara",
    avatar: "/images/avatars/avatar_budi_disability_1784680279512.png",
    role: "Disability Advocate",
    time: "10 minutes ago",
    fullDate: "July 31, 2026, 23:45 WIB",
    location: "Jl. Ijen Boulevard (Depan Perpustakaan)",
    title: "⛔ BAHAYA: Galian Kabel Terbuka Tanpa Penutup di Trotoar Utama",
    summary:
      "Galian kabel galian terbuka memotong trotoar pedestrian tanpa rambu pengaman. Sangat berbahaya bagi pengguna kursi roda & tunanetra!",
    content: `PERINGATAN BAHAYA / HAZARD REPORT:

Mohon untuk pengguna kursi roda dan rekan tunanetra sementara menghindari jalur trotoar timur Jl. Ijen Boulevard (area dekat Perpustakaan Kota).

**Kondisi Lapangan:**
- Terdapat galian kabel proyek terbuka setinggi 1.2 meter tanpa penutup dan tanpa pita pengaman hazard.
- Ubin pemandu (tactile block) terputus total sepanjang 15 meter.
- Pengguna kursi roda terpaksa turun ke bahu jalan raya yang padat lalu lintas.

Laporan bahaya darurat telah dikirimkan ke Dinas Perhubungan & Pekerjaan Umum Kota Malang via fitur Inkluvy SOS Civic Alert. Mohon berhati-hati!`,
    tag: ACCESSIBILITY_STATUS.danger.label,
    tagColor: "bg-red-600 text-white border-red-700 font-bold animate-pulse",
    likes: 89,
    commentsCount: 14,
    isLiked: true,
    image: "/images/map/danger_route_hole.png",
    coordinates: { lat: -7.9722, lng: 112.6245 },
    comments: [
      {
        id: "cd1",
        author: "Siti Rahma",
        avatar: "/images/avatars/avatar_siti.png",
        time: "5 minutes ago",
        text: "Bahaya sekali! Kemarin malam hampir terperosok karena tidak ada lampu penerangan di dekat galian tersebut.",
      },
    ],
  },
  {
    id: "post-1",
    authorId: "syahla-aulia",
    author: "Syahla Aulia",
    avatar: "/images/profile-avatar.png",
    role: "Verified Contributor",
    time: "2 hours ago",
    fullDate: "July 28, 2026, 14:30 WIB",
    location: "Stasiun Malang Kota Baru (Peron 2)",
    title: "Lift Aksesibel Stasiun Kota Kembali Beroperasi Normal 🎉",
    summary:
      "Tim Inkluvy dan petugas stasiun baru saja menyelesaikan perbaikan lift peron 2. Sudah dicoba dengan kursi roda elektrik dan berfungsi sangat halus!",
    content: `Kabar baik untuk teman-teman pengguna kursi roda dan lansia yang sering menggunakan kereta dari Stasiun Malang Kota Baru! 

Lift peron 2 yang sempat terkendala tombol sensor minggu lalu kini telah diperbaiki total oleh tim teknis KAI bekerja sama dengan verifikator lapangan Inkluvy. 

**Hasil Verifikasi Langsung:**
- **Kapasitas Lift:** Maksimal 8 orang / 650 kg (muat 2 kursi roda sekaligus).
- **Lebar Pintu:** 95 cm (sangat lega untuk kursi roda standar maupun elektrik).
- **Sensivitas Pintu:** Dilengkapi sensor infrared ganda, aman dari risiko terjepit.
- **Tombol Braille & Audio Announcer:** Berfungsi jernih dalam Bahasa Indonesia.

Terima kasih kepada pihak manajemen Stasiun Malang atas respon cepatnya pasca laporan crowdsourcing warga 2 hari lalu!`,
    tag: ACCESSIBILITY_STATUS.safe.label,
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    likes: 42,
    commentsCount: 3,
    isLiked: false,
    image: "/images/community/community_elevator_update.png",
    coordinates: { lat: -7.9781, lng: 112.6373 },
    comments: [
      {
        id: "c1",
        authorId: "fadhil-rizky",
        author: "Fadhil Rizky",
        avatar: "/images/avatars/avatar_fadhil.png",
        time: "1 hour ago",
        content:
          "Mantap! Kemarin lusa saya yang bantu laporkan. Senang sekali langsung ditindaklanjuti!",
      },
      {
        id: "c2",
        authorId: "siti-rahma",
        author: "Siti Rahma",
        avatar: "/images/avatars/avatar_siti.png",
        time: "45 minutes ago",
        content:
          "Fitur audio announcer di dalam liftnya juga sangat membantu bagi penderita low vision seperti saya. Terima kasih perbaikannya!",
      },
      {
        id: "c3",
        authorId: "syahla-aulia",
        author: "Syahla Aulia",
        avatar: "/images/profile-avatar.png",
        time: "10 minutes ago",
        content:
          "Sama-sama Kak Fadhil & Mbak Siti! Mari terus kawal fasilitas publik kota kita ♿💪",
      },
    ],
  },
  {
    id: "post-2",
    authorId: "fadhil-rizky",
    author: "Fadhil Rizky",
    avatar: "/images/avatars/avatar_fadhil.png",
    role: "Gold Mapper",
    time: "5 hours ago",
    fullDate: "July 28, 2026, 11:15 WIB",
    location: "Jl. Veteran (Depan UB Gate 1)",
    title: "Perbaikan Trotoar Sementara — Rampa Kayu Disediakan 🚧",
    summary:
      "Ada pengerjaan galian kabel di sepanjang trotoar Jl. Veteran. Kontraktor menyediakan rampa kayu sementara dengan landaian 5 derajat. Harap hati-hati jika lewat malam hari.",
    content: `Himbauan untuk warga dan mahasiswa penyandang disabilitas yang sering melintasi trotoar depan Gerbang 1 Universitas Brawijaya (Jl. Veteran Malang).

Saat ini sedang berlangsung proyek pemasangan pipa dan jaringan fiber optik bawah tanah. Sebagian ubin pemandu (tactile paving) dilepas sementara sepanjang 40 meter.

**Kondisi Lapangan:**
- Kontraktor telah memasang **Rampa Kayu Darurat** bertekstur anti-slip dengan kemiringan sekitar 5°.
- Dipasang papan peringatan warna kuning kontras tinggi di kedua ujung proyek.
- **Catatan Peringatan:** Penerangan malam hari di area ini agak remang. Disarankan melintas sebelum pukul 18:00 WIB atau menggunakan pengawalan relawan jika menggunakan kursi roda manual.`,
    tag: ACCESSIBILITY_STATUS.vulnerable.label,
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
    likes: 28,
    commentsCount: 1,
    isLiked: false,
    image: "/images/community/community_sidewalk_ramp.png",
    coordinates: { lat: -7.9526, lng: 112.6145 },
    comments: [
      {
        id: "c4",
        authorId: "syahla-aulia",
        author: "Syahla Aulia",
        avatar: "/images/profile-avatar.png",
        time: "3 hours ago",
        content:
          "Terima kasih info lalulintasnya Kak Fadhil. Nanti sore saya lewat sana untuk cek kemiringannya.",
      },
    ],
  },
];

export const mockEvents = [
  {
    id: "event-1",
    title: "Malang Accessibility Walk & Mapping Day",
    slug: "malang-accessibility-walk-2026",
    date: "Saturday, August 8, 2026",
    time: "08:00 - 12:00 WIB",
    location: "Tugu Square, Malang & Surrounding Area",
    address: "Jl. Tugu No.1, Kiduldalem, Kec. Klojen, Kota Malang",
    organizer: "Inkluvy Community & Malang City Government",
    category: "Mapping Walk",
    banner: "/images/community/event_accessibility_walk.png",
    status: "Upcoming",
    attendeesCount: 48,
    maxCapacity: 100,
    description: `Join a hands-on mapping activity for accessible public facilities and sidewalks in central Malang.

We will verify ramps and tactile paving, and identify physical obstacles that have not yet been added to the Inkluvy map.

Participants will work in small groups alongside wheelchair users, blind participants, and volunteer companions. The findings will be added directly to Inkluvy's main database.`,
    agenda: [
      {
        time: "08:00 - 08:30",
        activity:
          "Check-in and Mapper Group Assignment at the Tugu Square Gazebo",
      },
      {
        time: "08:30 - 09:00",
        activity:
          "Briefing: How to Add Accessibility Data in the Inkluvy Web App",
      },
      {
        time: "09:00 - 11:00",
        activity:
          "Community Walk and Sidewalk Mapping: Station, Tugu Square, and City Hall Route",
      },
      {
        time: "11:00 - 12:00",
        activity:
          "Report Summary, City Recommendation Discussion, and Group Photo",
      },
    ],
    accessibilityFeatures: [
      "Gentle Ramp Available at the Meeting Point",
      "Sign Language Interpreter Available During the Briefing",
      "Volunteer Companions for Blind and Mobility-Impaired Participants",
      "Wheelchair-Accessible Portable Toilet",
      "Complimentary Refreshments and Drinking Water",
    ],
    attendees: [
      {
        name: "Syahla Aulia",
        avatar: "/images/profile-avatar.png",
        role: "Leader",
      },
      {
        name: "Fadhil Rizky",
        avatar: "/images/avatars/avatar_fadhil.png",
        role: "Co-Host",
      },
      {
        name: "Siti Rahma",
        avatar: "/images/avatars/avatar_siti.png",
        role: "Participant",
      },
    ],
  },
  {
    id: "event-2",
    title: "Voice Navigation Workshop for Blind and Low-Vision Participants",
    slug: "workshop-navigasi-suara-tunanetra",
    date: "Wednesday, August 5, 2026",
    time: "10:00 - 14:00 WIB",
    location: "Gedung UB TV, Universitas Brawijaya",
    address: "Jl. Veteran, Ketawanggede, Kec. Lowokwaru, Kota Malang",
    organizer: "UB Disability Studies and Services Center (PSLD)",
    category: "Workshop & Training",
    banner: "/images/every_step_illustration.png",
    status: "Upcoming",
    attendeesCount: 32,
    maxCapacity: 60,
    description: `A practical workshop and trial of Inkluvy's haptic voice-guidance features for blind and low-vision participants.

Participants will learn how to enable the Screen Reader Haptic Feedback module, recognize audio warnings for street obstacles, and share feedback for the next version of the app.`,
    agenda: [
      {
        time: "10:00 - 10:30",
        activity: "Opening Session by PSLD UB and Introduction to the Haptic Audio Module",
      },
      {
        time: "10:30 - 12:00",
        activity: "Indoor and Outdoor Campus Voice Navigation Simulation",
      },
      {
        time: "12:00 - 13:00",
        activity: "Break, Lunch, and Networking Session",
      },
      {
        time: "13:00 - 14:00",
        activity: "Feedback Session and Certificate Distribution",
      },
    ],
    accessibilityFeatures: [
      "Training Materials in Braille and Digital Audio Formats",
      "Haptic Beacon and Sound Guide Signals",
      "Volunteer Mobility Companions",
      "Air-Conditioned Room with Voice-Enabled Lift Access",
    ],
    attendees: [
      {
        name: "Siti Rahma",
        avatar: "/images/avatars/avatar_siti.png",
        role: "Speaker",
      },
      {
        name: "Fadhil Rizky",
        avatar: "/images/avatars/avatar_fadhil.png",
        role: "Participant",
      },
    ],
  },
];
