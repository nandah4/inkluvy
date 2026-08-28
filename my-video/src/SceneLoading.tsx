import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
} from "remotion";
import { STEP_SOUND_LEFT, STEP_SOUND_RIGHT } from "./audioEffects";

export const SceneLoading: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // 1. ENLARGED FOOTPRINT STEPPING PATTERN (Looping Every 60 Frames)
  // ----------------------------------------------------
  const loopFrame = frame % 60;

  const steps = [
    { type: "left", x: -85, y: 160, frameTrigger: 8, sound: STEP_SOUND_LEFT },
    { type: "right", x: 85, y: 50, frameTrigger: 20, sound: STEP_SOUND_RIGHT },
    { type: "left", x: -85, y: -60, frameTrigger: 32, sound: STEP_SOUND_LEFT },
    { type: "right", x: 85, y: -170, frameTrigger: 44, sound: STEP_SOUND_RIGHT },
  ];

  return (
    <AbsoluteFill className="bg-white flex flex-col items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Audio Step Triggers */}
      {steps.map((s, idx) => (
        <React.Fragment key={idx}>
          {loopFrame === s.frameTrigger && (
            <Audio src={s.sound} volume={0.5} />
          )}
        </React.Fragment>
      ))}

      {/* MAIN CONTAINER (ENLARGED DISPLAY) */}
      <div className="flex flex-col items-center justify-center z-10">
        
        {/* FOOTPRINTS DISPLAY (Enlarged 500x500 Bounds & Giant SVG Steps) */}
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          
          {steps.map((step, idx) => {
            const isVisible = loopFrame >= step.frameTrigger;
            const age = isVisible ? loopFrame - step.frameTrigger : 0;

            const popSpring = isVisible
              ? spring({
                  frame: age,
                  fps,
                  config: { damping: 12, mass: 0.5, stiffness: 180 },
                })
              : 0;

            const opacity = isVisible
              ? interpolate(age, [0, 5, 40, 50], [0, 1, 1, 0.25], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;

            const isLeft = step.type === "left";

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${step.x}px)`,
                  top: `calc(50% + ${step.y}px)`,
                  transform: `translate(-50%, -50%) scale(${popSpring}) rotate(${
                    isLeft ? "-12deg" : "12deg"
                  })`,
                  opacity,
                }}
                className="transition-transform"
              >
                {/* Giant Organic Footprint SVG (Flat Minimalist, No Shadow) */}
                <svg
                  className="w-32 h-40"
                  viewBox="0 0 100 130"
                  fill="none"
                >
                  <path
                    d="M 52 5 C 28 5 4 28 4 66 C 4 98 22 125 50 125 C 78 125 96 98 96 64 C 96 30 74 5 52 5 Z"
                    fill={isLeft ? "#4285F4" : "#60A5FA"}
                  />
                </svg>

                {/* Footprint Pulse Ripple */}
                {isVisible && age < 15 && (
                  <div
                    style={{
                      transform: `scale(${interpolate(age, [0, 15], [0.4, 2.2])})`,
                      opacity: interpolate(age, [0, 15], [0.8, 0]),
                    }}
                    className="absolute inset-0 rounded-full border-4 border-blue-400 bg-blue-300/20 pointer-events-none"
                  />
                )}
              </div>
            );
          })}

        </div>
      </div>

    </AbsoluteFill>
  );
};
