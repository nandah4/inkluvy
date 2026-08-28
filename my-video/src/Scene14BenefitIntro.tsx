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

export const Scene14BenefitIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (210 Frames = 7 Seconds @ 30 FPS)
  // Phase 1: Question Text "So what will you get?" (Frames 0 - 75)
  // Phase 2: confusing.png Image Entrance & Sinking (Frames 75 - 210)
  // ----------------------------------------------------
  const textEntranceFrame = 6;
  const textExitFrame = 48;
  
  const imageEntranceFrame = 72;
  const fastExitStartFrame = 165;
  const fastExitEndFrame = 185;

  // 1. Text Spring Entrance
  const textSpring = spring({
    frame: frame - textEntranceFrame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 140 },
  });

  // Text Exit (Slide Left & Fade Out completely)
  const textExitX = interpolate(
    frame,
    [textExitFrame, textExitFrame + 20],
    [0, -800],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const textExitOpacity = interpolate(
    frame,
    [textExitFrame, textExitFrame + 18],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 2. Image Entrance Spring
  const imageSpring = spring({
    frame: frame - imageEntranceFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 130 },
  });

  // 3. Infinity Left-Right Rocking/Rotate Animation
  const infinityRotate = Math.sin(frame * 0.12) * 3.5;

  // 4. Fast Exit Motion ("keluar cepat")
  const fastExitY = interpolate(
    frame,
    [fastExitStartFrame, fastExitEndFrame],
    [0, 1400],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    }
  );

  const fastExitOpacity = interpolate(
    frame,
    [fastExitStartFrame, fastExitStartFrame + 16],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fastExitScale = interpolate(
    frame,
    [fastExitStartFrame, fastExitEndFrame],
    [1, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden relative">
      
      {/* Audio Triggers */}
      {frame === textEntranceFrame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === textExitFrame && <Audio src={SWOOSH_SOUND} volume={0.6} />}
      {frame === imageEntranceFrame && <Audio src={SWOOSH_SOUND} volume={0.6} />}
      {frame === fastExitStartFrame && <Audio src={SWOOSH_SOUND} volume={0.7} />}

      {/* PHASE 1: QUESTION TEXT "So what will you get?" (Disappears completely BEFORE Phase 2) */}
      {frame < 70 && (
        <div
          style={{
            transform: `translateX(${textExitX}px)`,
            opacity: textExitOpacity,
          }}
          className="flex items-center justify-center z-20"
        >
          <div
            style={{
              opacity: textSpring,
              transform: `scale(${textSpring}) translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-gray-900 font-sans leading-tight whitespace-nowrap">
              So what will you get?
            </h1>
          </div>
        </div>
      )}

      {/* PHASE 2: IMAGE confusing.png (INFINITY ROTATE + FAST EXIT DROP) */}
      {frame >= imageEntranceFrame - 2 && (
        <div
          style={{
            opacity: imageSpring * fastExitOpacity,
            transform: `translateY(${interpolate(imageSpring, [0, 1], [80, 0]) + fastExitY}px) scale(${imageSpring * fastExitScale}) rotate(${infinityRotate}deg)`,
          }}
          className="flex items-center justify-center z-10"
        >
          {/* Direct Image without black container bg */}
          <Img
            src={staticFile("images/confusing.png")}
            className="w-[1020px] max-h-[620px] object-contain border-none shadow-none outline-none rounded-3xl"
          />
        </div>
      )}

    </AbsoluteFill>
  );
};
