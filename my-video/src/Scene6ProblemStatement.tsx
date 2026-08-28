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

export const Scene6ProblemStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. CAMERA HORIZONTAL TRACKING PAN (360 Frames Total @ 30 FPS = 12 Seconds)
  // ----------------------------------------------------
  const swooshSoundFrame = 8;
  const cameraPanStart = 15;
  const cameraPanEnd = 340; // 325 frames ultra-slow glide (10.8s pan)

  // Butter-smooth, linear-friction camera glide (Zero stuttering, 100% fluid)
  const cameraPanX = interpolate(
    frame,
    [cameraPanStart, cameraPanEnd],
    [1420, -1440],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0), // Standard smooth cubic-bezier curve
    }
  );

  // ----------------------------------------------------
  // 2. TEXT ENTRANCE SPRING (Loaded cleanly from start)
  // ----------------------------------------------------
  const textEntranceSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 160 },
  });

  return (
    <AbsoluteFill className="bg-[#FFFFFF] flex flex-col items-center justify-center p-8 sm:p-12 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Swoosh Sound Effect Trigger */}
      {frame === swooshSoundFrame && <Audio src={SWOOSH_SOUND} volume={0.5} />}

      {/* GPU Accelerated Smooth Camera Tracking Container */}
      <div
        style={{
          transform: `translate3d(${cameraPanX}px, 0px, 0px)`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="w-full flex items-center justify-center"
      >
        {/* SINGLE HORIZONTAL LINE OF TEXT (Fully loaded & ready as camera pans) */}
        <div
          style={{
            opacity: textEntranceSpring,
            transform: `translateY(${interpolate(textEntranceSpring, [0, 1], [20, 0])}px)`,
          }}
          className="flex items-center gap-6 sm:gap-8 whitespace-nowrap text-6xl sm:text-7xl md:text-8xl font-semibold text-gray-900 tracking-tight shrink-0 px-12"
        >
          <span>Cracked sidewalks.</span>
          <span>No ramps.</span>
          <span>No warning —</span>
          <span>for wheelchair users,</span>
          <span>every road is a gamble.</span>
          <span>Until now.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
