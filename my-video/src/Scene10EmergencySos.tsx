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
  LuSiren,
  LuShieldAlert,
  LuShieldCheck,
  LuMapPin,
  LuClock,
} from "react-icons/lu";
import { SWOOSH_SOUND, ALERT_PING_SOUND } from "./audioEffects";

export const Scene10EmergencySos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (300 Frames = 10 Seconds @ 30 FPS)
  // ----------------------------------------------------
  const swooshSoundFrame = 65;
  const buttonEntranceFrame = 80;
  const clickFrame = 125;
  const dispatchTransitionFrame = 145;

  // Step 1: Title Icon Center Entrance Spring (Frame 4+)
  const iconEntranceSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 140 },
  });

  // Step 2: Title Icon Ultra-Smooth Slide Left (Frame 14 - 44)
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

  // Step 2b: Title Icon Soft Rotation to Right (Frame 18 - 45)
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

  // Step 4: Title Slide Left Exit Animation (Frame 65 - 100)
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

  // Phase 2 Red SOS Button Entrance Spring
  const buttonEntranceSpring = spring({
    frame: frame - buttonEntranceFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // Button Click Press Effect (Frame 125)
  const buttonClickScale = interpolate(
    frame,
    [clickFrame - 3, clickFrame, clickFrame + 5],
    [1, 0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Cursor Click Pointer Animation
  const cursorX = interpolate(
    frame,
    [buttonEntranceFrame + 15, clickFrame, clickFrame + 15],
    [400, 0, -100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );
  const cursorY = interpolate(
    frame,
    [buttonEntranceFrame + 15, clickFrame, clickFrame + 15],
    [200, 0, -100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // Phase 2 Button Slide Out Left to Dispatch UI (Frame 135 - 160)
  const buttonSlideOutX = interpolate(
    frame,
    [135, 160],
    [0, -1800],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  // Phase 3 Dispatch UI Entrance Spring (Frame 145+)
  const dispatchEntranceSpring = spring({
    frame: frame - dispatchTransitionFrame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 140 },
  });

  // Step 5: Dispatch UI Slide Left Exit Animation (Frame 255 - 295)
  const dispatchSlideOutLeftX = interpolate(
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
      {frame === clickFrame && <Audio src={ALERT_PING_SOUND} volume={0.7} />}
      {frame === 135 && <Audio src={SWOOSH_SOUND} volume={0.6} />}
      {frame === 255 && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* PHASE 1: MINIMALIST MOTION TITLE (RED Squircle Icon -> Emergency SOS -> Slide Out Left) */}
      {frame < buttonEntranceFrame + 18 && (
        <div
          style={{
            transform: `translateX(${slideOutLeftX}px)`,
          }}
          className="flex items-center gap-8 sm:gap-10 z-20"
        >
          {/* 1. Red Gradient Squircle Icon */}
          <div
            style={{
              transform: `translateX(${iconSlideLeftX}px) scale(${iconEntranceSpring}) rotate(${iconRotateDeg}deg)`,
              opacity: iconEntranceSpring,
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-rose-400 via-red-500 to-rose-600 rounded-[32px] flex items-center justify-center shrink-0 border border-white/60 transition-transform"
          >
            <LuSiren className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-sm transform -rotate-6" />
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
                Emergency SOS
              </h1>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: RED EMERGENCY SOS "HELP ME" BUTTON WITH CLICK ANIMATION */}
      {frame >= buttonEntranceFrame - 5 && frame < dispatchTransitionFrame + 25 && (
        <div
          style={{
            transform: `translateX(${buttonSlideOutX}px) scale(${buttonEntranceSpring * buttonClickScale})`,
            opacity: buttonEntranceSpring,
          }}
          className="relative z-30 flex flex-col items-center gap-6"
        >
          {/* Capsule Pill Button (Icon - Text 'Help Me', rounded-full, shadow-none, larger padding-y) */}
          <div className="px-12 py-7 rounded-full bg-[#EF5350] text-white flex items-center gap-4.5 relative cursor-pointer shadow-none border border-red-300/40">
            {/* White Lifebuoy Icon */}
            <svg
              className="w-10 h-10 text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
              <path d="m14.83 14.83 4.24 4.24" />
              <path d="m9.17 14.83-4.24 4.24" />
            </svg>

            {/* Help Me Text */}
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans whitespace-nowrap">
              Help Me
            </span>
          </div>

          {/* Animated Cursor Arrow Clicking Button */}
          {frame >= buttonEntranceFrame + 15 && frame <= clickFrame + 15 && (
            <div
              style={{
                transform: `translate(${cursorX}px, ${cursorY}px)`,
              }}
              className="absolute top-1/2 left-1/2 z-40 pointer-events-none"
            >
              <svg className="w-10 h-10 text-gray-900 fill-current drop-shadow-md" viewBox="0 0 24 24">
                <path d="M4.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L4.5 3.5Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: EMERGENCY SOS DISPATCH DASHBOARD UI (MATCHING USER SCREENSHOT) */}
      {frame >= dispatchTransitionFrame - 5 && (
        <div
          style={{
            opacity: dispatchEntranceSpring,
            transform: `translateX(${dispatchSlideOutLeftX}px) scale(${dispatchEntranceSpring})`,
          }}
          className="w-full max-w-[1240px] bg-white rounded-3xl border border-gray-200 p-8 flex flex-col gap-8 z-10"
        >
          {/* Header Bar matching Screenshot */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-red-600 flex items-center justify-center shrink-0">
                  <LuShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-sans tracking-tight">
                  Emergency SOS Dispatch
                </h2>
              </div>
              <p className="text-sm font-normal text-gray-500 font-sans pl-13">
                Monitor active emergency requests and direct navigation guides to support citizens in distress.
              </p>
            </div>

            {/* Top Right Active City Pill */}
            <div className="bg-gray-100/80 border border-gray-200/90 text-gray-800 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2">
              <LuMapPin className="w-4 h-4 text-gray-600" /> Active City: Malang
            </div>
          </div>

          {/* Navigation Tabs matching Screenshot */}
          <div className="flex items-center gap-8 border-b border-gray-200 text-sm font-semibold">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-red-500 text-red-600 font-bold">
              <LuShieldAlert className="w-4 h-4" /> Active SOS Alerts
            </div>
            <div className="flex items-center gap-2 pb-3 text-gray-500 hover:text-gray-800">
              <LuShieldCheck className="w-4 h-4" /> Resolved / Completed
            </div>
          </div>

          {/* Active SOS Requests List matching Screenshot */}
          <div className="flex flex-col gap-4">
            
            {/* SOS Request 1: Wheelchair Lift Support Needed */}
            <div className="bg-slate-50/60 border border-gray-200/80 rounded-2xl p-5 flex items-center justify-between transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-rose-100/80 border border-rose-200 text-red-600 flex items-center justify-center shrink-0">
                  <LuShieldAlert className="w-5 h-5" />
                </div>
                <span className="font-bold text-base text-gray-900 font-sans">
                  Active SOS Request: Wheelchair Lift Support Needed
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <LuClock className="w-4 h-4" /> Just Now
              </div>
            </div>

            {/* SOS Request 2: Guide Companion Requested */}
            <div className="bg-slate-50/60 border border-gray-200/80 rounded-2xl p-5 flex items-center justify-between transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-rose-100/80 border border-rose-200 text-red-600 flex items-center justify-center shrink-0">
                  <LuShieldAlert className="w-5 h-5" />
                </div>
                <span className="font-bold text-base text-gray-900 font-sans">
                  Active SOS Request: Guide Companion Requested
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <LuClock className="w-4 h-4" /> 5 Minutes Ago
              </div>
            </div>

          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
