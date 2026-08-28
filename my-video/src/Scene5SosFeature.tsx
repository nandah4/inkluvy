import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
  Easing,
} from "remotion";
import {
  Bell,
  MapPin,
  Radio,
  Navigation,
} from "lucide-react";
import {
  MOUSE_CLICK_SOUND,
  SWOOSH_SOUND,
  ALERT_PING_SOUND,
} from "./audioEffects";

export const Scene5SosFeature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. TIMING & MOTION SPRINGS (240 Frames Total @ 30 FPS = 8s)
  // ----------------------------------------------------
  const slideStartFrame = 15;
  const slideEndFrame = 48; // Ultra smooth 33-frame glide
  const clickFrame = 72;
  const mapExpandFrame = 86;

  // 1. Ultra-Smooth Slide Effect for "SOS" Word (Center -> Left)
  const sosSlideX = interpolate(
    frame,
    [slideStartFrame, slideEndFrame],
    [0, -260],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Initial SOS Entrance Pop
  const sosEntranceSpring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.5, stiffness: 160 },
  });

  // 2. Right SOS Button (Rounded-Full) Pop-Out Spring (Appears on the right after SOS slides left)
  const rightButtonSpring = spring({
    frame: frame - (slideEndFrame - 5),
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 170 },
  });

  const isClicked = frame >= clickFrame;

  // Button Click Scale & Pulse Ripple (No Cursor)
  const buttonClickScale = interpolate(
    frame,
    [clickFrame, clickFrame + 4, clickFrame + 12],
    [1, 0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rippleScale = interpolate(
    frame,
    [clickFrame, clickFrame + 30],
    [0.3, 3.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rippleOpacity = interpolate(
    frame,
    [clickFrame, clickFrame + 30],
    [0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Map Card Reveal Spring (Ending card view)
  const mapSpring = spring({
    frame: frame - mapExpandFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 130 },
  });

  return (
    <AbsoluteFill className="bg-white flex flex-col items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden relative">
      
      {/* Audio Effects */}
      {frame === slideStartFrame && <Audio src={SWOOSH_SOUND} volume={0.5} />}
      {frame === clickFrame && <Audio src={MOUSE_CLICK_SOUND} volume={0.85} />}
      {frame === mapExpandFrame && <Audio src={ALERT_PING_SOUND} volume={0.75} />}

      {/* PHASE 1 & 2: PURE WHITE BG + GOOGLE SEARCH-STYLE SLIDE "SOS" + ROUNDED-FULL BUTTON ON RIGHT */}
      {frame < mapExpandFrame + 20 && (
        <div
          style={{
            opacity: interpolate(
              frame,
              [mapExpandFrame, mapExpandFrame + 15],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
          className="w-full max-w-[1200px] flex items-center justify-center relative min-h-[400px]"
        >
          {/* 1. GIANT WORD "SOS" IN SOLID RED (Ultra-smooth slide left) */}
          <div
            style={{
              transform: `translateX(${sosSlideX}px) scale(${sosEntranceSpring})`,
              opacity: sosEntranceSpring,
            }}
            className="flex items-center z-10 transition-transform"
          >
            <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter leading-none select-none font-sans text-[#EA4335]">
              SOS
            </h1>
          </div>

          {/* 2. ROUNDED-FULL SOS ACTION BUTTON (Pops out on the right after slide) */}
          {frame >= slideEndFrame - 8 && (
            <div
              style={{
                position: "absolute",
                right: "140px",
                transform: `scale(${rightButtonSpring * buttonClickScale})`,
                opacity: rightButtonSpring,
              }}
              className="z-20 flex flex-col items-center"
            >
              {/* Click Shockwave Ripple */}
              {isClicked && (
                <div
                  style={{
                    transform: `scale(${rippleScale})`,
                    opacity: rippleOpacity,
                  }}
                  className="absolute inset-0 rounded-full border-4 border-red-500 bg-red-400/25 pointer-events-none"
                />
              )}

              {/* ROUNDED-FULL BUTTON */}
              <button className="bg-[#EA4335] hover:bg-red-600 text-white font-extrabold text-2xl py-6 px-10 rounded-full shadow-[0_15px_45px_rgba(234,67,53,0.35)] flex items-center gap-4 cursor-pointer border border-red-400/30">
                <Bell className="w-8 h-8 fill-white text-[#EA4335]" />
                <span>Need Help</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: ENDING MAP CARD DISPLAY (Google Sans Font, Light MapGL Canvas Style matching /map) */}
      {frame >= mapExpandFrame && (
        <div
          style={{
            transform: `scale(${mapSpring}) translateY(${interpolate(mapSpring, [0, 1], [40, 0])}px)`,
            opacity: mapSpring,
          }}
          className="w-full max-w-[1180px] h-[650px] bg-[#F8FAFC] rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.12)] relative overflow-hidden z-30 flex flex-col font-sans"
        >
          {/* MAPGL VECTOR CANVAS */}
          <div className="w-full flex-1 relative bg-[#F1F5F9] overflow-hidden flex items-center justify-center">
            
            {/* Vector Map Roads & Terrain */}
            <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 1180 650">
              {/* Arterial Roads */}
              <path d="M 0 325 L 1180 325" stroke="#E2E8F0" strokeWidth="50" />
              <path d="M 590 0 L 590 650" stroke="#E2E8F0" strokeWidth="50" />
              <path d="M 150 0 L 1030 650" stroke="#E2E8F0" strokeWidth="30" />
              <path d="M 0 500 L 1180 150" stroke="#E2E8F0" strokeWidth="30" />

              {/* Blue Accessible Route Line */}
              <path
                d="M 200 480 Q 590 325 900 220"
                stroke="#4285F4"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />

              {/* Yellow Center Dividers */}
              <path d="M 0 325 L 1180 325" stroke="#F59E0B" strokeWidth="3" strokeDasharray="16 16" />
              <path d="M 590 0 L 590 650" stroke="#F59E0B" strokeWidth="3" strokeDasharray="16 16" />

              {/* Terrain & Building Blocks */}
              <rect x="100" y="80" width="260" height="180" fill="#E2E8F0" rx="16" stroke="#CBD5E1" strokeWidth="2" />
              <rect x="750" y="80" width="320" height="200" fill="#DCFCE7" rx="16" stroke="#86EFAC" strokeWidth="2" />
              <rect x="120" y="420" width="300" height="180" fill="#E2E8F0" rx="16" stroke="#CBD5E1" strokeWidth="2" />
              <rect x="800" y="400" width="320" height="200" fill="#E2E8F0" rx="16" stroke="#CBD5E1" strokeWidth="2" />
            </svg>

            {/* MAPGL MARKERS */}
            
            {/* Green Accessible Ramp Marker */}
            <div className="absolute top-[68%] left-[24%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">
                🟢
              </div>
              <span className="mt-1 bg-white border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-800 shadow-xs">
                Jl. Ijen Ramp
              </span>
            </div>

            {/* CENTER EMERGENCY SOS PIN DOT */}
            <div className="absolute top-[40%] left-[68%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              
              {/* Pulse Rings */}
              <div className="absolute w-44 h-44 rounded-full border-4 border-red-500/40 bg-red-500/10 animate-ping pointer-events-none" />
              <div className="absolute w-28 h-28 rounded-full border-4 border-red-500 bg-red-500/20 pointer-events-none" />

              {/* Red Pin Dot */}
              <div className="w-16 h-16 rounded-full bg-[#EA4335] border-4 border-white shadow-[0_0_40px_#EA4335] flex items-center justify-center z-10">
                <Bell className="w-8 h-8 fill-white text-[#EA4335]" />
              </div>

              {/* Location Tag */}
              <div className="mt-2.5 bg-white border border-red-200 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 text-gray-900 text-xs font-extrabold shrink-0">
                <MapPin className="w-4 h-4 text-[#EA4335]" />
                <span>Titik Darurat: Jl. Soekarno Hatta, Malang</span>
              </div>
            </div>

            {/* CONVERGING VOLUNTEER RESPONDERS */}
            {[
              { x: "42%", y: "24%", name: "Budi (Volunteer)" },
              { x: "82%", y: "28%", name: "Siti (Volunteer)" },
              { x: "74%", y: "70%", name: "Rian (Volunteer)" },
              { x: "48%", y: "65%", name: "Doni (Volunteer)" },
            ].map((vol, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: vol.x,
                  top: vol.y,
                }}
                className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md z-20"
              >
                <Navigation className="w-3.5 h-3.5 text-white animate-bounce" />
                <span>{vol.name}</span>
              </div>
            ))}

            {/* FLOATING EMERGENCY RADAR STATUS BADGE */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md border border-gray-200 px-5 py-3 rounded-2xl shadow-lg z-30 flex items-center gap-3">
              <Radio className="w-5 h-5 text-[#EA4335] animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-gray-900">
                  SOS Signal Active (8 Responders Alerted)
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">
                  ETA ~2 Mins • Encrypted Channel
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
