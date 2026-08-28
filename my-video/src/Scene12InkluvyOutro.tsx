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

export const Scene12InkluvyOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (240 Frames = 8 Seconds @ 30 FPS)
  // ENTRANCE SEQUENCE:
  // 1. Logo Inkluvy (Frame 6+)
  // 2. Text Inkluvy (Frame 18+)
  // 3. Description (Frame 32+)
  // 4. 2 Phones (Frame 50+)
  //
  // EXIT SEQUENCE (Frame 170 - 225):
  // Light Blue Gradient Curtain slides from Right to Left to fill viewport
  // ----------------------------------------------------
  const logoEntranceFrame = 6;
  const titleEntranceFrame = 18;
  const descEntranceFrame = 32;
  const phonesEntranceFrame = 50;

  const exitStartFrame = 170;
  const exitEndFrame = 225;

  // Entrance Springs
  const logoSpring = spring({
    frame: frame - logoEntranceFrame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 140 },
  });

  const titleSpring = spring({
    frame: frame - titleEntranceFrame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 140 },
  });

  const descSpring = spring({
    frame: frame - descEntranceFrame,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 130 },
  });

  const phonesSpring = spring({
    frame: frame - phonesEntranceFrame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 130 },
  });

  // Smooth floating idle motion for the 2 phones
  const floatY = Math.sin(frame * 0.08) * 5;

  // RIGHT-TO-LEFT GRADIENT CURTAIN SLIDE EXIT (Frame 170 - 225)
  const curtainX = interpolate(
    frame,
    [exitStartFrame, exitEndFrame],
    [1920, -100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-12 font-sans select-none antialiased text-gray-900 overflow-hidden relative">
      
      {/* Audio Triggers */}
      {frame === logoEntranceFrame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === titleEntranceFrame && <Audio src={ALERT_PING_SOUND} volume={0.4} />}
      {frame === phonesEntranceFrame && <Audio src={SWOOSH_SOUND} volume={0.6} />}
      {frame === exitStartFrame && <Audio src={SWOOSH_SOUND} volume={0.7} />}

      <div className="w-full max-w-[1400px] grid grid-cols-12 gap-8 items-center justify-between z-10">
        
        {/* LEFT SIDE: 2 PHONES ALIGNED AT EXACT SAME HEIGHT */}
        <div
          style={{
            opacity: phonesSpring,
            transform: `translateX(${interpolate(phonesSpring, [0, 1], [-80, 0])}px) translateY(${floatY}px) scale(${phonesSpring})`,
          }}
          className="col-span-6 flex items-center justify-start gap-4 sm:gap-6 pl-4 h-[560px]"
        >
          {/* PHONE 1 */}
          <div className="h-[520px] flex items-center justify-center shrink-0">
            <Img
              src={staticFile("images/phone - 1.png")}
              className="h-full w-auto object-contain border-none shadow-none outline-none"
            />
          </div>

          {/* PHONE 2 */}
          <div className="h-[520px] flex items-center justify-center shrink-0">
            <Img
              src={staticFile("images/phone - 2.png")}
              className="h-full w-auto object-contain border-none shadow-none outline-none"
            />
          </div>
        </div>

        {/* RIGHT SIDE: MOTION DESIGN SEQUENCE */}
        <div className="col-span-6 flex flex-col items-start gap-5 pl-4 sm:pl-8 z-20">
          
          {/* STEP 1: Official Inkluvy Logo Image */}
          <div
            style={{
              opacity: logoSpring,
              transform: `scale(${logoSpring}) translateY(${interpolate(logoSpring, [0, 1], [30, 0])}px)`,
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative z-30"
          >
            <Img
              src={staticFile("logo/Logo.png")}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          {/* STEP 2: Brand Name Inkluvy */}
          <div
            style={{
              opacity: titleSpring,
              transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight text-gray-900 font-sans leading-none">
              Inkluvy
            </h1>
          </div>

          {/* STEP 3: Description Text */}
          <div
            style={{
              opacity: descSpring,
              transform: `translateY(${interpolate(descSpring, [0, 1], [30, 0])}px)`,
            }}
          >
            <p className="text-xl sm:text-2xl font-medium text-gray-600 font-sans tracking-tight max-w-lg leading-relaxed">
              Platform Navigasi & Keselamatan Darurat untuk Tuna Daksa di Perkotaan.
            </p>
          </div>

        </div>

      </div>

      {/* GRADIENT TO LIGHT BLUE SLIDE EXIT (Slides from Right to Left to fill viewport) */}
      {frame >= exitStartFrame - 5 && (
        <div
          style={{
            transform: `translateX(${curtainX}px)`,
          }}
          className="absolute inset-y-0 right-0 w-[2400px] flex z-40 pointer-events-none"
        >
          {/* Gradient Leading Edge (Transparent -> Light Blue) */}
          <div className="w-[600px] h-full bg-gradient-to-r from-transparent via-sky-300 to-sky-400 shrink-0" />
          {/* Solid Light Blue Curtain Fill */}
          <div className="flex-1 h-full bg-sky-400" />
        </div>
      )}

    </AbsoluteFill>
  );
};
