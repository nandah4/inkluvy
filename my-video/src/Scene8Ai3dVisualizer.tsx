import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
  Easing,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { SWOOSH_SOUND, ALERT_PING_SOUND } from "./audioEffects";

export const Scene8Ai3dVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (300 Frames = 10 Seconds @ 30 FPS)
  // ----------------------------------------------------
  const swooshSoundFrame = 65;
  const videoTransitionFrame = 80;

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

  // Phase 2 Video Entrance Spring
  const videoEntranceSpring = spring({
    frame: frame - videoTransitionFrame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 140 },
  });

  // Step 5: Video Container Slide Left Exit Animation (Frame 255 - 295)
  const videoSlideOutLeftX = interpolate(
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
      {frame === videoTransitionFrame + 5 && <Audio src={ALERT_PING_SOUND} volume={0.6} />}
      {frame === 255 && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* PHASE 1: MINIMALIST MOTION TITLE (Yellow Squircle Icon -> Rotate -> AI 3D Spatial Visualizer -> Slide Out Left) */}
      {frame < videoTransitionFrame + 18 && (
        <div
          style={{
            transform: `translateX(${slideOutLeftX}px)`,
          }}
          className="flex items-center gap-8 sm:gap-10 z-20"
        >
          {/* 1. Yellow Gradient Squircle Icon (NOT BLUE, YELLOW AS REQUESTED) */}
          <div
            style={{
              transform: `translateX(${iconSlideLeftX}px) scale(${iconEntranceSpring}) rotate(${iconRotateDeg}deg)`,
              opacity: iconEntranceSpring,
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 rounded-[32px] flex items-center justify-center shrink-0 border border-white/60 transition-transform"
          >
            {/* 360 View Icon SVG */}
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-sm transform -rotate-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 7v2" />
              <path d="M12 15v2" />
              <path d="M7 12h2" />
              <path d="M15 12h2" />
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
                AI 3D Spatial Visualizer
              </h1>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: DISPLAY VIDEO FITUR 2.MOV IN SLEEK CONTAINER WITH SLIDE OUT LEFT ANIMATION */}
      {frame >= videoTransitionFrame - 5 && (
        <div
          style={{
            opacity: videoEntranceSpring,
            transform: `translateX(${videoSlideOutLeftX}px) scale(${videoEntranceSpring})`,
          }}
          className="w-full max-w-[1240px] h-[720px] bg-slate-900 rounded-3xl border border-gray-300 overflow-hidden relative flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-amber-400/20 border border-amber-400/40 rounded-lg flex items-center justify-center text-amber-300 text-xs font-bold">
                360°
              </div>
              <span className="font-medium text-lg tracking-tight text-white font-sans">
                Inkluvy AI 3D Spatial Visualizer — Real-Time Obstacle Panorama
              </span>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-medium font-sans">
              ✓ AI Spatial Analysis Active
            </div>
          </div>

          {/* Video Container Area */}
          <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
            <OffthreadVideo
              src={staticFile("videos/fitur 2.mov")}
              className="w-full h-full object-cover"
              muted
            />
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
