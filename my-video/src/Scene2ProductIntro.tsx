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
import { SWOOSH_SOUND } from "./audioEffects";

export const Scene2ProductIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. CAMERA HORIZONTAL TRACKING PAN (150 Frames Total @ 30 FPS)
  // ----------------------------------------------------
  const swooshSoundFrame = 12;
  const cameraPanStart = 15;
  const cameraPanEnd = 90;

  // Camera pans horizontally to the right across the single long line of text
  // Start X position focused on left ("Every road hides a risk"), ends on right ("you can't see. Until now.")
  const cameraPanX = interpolate(
    frame,
    [cameraPanStart, cameraPanEnd],
    [520, -560], // Horizontal tracking pan
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  // Subtle camera tracking zoom/scale during pan
  const cameraScale = interpolate(
    frame,
    [0, cameraPanStart, cameraPanEnd, 120],
    [1.05, 1.0, 1.0, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ----------------------------------------------------
  // 2. STAGGERED WORD POP-IN SPRINGS
  // ----------------------------------------------------

  // "Every road hides a risk" (Frame 8+)
  const group1Spring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // "you can't see." (Frame 30+)
  const group2Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // "Until now." (Frame 55+) - Same consistent style as rest of text
  const group3Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  return (
    <AbsoluteFill className="bg-[#FFFFFF] flex flex-col items-center justify-center p-8 sm:p-12 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Swoosh Sound Effect Trigger */}
      {frame === swooshSoundFrame && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* Camera Horizontal Tracking Container */}
      <div
        style={{
          transform: `translateX(${cameraPanX}px) scale(${cameraScale})`,
        }}
        className="w-full flex items-center justify-center transition-transform"
      >
        {/* SINGLE HORIZONTAL LINE OF TEXT (No line breaks, right side cut off initially) */}
        <div className="flex items-center gap-5 sm:gap-7 whitespace-nowrap text-6xl sm:text-7xl md:text-8xl font-semibold text-gray-900 tracking-tight shrink-0 px-12">
          
          {/* Group 1: "Every road hides a risk" */}
          <div
            style={{
              opacity: group1Spring,
              transform: `translateY(${interpolate(group1Spring, [0, 1], [25, 0])}px)`,
            }}
            className="flex items-center gap-5 text-gray-900 shrink-0"
          >
            <span>Every</span>
            <span>road</span>
            <span>hides</span>
            <span>a</span>
            <span>risk</span>
          </div>

          {/* Group 2: "you can't see." */}
          <div
            style={{
              opacity: group2Spring,
              transform: `translateY(${interpolate(group2Spring, [0, 1], [25, 0])}px)`,
            }}
            className="flex items-center gap-5 text-gray-900 shrink-0"
          >
            <span>you</span>
            <span>can't</span>
            <span>see.</span>
          </div>

          {/* Group 3: "Until now." (Same consistent gray-900 semibold style) */}
          <div
            style={{
              opacity: group3Spring,
              transform: `translateY(${interpolate(group3Spring, [0, 1], [25, 0])}px)`,
            }}
            className="flex items-center gap-5 text-gray-900 shrink-0"
          >
            <span>Until</span>
            <span>now.</span>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
