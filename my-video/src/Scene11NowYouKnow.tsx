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

export const Scene11NowYouKnow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (240 Frames = 8 Seconds @ 30 FPS)
  // ----------------------------------------------------
  const smilePopFrame = 6;
  const smileDisappearStart = 48;
  const smileDisappearEnd = 65;
  
  const textEntranceFrame = 60;
  const slideOutRightStart = 180;
  const slideOutRightEnd = 225;

  // 1. Smile Emoji Pop Spring
  const smileSpring = spring({
    frame: frame - smilePopFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  // Smile Disappear (Shrink & Fade out)
  const smileOpacity = interpolate(
    frame,
    [smileDisappearStart, smileDisappearEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const smileScale = interpolate(
    frame,
    [smileDisappearStart, smileDisappearEnd],
    [1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 2. Text Entrance Spring
  const textSpring = spring({
    frame: frame - textEntranceFrame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 130 },
  });

  // 3. Text Slide to the Right Exit Motion
  const slideOutRightX = interpolate(
    frame,
    [slideOutRightStart, slideOutRightEnd],
    [0, 2000],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Audio Triggers */}
      {frame === smilePopFrame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === textEntranceFrame && <Audio src={ALERT_PING_SOUND} volume={0.6} />}
      {frame === slideOutRightStart && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* PHASE 1: SMILE EMOJI (Pops in center -> Dissolves) */}
      {frame < smileDisappearEnd + 5 && (
        <div
          style={{
            transform: `scale(${smileSpring * smileScale})`,
            opacity: smileSpring * smileOpacity,
          }}
          className="flex items-center justify-center z-20"
        >
          {/* Friendly Large Smile Emoji Face (No yellow background, large font) */}
          <span className="text-[150px] sm:text-[200px] md:text-[240px] leading-none select-none drop-shadow-sm">
            😊
          </span>
        </div>
      )}

      {/* PHASE 2: TEXT "Now you know how we help you" (Unfolds -> Slides Out to Right) */}
      {frame >= textEntranceFrame - 5 && (
        <div
          style={{
            transform: `translateX(${slideOutRightX}px)`,
          }}
          className="flex items-center justify-center z-10"
        >
          <div
            style={{
              opacity: textSpring,
              transform: `scale(${textSpring}) translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-gray-900 font-sans leading-tight whitespace-nowrap">
              Now you know how we help you
            </h1>
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
