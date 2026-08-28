import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
} from "remotion";
import {
  LuEye,
  LuShieldAlert,
  LuUsers,
  LuSiren,
} from "react-icons/lu";
import { ALERT_PING_SOUND } from "./audioEffects";

export const Scene15BenefitsGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (240 Frames = 8 Seconds @ 30 FPS)
  // Direct sequential pop-in for all 4 benefit points
  // ----------------------------------------------------
  const p1Frame = 8;
  const p2Frame = 28;
  const p3Frame = 48;
  const p4Frame = 68;

  const p1Spring = spring({
    frame: frame - p1Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  const p2Spring = spring({
    frame: frame - p2Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  const p3Spring = spring({
    frame: frame - p3Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  const p4Spring = spring({
    frame: frame - p4Frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-12 font-sans select-none antialiased text-gray-900 overflow-hidden relative">
      
      {/* Audio Triggers */}
      {frame === p1Frame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === p2Frame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === p3Frame && <Audio src={ALERT_PING_SOUND} volume={0.5} />}
      {frame === p4Frame && <Audio src={ALERT_PING_SOUND} volume={0.6} />}

      {/* 4 BENEFIT POINTS IN 2x2 GRID WITH LARGER X & Y SPACING */}
      <div className="w-full max-w-[1450px] grid grid-cols-2 gap-x-20 gap-y-16 sm:gap-x-24 sm:gap-y-20 items-center justify-center z-10 px-8">
        
        {/* POINT 1 (Top-Left) */}
        <div
          style={{
            opacity: p1Spring,
            transform: `scale(${p1Spring}) translateY(${interpolate(p1Spring, [0, 1], [30, 0])}px)`,
          }}
          className="flex items-center gap-7 sm:gap-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-blue-100/90 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/50">
            <LuEye className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight leading-tight max-w-[480px]">
            Tidak perlu menebak apa yang ada di depan.
          </p>
        </div>

        {/* POINT 2 (Top-Right) */}
        <div
          style={{
            opacity: p2Spring,
            transform: `scale(${p2Spring}) translateY(${interpolate(p2Spring, [0, 1], [30, 0])}px)`,
          }}
          className="flex items-center gap-7 sm:gap-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/50">
            <LuShieldAlert className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight leading-tight max-w-[480px]">
            Tidak ada lagi kejutan di jalan.
          </p>
        </div>

        {/* POINT 3 (Bottom-Left) */}
        <div
          style={{
            opacity: p3Spring,
            transform: `scale(${p3Spring}) translateY(${interpolate(p3Spring, [0, 1], [30, 0])}px)`,
          }}
          className="flex items-center gap-7 sm:gap-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-purple-100/90 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/50">
            <LuUsers className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight leading-tight max-w-[480px]">
            Tidak perlu mencari tahu sendirian.
          </p>
        </div>

        {/* POINT 4 (Bottom-Right) */}
        <div
          style={{
            opacity: p4Spring,
            transform: `scale(${p4Spring}) translateY(${interpolate(p4Spring, [0, 1], [30, 0])}px)`,
          }}
          className="flex items-center gap-7 sm:gap-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-rose-100/90 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/50">
            <LuSiren className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-sans tracking-tight leading-tight max-w-[480px]">
            Tidak perlu menunggu saat bantuan tak bisa ditunda.
          </p>
        </div>

      </div>

    </AbsoluteFill>
  );
};
