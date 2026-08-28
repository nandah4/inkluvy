import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { SWOOSH_SOUND, ALERT_PING_SOUND } from "./audioEffects";

export const Scene7AccessibilityTransport: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (240 Frames = 8 Seconds @ 30 FPS)
  // ----------------------------------------------------
  const swooshSoundFrame = 65;
  const mapTransitionFrame = 80;

  // Infinity Looping Pulse Animations for Live Map Markers
  const sosPulseY = Math.sin(frame * 0.18) * 4;
  const sosScale = 1 + Math.sin(frame * 0.18) * 0.04;

  const hazardPulseY = Math.cos(frame * 0.15) * 3;
  const hazardScale = 1 + Math.cos(frame * 0.15) * 0.03;

  const tactilePulseY = Math.sin(frame * 0.2) * 3;

  // Step 1: Icon Center Entrance Spring (Frame 4+)
  const iconEntranceSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 140 },
  });

  // Step 2: Icon Ultra-Smooth Slide Left (Frame 14 - 44)
  const iconSlideLeftX = interpolate(
    frame,
    [14, 44],
    [180, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Step 2b: Icon Soft Rotation to Right (Frame 18 - 45)
  const iconRotateDeg = interpolate(
    frame,
    [18, 45],
    [0, 15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Step 3: Feature Name Smooth Unfold & Slide Right (Frame 24+)
  const textEntranceSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 130 },
  });

  // Step 4: Ultra-Smooth Slide Left Exit Animation for Icon + Text (Frame 65 - 100)
  const slideOutLeftX = interpolate(
    frame,
    [65, 100],
    [0, -1800],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Phase 2 Map Entrance Spring
  const mapEntranceSpring = spring({
    frame: frame - mapTransitionFrame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 140 },
  });

  // Sidebar Entrance Spring
  const sidebarSpring = spring({
    frame: frame - (mapTransitionFrame + 15),
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // Map Route Draw Progress
  const routeDrawProgress = interpolate(
    frame,
    [mapTransitionFrame + 10, mapTransitionFrame + 80],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  // Step 5: Map Slide Left Exit Animation (Frame 255 - 295)
  const mapSlideOutLeftX = interpolate(
    frame,
    [255, 295],
    [0, -2000],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Audio Triggers */}
      {frame === swooshSoundFrame && <Audio src={SWOOSH_SOUND} volume={0.6} />}
      {frame === mapTransitionFrame + 5 && <Audio src={ALERT_PING_SOUND} volume={0.6} />}
      {frame === 255 && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* PHASE 1: MINIMALIST MOTION TITLE (Icon -> Rotate -> Text -> Slide Out Left) */}
      {frame < mapTransitionFrame + 18 && (
        <div
          style={{
            transform: `translateX(${slideOutLeftX}px)`,
          }}
          className="flex items-center gap-8 sm:gap-10 z-20"
        >
          {/* 1. Squircle Gradient Icon */}
          <div
            style={{
              transform: `translateX(${iconSlideLeftX}px) scale(${iconEntranceSpring}) rotate(${iconRotateDeg}deg)`,
              opacity: iconEntranceSpring,
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-sky-200 via-blue-300 to-sky-400 rounded-[32px] flex items-center justify-center shrink-0 border border-white/60 transition-transform"
          >
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-sm transform -rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M12 3L2 21l10-4 10 4L12 3z"
              />
            </svg>
          </div>

          {/* 2. Feature Name in Google Sans Font-Medium */}
          {frame >= 22 && (
            <div
              style={{
                opacity: textEntranceSpring,
                transform: `translateX(${interpolate(textEntranceSpring, [0, 1], [-40, 0])}px)`,
              }}
              className="flex flex-col gap-1"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gray-900 font-sans leading-tight whitespace-nowrap">
                Accessibility Map & Transportation
              </h1>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: EXACT INKLUVY MAPGL UI WITH MAP SLIDE OUT LEFT ANIMATION */}
      {frame >= mapTransitionFrame - 5 && (
        <div
          style={{
            opacity: mapEntranceSpring,
            transform: `translateX(${mapSlideOutLeftX}px) scale(${mapEntranceSpring})`,
          }}
          className="w-full max-w-[1240px] h-[720px] bg-[#EAECEE] rounded-3xl border border-gray-300 overflow-hidden relative flex flex-col z-10"
        >
          {/* 1. TOP CONTROL BAR */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
            {/* Top Left Pills */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 font-bold">
                ←
              </button>
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-2 text-xs font-semibold text-gray-800">
                <span>📋 Hide Panel</span>
              </div>
              <div className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                ⓘ
              </div>
              <div className="bg-emerald-50/90 backdrop-blur-md border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Sync</span>
              </div>
            </div>

            {/* Top Right Emergency SOS Button (Lucide Bell/Siren Icon) */}
            <div className="bg-[#EF4444] text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-red-400 flex items-center gap-2 pointer-events-auto">
              <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span>Emergency SOS</span>
            </div>
          </div>

          {/* 2. MAP CANVAS AREA WITH PUBLIC/VIDEOS/MAPS.PNG BACKGROUND */}
          <div className="relative flex-1 bg-[#EBEFEF] overflow-hidden">
            {/* Real Map Background Image */}
            <Img
              src={staticFile("videos/maps.png")}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* SVG OVERLAY FOR ROUTE LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" fill="none">
              {/* Blue Safe Route Line */}
              <path
                d="M 440 120 L 550 250"
                stroke="#3B82F6"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="500"
                strokeDashoffset={500 - (routeDrawProgress / 100) * 500}
              />
              {/* Orange Hazard Line */}
              <path
                d="M 550 250 L 650 360"
                stroke="#F97316"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="500"
                strokeDashoffset={500 - (routeDrawProgress / 100) * 500}
              />
              {/* Yellow Caution Line */}
              <path
                d="M 650 360 L 740 540"
                stroke="#EAB308"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="500"
                strokeDashoffset={500 - (routeDrawProgress / 100) * 500}
              />
            </svg>

            {/* MAP PIN MARKERS WITH INFINITY BOUNCE/PULSE ANIMATION */}
            
            {/* Pin 1: Jl. Ijen Boulevard Ramp */}
            <div className="absolute top-[105px] left-[420px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full z-20">
              <span className="text-blue-500 text-xs">📍</span>
              <span className="text-xs font-semibold text-gray-800">Jl. Ijen Boulevard Ramp</span>
            </div>

            {/* Pin 2: Open Cable Trench and Collapsed Sidewalk (Orange Badge with Infinity Float) */}
            <div
              style={{
                transform: `translate(-50%, -50%) translateY(${hazardPulseY}px) scale(${hazardScale})`,
              }}
              className="absolute top-[230px] left-[550px] flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-3.5 py-1.5 rounded-full border border-white/40 z-20 transition-transform"
            >
              <span className="text-xs">🛡️</span>
              <span className="text-xs font-semibold">Open Cable Trench and Collapsed Sidewalk</span>
            </div>

            {/* Pin 3: [SOS] Wheelchair Assistance Needed (Red Badge with Infinity Bounce & Pulse) */}
            <div
              style={{
                transform: `translate(-50%, -50%) translateY(${sosPulseY}px) scale(${sosScale})`,
              }}
              className="absolute top-[285px] left-[580px] flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3.5 py-1.5 rounded-full border border-white/40 z-20 transition-transform"
            >
              <span className="text-xs">🚨</span>
              <span className="text-xs font-semibold">[SOS] Wheelchair Assistance Needed</span>
            </div>

            {/* Pin 4: Museum Brawijaya Entrance */}
            <div className="absolute top-[375px] left-[650px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full z-20">
              <span className="text-blue-500 text-xs">📍</span>
              <span className="text-xs font-semibold text-gray-800">Museum Brawijaya Entrance</span>
            </div>

            {/* Pin 5: Worn Tactile Paving near Pasar Besar (Yellow Pill with Soft Pulse) */}
            <div
              style={{
                transform: `translate(-50%, -50%) translateY(${tactilePulseY}px)`,
              }}
              className="absolute top-[520px] left-[840px] flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1 rounded-full z-20 transition-transform"
            >
              <span className="text-amber-600 text-xs">⚠️</span>
              <span className="text-xs font-semibold">Worn Tactile Paving near Pasar Besar</span>
            </div>

            {/* 3. LEFT SIDEBAR PANEL WITH OFFICIAL INKLUVY LOGO & OVERFLOW CONTENT */}
            <div
              style={{
                transform: `translateX(${interpolate(sidebarSpring, [0, 1], [-350, 0])}px)`,
                opacity: sidebarSpring,
              }}
              className="absolute top-16 left-4 bottom-14 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 p-4 flex flex-col gap-3 z-30"
            >
              {/* Header with Official Inkluvy Droplet Logo */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  {/* Official Inkluvy Blue Droplet Logo Icon */}
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0 border border-blue-400/30">
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 100 130">
                      <path d="M50 5 C25 5 5 35 5 70 C5 100 25 125 50 125 C75 125 95 100 95 70 C95 35 75 5 50 5 Z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-bold text-gray-900 font-sans tracking-tight">
                    Route Planner & Conditions
                  </h2>
                </div>
                <button className="text-gray-400 hover:text-gray-600 text-xs font-bold">
                  🗖
                </button>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-xs font-medium text-gray-600">
                <div className="text-center py-1.5 rounded-lg">Route</div>
                <div className="bg-white text-gray-900 font-bold text-center py-1.5 rounded-lg border border-gray-200">
                  Transportation
                </div>
                <div className="text-center py-1.5 rounded-lg">Facilities</div>
              </div>

              {/* Action Button */}
              <div className="bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-xl text-center">
                + Report Route Condition
              </div>

              {/* OVERFLOW CONTENT CONTAINER (Inside Card Scroll) */}
              <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 max-h-[380px]">
                {/* 1. Sidebar Accessible Transport Card (from /map) */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xl shrink-0">
                      🚌
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-gray-900">Trans Malang Low-Floor Bus</h3>
                      <p className="text-[10px] text-blue-700 font-medium">Armada Ramp Lipat & Area Kursi Roda</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-white border border-emerald-200 px-2 py-1 rounded-md w-fit">
                    <span>✓ Low-Floor Accessible Bus</span>
                  </div>
                </div>

                {/* 2. Condition Card 1 */}
                <div className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-1.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">
                      Open Cable Trench & Collapsed Sidewalk
                    </span>
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                      Severe Hazard
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    Unprotected cable trench cuts across main sidewalk. High risk for wheelchair users.
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5">
                    <span>👤 Dimas Anggara ✓</span>
                    <span>10 mins ago</span>
                  </div>
                </div>

                {/* 3. Condition Card 2 */}
                <div className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-1.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">
                      [SOS] Wheelchair Assistance Needed
                    </span>
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                      Caution / Vulnerable
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    Wheelchair user stuck at high curb due to sidewalk excavation. Requests manual lift support.
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5">
                    <span>👤 Budi Handoko (Wheelchair) ✓</span>
                    <span>2 mins ago</span>
                  </div>
                </div>

                {/* 4. Condition Card 3 */}
                <div className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-1.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-900">
                      [SOS] Blind Guide Companion Requested
                    </span>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                      Caution / Vulnerable
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    Lost access to tactile path due to sudden construction obstruction near terminal.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. BOTTOM FILTER BAR MATCHING SCREENSHOT (STRICTLY 1-LINE TEXT NO WRAP) */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md border border-gray-200 px-4 py-2 rounded-2xl z-30 flex items-center gap-2 text-xs font-semibold text-gray-700 whitespace-nowrap overflow-x-auto max-w-[90%]">
              <span className="bg-slate-900 text-white px-3 py-1 rounded-xl font-bold shrink-0">All</span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl border border-emerald-200 whitespace-nowrap shrink-0">
                ✓ Accessible & Safe
              </span>
              <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-xl border border-amber-200 whitespace-nowrap shrink-0">
                🛡️ Caution / Vulnerable
              </span>
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-xl border border-orange-200 whitespace-nowrap shrink-0">
                ⚠️ Severe Hazard
              </span>
              <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-xl border border-rose-200 whitespace-nowrap shrink-0">
                🚨 Emergency SOS
              </span>
            </div>

          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
