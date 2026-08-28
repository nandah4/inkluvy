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
import { SWOOSH_SOUND, ALERT_PING_SOUND } from "./audioEffects";

export const Scene13FinalOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. CAMERA HORIZONTAL TRACKING PAN (150 Frames = 5 Seconds @ 30 FPS)
  // ----------------------------------------------------
  const cameraPanStart = 15;
  const cameraPanEnd = 100;

  // Camera pans horizontally from left ("Inclusive.") to right ("Connected.")
  const cameraPanX = interpolate(
    frame,
    [cameraPanStart, cameraPanEnd],
    [320, -320],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  // Subtle camera tracking zoom/scale during pan
  const cameraScale = interpolate(
    frame,
    [0, cameraPanStart, cameraPanEnd, 140],
    [1.05, 1.0, 1.0, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ----------------------------------------------------
  // 2. STAGGERED WORD POP-IN SPRINGS (Scene 2 Style)
  // ----------------------------------------------------
  const word1Frame = 10;
  const word2Frame = 32;
  const word3Frame = 54;

  // "Inclusive." (Frame 10+)
  const word1Spring = spring({
    frame: frame - word1Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // "Safe." (Frame 32+)
  const word2Spring = spring({
    frame: frame - word2Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // "Connected." (Frame 54+)
  const word3Spring = spring({
    frame: frame - word3Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  return (
    <AbsoluteFill className="bg-sky-400 flex items-center justify-center p-8 font-sans select-none antialiased text-white overflow-hidden">
      
      {/* Audio Triggers */}
      {frame === word1Frame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === word2Frame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === word3Frame && <Audio src={ALERT_PING_SOUND} volume={0.6} />}
      {frame === cameraPanStart && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* CAMERA PANNING WRAPPER (Scene 2 Style) */}
      <div
        style={{
          transform: `translateX(${cameraPanX}px) scale(${cameraScale})`,
        }}
        className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 whitespace-nowrap z-10"
      >
        {/* WORD 1: Inclusive. */}
        <span
          style={{
            opacity: word1Spring,
            transform: `scale(${word1Spring}) translateY(${interpolate(word1Spring, [0, 1], [30, 0])}px)`,
          }}
          className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-white font-sans leading-none"
        >
          Inclusive.
        </span>

        {/* WORD 2: Safe. */}
        <span
          style={{
            opacity: word2Spring,
            transform: `scale(${word2Spring}) translateY(${interpolate(word2Spring, [0, 1], [30, 0])}px)`,
          }}
          className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-white/95 font-sans leading-none"
        >
          Safe.
        </span>

        {/* WORD 3: Connected. */}
        <span
          style={{
            opacity: word3Spring,
            transform: `scale(${word3Spring}) translateY(${interpolate(word3Spring, [0, 1], [30, 0])}px)`,
          }}
          className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-white font-sans leading-none"
        >
          Connected.
        </span>
      </div>

    </AbsoluteFill>
  );
};
