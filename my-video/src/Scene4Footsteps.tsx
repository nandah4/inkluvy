import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import {
  STEP_SOUND_LEFT,
  STEP_SOUND_RIGHT,
  SWOOSH_SOUND,
} from "./audioEffects";

// Component for a single Inkluvy Footprint Shape (Left or Right)
const InkluvyFootprint: React.FC<{
  type: "left" | "right";
  scale: number;
  opacity: number;
  color?: string;
}> = ({ type, scale, opacity, color = "#4285F4" }) => {
  const isLeft = type === "left";
  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${isLeft ? "-15deg" : "15deg"})`,
        opacity,
      }}
      className="relative flex items-center justify-center transition-transform"
    >
      {/* Droplet / Footprint SVG */}
      <svg
        className="w-16 h-20 drop-shadow-lg"
        viewBox="0 0 100 130"
        fill="none"
      >
        <path
          d="M50 5 C25 5 5 35 5 70 C5 100 25 125 50 125 C75 125 95 100 95 70 C95 35 75 5 50 5 Z"
          fill={color}
        />
      </svg>

      {/* Subtle Inner Glow */}
      <div
        style={{ opacity: opacity * 0.4 }}
        className="absolute inset-0 bg-blue-300 rounded-full blur-md -z-10"
      />
    </div>
  );
};

export const Scene4Footsteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. FOOTSTEP STEPPING SEQUENCE (6 Steps total)
  // ----------------------------------------------------
  const stepFrames = [14, 28, 42, 56, 70, 84];

  // Coordinates for the 6 walking footsteps across the path
  const stepsData = [
    { type: "left" as const, x: 380, y: 680, frame: stepFrames[0], color: "#4285F4" },
    { type: "right" as const, x: 500, y: 570, frame: stepFrames[1], color: "#60A5FA" },
    { type: "left" as const, x: 640, y: 470, frame: stepFrames[2], color: "#4285F4" },
    { type: "right" as const, x: 780, y: 380, frame: stepFrames[3], color: "#60A5FA" },
    { type: "left" as const, x: 940, y: 300, frame: stepFrames[4], color: "#4285F4" },
    { type: "right" as const, x: 1100, y: 230, frame: stepFrames[5], color: "#60A5FA" },
  ];

  // Merge & Final Brand Reveal Timing (Frame 95+)
  const logoRevealFrame = 95;

  const logoSpring = spring({
    frame: frame - logoRevealFrame,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 140 },
  });

  const textSpring = spring({
    frame: frame - (logoRevealFrame + 12),
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });

  return (
    <AbsoluteFill className="bg-[#F8FAFC] flex flex-col items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Audio Step Triggers */}
      {stepFrames.map((f, idx) => (
        <React.Fragment key={f}>
          {frame === f && (
            <Audio
              src={idx % 2 === 0 ? STEP_SOUND_LEFT : STEP_SOUND_RIGHT}
              volume={0.6}
            />
          )}
        </React.Fragment>
      ))}

      {/* Audio Logo Merge Swoosh Trigger */}
      {frame === logoRevealFrame && <Audio src={SWOOSH_SOUND} volume={0.7} />}

      {/* Background Stylized Navigation Path & Grid Line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none">
          {/* Animated Dotted Curved Trail */}
          <path
            d="M 300 750 Q 750 480 1200 200"
            stroke="#93C5FD"
            strokeWidth="8"
            strokeDasharray="16 16"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* WALKING FOOTSTEPS (Langkah Kaki Kiri & Langkah Kaki Kanan) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {stepsData.map((step, idx) => {
          if (frame < step.frame) return null;

          const stepAge = frame - step.frame;
          const stepSpring = spring({
            frame: stepAge,
            fps,
            config: { damping: 12, mass: 0.5, stiffness: 180 },
          });

          // Ripple Ring
          const rippleScale = interpolate(stepAge, [0, 18], [0.3, 2.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rippleOpacity = interpolate(stepAge, [0, 18], [0.8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Dim older steps slightly as character walks forward
          const isOlderStep = frame >= logoRevealFrame;
          const stepFade = isOlderStep
            ? interpolate(frame, [logoRevealFrame, logoRevealFrame + 20], [1, 0.25], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 1;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${step.x}px`,
                top: `${step.y}px`,
                transform: `translate(-50%, -50%)`,
                opacity: stepFade,
              }}
            >
              {/* Footstep Pulse Ripple */}
              {stepAge < 20 && (
                <div
                  style={{
                    transform: `scale(${rippleScale})`,
                    opacity: rippleOpacity,
                  }}
                  className="absolute -inset-4 rounded-full border-2 border-blue-400 bg-blue-300/20"
                />
              )}

              {/* Footprint Component */}
              <InkluvyFootprint
                type={step.type}
                scale={stepSpring}
                opacity={Math.min(1, stepSpring)}
                color={step.color}
              />
            </div>
          );
        })}
      </div>

      {/* FINAL BRAND LOGO & TITLE REVEAL (Frame 95+) */}
      {frame >= logoRevealFrame && (
        <div className="relative z-20 flex flex-col items-center justify-center text-center mt-12">
          
          {/* Main Inkluvy Logo Container */}
          <div
            style={{
              transform: `scale(${logoSpring})`,
              opacity: logoSpring,
            }}
            className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-10 py-6 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.12)] border border-blue-100 mb-8"
          >
            <img
              src={staticFile("logo/Logo.png")}
              alt="Inkluvy Logo"
              className="w-16 h-16 object-contain"
            />
            <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
              INKLUVY
            </span>
          </div>

          {/* Headline & Subtitle Reveal */}
          <div
            style={{
              opacity: textSpring,
              transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            }}
            className="flex flex-col items-center gap-3 max-w-[900px]"
          >
            <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Every Step Takes You Further.
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-blue-600">
              Navigasi Trotoar Aksesibel & Safe Passage
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
