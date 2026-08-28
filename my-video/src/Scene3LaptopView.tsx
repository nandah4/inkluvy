import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import {
  Send,
  Globe,
  Bell,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { SWOOSH_SOUND } from "./audioEffects";

export const Scene3LaptopView: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. TIMING & 3D LAPTOP ENTRANCE SPRINGS (150 Frames @ 30 FPS)
  // ----------------------------------------------------
  const swooshSoundFrame = 5;

  // Spring pop-up from bottom to center
  const laptopSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, mass: 0.75, stiffness: 120 },
  });

  // 3D Perspective Rotation (Tilt 22deg -> 0deg)
  const rotateX = interpolate(
    laptopSpring,
    [0, 1],
    [22, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Vertical Slide Up (850px -> 0px)
  const translateY = interpolate(
    laptopSpring,
    [0, 1],
    [850, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scale (0.75 -> 1.0)
  const scale = interpolate(
    laptopSpring,
    [0, 1],
    [0.75, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle floating motion after entrance (Frame 35+)
  const floatY = frame >= 35 ? Math.sin((frame - 35) * 0.05) * 6 : 0;

  return (
    <AbsoluteFill className="bg-[#F8FAFC] flex flex-col items-center justify-center p-6 sm:p-10 font-sans select-none antialiased text-gray-900 overflow-hidden perspective-[1200px]">
      
      {/* Swoosh Audio Effect */}
      {frame === swooshSoundFrame && <Audio src={SWOOSH_SOUND} volume={0.65} />}

      {/* Subtle Background Glow Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-white to-slate-100 pointer-events-none" />

      {/* LAPTOP MOCKUP CONTAINER */}
      <div
        style={{
          transform: `translateY(${translateY + floatY}px) rotateX(${rotateX}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
        className="w-full max-w-[1420px] relative z-10 transition-transform flex flex-col items-center"
      >
        {/* LAPTOP SCREEN FRAME (Outer Bezel) */}
        <div className="w-full bg-[#18181B] rounded-t-[28px] border-[14px] border-[#18181B] shadow-[0_30px_90px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col">
          
          {/* Webcam Notch Header */}
          <div className="w-full h-5 bg-[#18181B] flex items-center justify-center relative shrink-0">
            {/* Camera Dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#09090B] border border-gray-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-900/60" />
            </div>
          </div>

          {/* INNER SCREEN DISPLAY AREA (Inkluvy Web Content) */}
          <div className="w-full bg-[#FFFFFF] flex flex-col min-h-[720px] overflow-hidden text-gray-900 relative">
            
            {/* TOP NAVBAR */}
            <header className="w-full px-8 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between z-20 shrink-0">
              
              {/* Left Side: Brand Logo & Navigation Links */}
              <div className="flex items-center gap-10">
                {/* Logo & Brand Name */}
                <div className="flex items-center gap-3">
                  <img
                    src={staticFile("logo/Logo.png")}
                    alt="Inkluvy Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-extrabold text-xl tracking-tight text-gray-900">
                    INKLUVY
                  </span>
                </div>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-600">
                  <span className="text-[#4285F4] font-bold flex items-center gap-1.5 cursor-pointer">
                    Home
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                  </span>
                  <span className="hover:text-gray-900 cursor-pointer">Map</span>
                  <span className="hover:text-gray-900 cursor-pointer">Community</span>
                  <span className="hover:text-gray-900 cursor-pointer">Help & Support</span>
                </nav>
              </div>

              {/* Right Side: Language, SOS, User Profile */}
              <div className="flex items-center gap-5">
                {/* Language Selector */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 cursor-pointer px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span>EN</span>
                </div>

                {/* SOS Pill Button */}
                <button className="bg-[#EA4335] hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer">
                  <Bell className="w-3.5 h-3.5 fill-white" />
                  <span>SOS</span>
                </button>

                {/* Profile Avatar & Name */}
                <div className="flex items-center gap-2.5 pl-2 cursor-pointer">
                  <img
                    src={staticFile("images/profile-avatar.png")}
                    alt="Syahla Aulia"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-2xs"
                  />
                  <div className="hidden lg:flex flex-col text-left leading-tight">
                    <span className="text-xs font-bold text-gray-900">Syahla Aulia</span>
                    <span className="text-[10px] text-gray-500 font-medium">Contributor</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </header>

            {/* HERO SECTION CONTENT */}
            <main className="w-full flex-1 bg-gradient-to-b from-blue-50/50 via-white to-white flex flex-col items-center justify-center px-8 py-12 text-center relative overflow-hidden">
              
              {/* Decorative Subtle Gradient Orbs */}
              <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

              {/* Verified Access Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-amber-200/80 rounded-full px-4 py-1.5 shadow-2xs text-xs sm:text-sm font-medium text-gray-700 mb-8">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="font-bold text-amber-600">Verified Access</span>
                <span className="text-gray-300">•</span>
                <span>Scaling 100+ accessible routes daily</span>
              </div>

              {/* Main Headline */}
              <h1 className="max-w-[1100px] text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
                <span>Every Step </span>
                
                {/* Paper Airplane Badge */}
                <span className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 border border-blue-200 shadow-sm align-middle mx-1.5 rotate-[-8deg]">
                  <Send className="w-6 h-6 sm:w-8 sm:h-8 text-[#4285F4] stroke-[2.5]" />
                </span>

                <span> , Every Person </span>
                
                {/* Wheelchair Accessible Badge */}
                <span className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 border border-amber-200 shadow-sm align-middle mx-1.5 rotate-[8deg]">
                  <svg className="w-7 h-7 sm:w-9 sm:h-9 text-amber-600 fill-amber-600" viewBox="0 0 24 24">
                    <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-1 7h-2v5a3 3 0 0 0 3 3h5v-2h-5a1 1 0 0 1-1-1v-5zm6 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                  </svg>
                </span>

                <span>Deserves Easy Movement.</span>
              </h1>

              {/* Subtitle Description */}
              <p className="max-w-[850px] text-base sm:text-xl font-normal text-gray-600 leading-relaxed">
                Discover accessible routes across the city, preview locations with AI 3D Spatial Visualization , and navigate safely with real-time community reports.
              </p>

            </main>
          </div>
        </div>

        {/* LAPTOP BASE (Bottom Keyboard Chin & Hinge Lip) */}
        <div className="w-[102%] h-4 bg-gradient-to-b from-[#27272A] to-[#18181B] rounded-b-2xl shadow-[0_15px_30px_rgba(0,0,0,0.35)] relative flex justify-center items-start">
          {/* Centered Finger Opening Notch */}
          <div className="w-24 h-2 bg-[#09090B] rounded-b-md border-t border-gray-700/50" />
        </div>

        {/* Ambient Floor Shadow */}
        <div className="w-[90%] h-8 bg-black/20 blur-2xl rounded-full mt-2" />
      </div>
    </AbsoluteFill>
  );
};
