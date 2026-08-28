import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Audio,
  staticFile,
  Easing,
} from "remotion";
import {
  Search,
  X,
  Clock,
  ArrowUpLeft,
} from "lucide-react";
import { TYPING_SOUND, MOUSE_CLICK_SOUND } from "./audioEffects";

export const GoogleSearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typed Search Phrase
  const fullText = "Hai Google, carikan aplikasi navigasi ramah disabilitas tuna daksa.";

  // ----------------------------------------------------
  // 1. TIMING CONFIGURATION (270 Frames Total @ 30 FPS)
  // ----------------------------------------------------
  const startTypingFrame = 25;
  const framesPerChar = 2;
  const totalTypingFrames = fullText.length * framesPerChar; // 134 frames
  const finishTypingFrame = startTypingFrame + totalTypingFrames; // frame 159

  // Dropdown list pop-in
  const startDropdownFrame = finishTypingFrame + 6; // frame 165

  // Cursor movement to Inkluvy suggestion row (16 frames duration)
  const startCursorMoveFrame = startDropdownFrame + 10; // frame 175
  const endCursorMoveFrame = startCursorMoveFrame + 16; // frame 191

  // Click action
  const clickFrame = endCursorMoveFrame + 8; // frame 199

  // ----------------------------------------------------
  // 2. ENTRANCE & MOTION SPRINGS
  // ----------------------------------------------------

  // Phase 1: Google Logo Pop-in in Center (Frame 0-14)
  const logoCenterSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 160 },
  });

  // Phase 2: Google Logo Shifts to Left (Frame 14-28)
  const logoShift = interpolate(
    frame,
    [14, 28],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Phase 3: Search Bar Pops Out to the Right (Frame 20-32)
  const searchBarSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 170 },
  });

  // ----------------------------------------------------
  // 3. TYPING LOGIC & AUDIO TICKS
  // ----------------------------------------------------
  const rawChars = Math.floor(
    Math.max(0, frame - startTypingFrame) / framesPerChar
  );
  const charsToShow = Math.min(fullText.length, rawChars);
  const currentText = fullText.slice(0, charsToShow);

  // Sound trigger on character increment
  const isTypingActive =
    frame >= startTypingFrame &&
    frame < finishTypingFrame &&
    (frame - startTypingFrame) % framesPerChar === 0;

  // Cursor blinking
  const showCursor = Math.floor(frame / 12) % 2 === 0;

  // ----------------------------------------------------
  // 4. DROPDOWN & ENLARGED CURSOR MOTION
  // ----------------------------------------------------

  // Suggestion Dropdown Pop-In Spring
  const dropdownSpring = spring({
    frame: frame - startDropdownFrame,
    fps,
    config: { damping: 13, mass: 0.5, stiffness: 180 },
  });

  const showDropdown = frame >= startDropdownFrame;

  // Snappy Arrow Cursor Coordinates Animation (Positioned on enlarged Item #1)
  const cursorX = interpolate(
    frame,
    [startCursorMoveFrame, endCursorMoveFrame],
    [72, 51],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  const cursorY = interpolate(
    frame,
    [startCursorMoveFrame, endCursorMoveFrame],
    [720, 480],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  const cursorOpacity = interpolate(
    frame,
    [startCursorMoveFrame - 3, startCursorMoveFrame + 3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Click Animation States
  const isHoveredInkluvy = frame >= endCursorMoveFrame - 3;
  const isClicked = frame >= clickFrame;

  // Cursor Click Scale & Ripple
  const cursorScale = interpolate(
    frame,
    [clickFrame, clickFrame + 4, clickFrame + 10],
    [1, 0.82, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rippleScale = interpolate(
    frame,
    [clickFrame, clickFrame + 18],
    [0.4, 2.8],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rippleOpacity = interpolate(
    frame,
    [clickFrame, clickFrame + 18],
    [0.9, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ----------------------------------------------------
  // 5. STAGGERED 1-BY-1 EXIT MOTION (Animasi Out 1 per 1 Komponen)
  // ----------------------------------------------------

  // Cursor Arrow Fades Out First
  const cursorExitOpacity = interpolate(
    frame,
    [clickFrame + 8, clickFrame + 18],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dropdown Item 4 Exit (Bottom item - Frame 212 to 224)
  const item4ExitScale = interpolate(
    frame,
    [212, 217, 224],
    [1.0, 1.08, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    }
  );
  const item4ExitOpacity = interpolate(
    frame,
    [217, 224],
    [1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dropdown Item 3 Exit (Frame 217 to 229)
  const item3ExitScale = interpolate(
    frame,
    [217, 222, 229],
    [1.0, 1.08, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    }
  );
  const item3ExitOpacity = interpolate(
    frame,
    [222, 229],
    [1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dropdown Item 2 Exit (Frame 222 to 234)
  const item2ExitScale = interpolate(
    frame,
    [222, 227, 234],
    [1.0, 1.08, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    }
  );
  const item2ExitOpacity = interpolate(
    frame,
    [227, 234],
    [1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dropdown Item 1 Inkluvy Row Exit (Frame 227 to 240)
  const item1ExitScale = interpolate(
    frame,
    [227, 233, 240],
    [1.0, 1.12, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    }
  );
  const item1ExitOpacity = interpolate(
    frame,
    [233, 240],
    [1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Search Input Bar Exit (Frame 235 to 250)
  const searchBarExitScale = interpolate(
    frame,
    [235, 241, 250],
    [1.0, 1.08, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    }
  );
  const searchBarExitOpacity = interpolate(
    frame,
    [241, 250],
    [1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Google Logo Final Exit (Frame 245 to 264)
  const logoExitScale = interpolate(
    frame,
    [245, 252, 264],
    [1.0, 1.25, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.4, 0.64, 1),
    }
  );
  const logoExitShiftY = interpolate(
    frame,
    [245, 264],
    [0, 40],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const logoExitOpacity = interpolate(
    frame,
    [252, 264],
    [1.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-[#FFFFFF] flex flex-col items-center justify-center p-8 sm:p-12 font-sans select-none antialiased text-gray-900">
      
      {/* Typing Sound Audio Trigger */}
      {isTypingActive && <Audio src={TYPING_SOUND} volume={0.35} />}

      {/* Click Sound Audio Trigger */}
      {frame === clickFrame && <Audio src={MOUSE_CLICK_SOUND} volume={0.8} />}

      {/* Main Container */}
      <div className="w-full max-w-[1360px] flex flex-col items-center">
        
        {/* Header Row: Google Logo Pops in Center -> Slides Left -> Search Bar Pops Right */}
        <div className="w-full flex items-start justify-center gap-8 sm:gap-10 relative">
          
          {/* Google Logo (Staggered Exit Animation) */}
          <div
            style={{
              transform: `scale(${logoCenterSpring * logoExitScale}) translateX(${interpolate(
                logoShift,
                [0, 1],
                [260, 0]
              )}px) translateY(${logoExitShiftY}px)`,
              opacity: logoCenterSpring * logoExitOpacity,
            }}
            className="h-18 flex items-center text-4xl sm:text-6xl font-semibold tracking-tighter font-sans shrink-0 z-20"
          >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          {/* Search Input Box (Staggered Exit Animation) */}
          {frame >= 18 && (
            <div
              style={{
                opacity: searchBarSpring * searchBarExitOpacity,
                transform: `scale(${searchBarSpring * searchBarExitScale}) translateY(${interpolate(
                  searchBarSpring,
                  [0, 1],
                  [-15, 0]
                )}px)`,
              }}
              className="relative flex-1 max-w-[1080px]"
            >
              <div className="w-full h-18 px-7 bg-white border border-gray-200 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.11)] flex items-center justify-between gap-4">
                
                {/* Left: Typewriter Text / Clicked Result */}
                <div className="flex items-center flex-1 overflow-hidden text-xl sm:text-2xl font-normal text-gray-900">
                  {isClicked ? (
                    <span className="font-medium text-blue-600 flex items-center gap-3 truncate">
                      <img
                        src={staticFile("logo/Logo.png")}
                        alt="Inkluvy Logo"
                        className="w-7 h-7 object-contain inline-block shrink-0"
                      />
                      <span className="truncate">
                        Inkluvy — Platform Navigasi & Keselamatan Darurat untuk Tuna Daksa di Perkotaan.
                      </span>
                    </span>
                  ) : (
                    <>
                      <span className="whitespace-pre truncate">{currentText}</span>
                      <span
                        className={`inline-block w-[3px] h-7 bg-blue-600 ml-[2px] shrink-0 ${
                          showCursor ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </>
                  )}
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* Clear X Icon */}
                  {currentText.length > 0 && !isClicked && (
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1.5">
                      <X className="w-6 h-6 stroke-[2]" />
                    </button>
                  )}

                  {/* Divider Line */}
                  <div className="h-7 w-[1px] bg-gray-200 mx-1" />

                  {/* Gray Microphone Icon */}
                  <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 fill-gray-500" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M11 18.93c-3.95-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.05 7.44-7 7.93V22h-2v-3.07z" />
                    </svg>
                  </button>

                  {/* Gray Lens Camera Icon */}
                  <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 fill-gray-500" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3.2" />
                      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </svg>
                  </button>

                  {/* Gray Search Magnifying Glass Icon */}
                  <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Search className="w-6 h-6 stroke-[2.2] text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Google Search Suggestion Dropdown Pop-In */}
              {showDropdown && (
                <div
                  style={{
                    opacity: dropdownSpring,
                    transform: `scale(${dropdownSpring}) translateY(${interpolate(
                      dropdownSpring,
                      [0, 1],
                      [-10, 0]
                    )}px)`,
                  }}
                  className="w-full bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden mt-2.5 py-3 text-left relative z-10"
                >
                  {/* ITEM #1 (Inkluvy Row Staggered Exit) */}
                  <div
                    style={{
                      transform: `scale(${item1ExitScale})`,
                      opacity: item1ExitOpacity,
                    }}
                    className={`px-7 py-4 flex items-center justify-between transition-all duration-200 border-l-6 ${
                      isHoveredInkluvy || isClicked
                        ? "bg-blue-50/90 border-blue-600 shadow-xs"
                        : "bg-white border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4 text-gray-900 text-lg sm:text-xl min-w-0 max-w-[800px]">
                      <img
                        src={staticFile("logo/Logo.png")}
                        alt="Inkluvy Logo"
                        className="w-8 h-8 object-contain shrink-0 rounded-full border border-blue-100 shadow-2xs"
                      />
                      <span className="truncate">
                        <strong className="font-bold text-blue-600 text-xl sm:text-2xl">
                          Inkluvy
                        </strong>{" "}
                        — Platform Navigasi & Keselamatan Darurat untuk Tuna Daksa di Perkotaan.
                      </span>
                    </div>

                    <span
                      className={`text-sm font-bold px-3.5 py-1.5 rounded-full border transition-all shrink-0 ml-3 ${
                        isHoveredInkluvy || isClicked
                          ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                          : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}
                    >
                      Rekomendasi Utama
                    </span>
                  </div>

                  {/* ITEM 2 (Staggered Exit) */}
                  <div
                    style={{
                      transform: `scale(${item2ExitScale})`,
                      opacity: item2ExitOpacity,
                    }}
                    className="px-7 py-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-gray-800 text-base sm:text-lg"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <Search className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="truncate">
                        Hai Google, carikan aplikasi navigasi ramah disabilitas{" "}
                        <strong className="font-bold text-gray-900">tuna daksa</strong>.
                      </span>
                    </div>
                    <ArrowUpLeft className="w-5 h-5 text-gray-400 shrink-0" />
                  </div>

                  {/* ITEM 3 (Staggered Exit) */}
                  <div
                    style={{
                      transform: `scale(${item3ExitScale})`,
                      opacity: item3ExitOpacity,
                    }}
                    className="px-7 py-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-gray-700 text-base sm:text-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Search className="w-5 h-5 text-gray-400 shrink-0" />
                      <span>peta rute aksesibel kursi roda malang</span>
                    </div>
                    <ArrowUpLeft className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* ITEM 4 (Staggered Exit) */}
                  <div
                    style={{
                      transform: `scale(${item4ExitScale})`,
                      opacity: item4ExitOpacity,
                    }}
                    className="px-7 py-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer text-gray-700 text-base sm:text-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                      <span>rampa & ubin pemandu ramah disabilitas</span>
                    </div>
                    <ArrowUpLeft className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ANIMATED POINTER ARROW CURSOR (With Staggered Fade Exit) */}
      {frame >= startCursorMoveFrame && (
        <div
          style={{
            position: "absolute",
            left: `${cursorX}%`,
            top: `${cursorY}px`,
            opacity: cursorOpacity * cursorExitOpacity,
            transform: `scale(${cursorScale})`,
            pointerEvents: "none",
            zIndex: 50,
          }}
          className="transition-transform duration-75"
        >
          {/* Click Ripple Circle Animation */}
          {frame >= clickFrame && frame < clickFrame + 22 && (
            <div
              style={{
                transform: `scale(${rippleScale})`,
                opacity: rippleOpacity,
              }}
              className="absolute -top-4 -left-4 w-14 h-14 rounded-full border-2 border-blue-500 bg-blue-400/25"
            />
          )}

          {/* STANDARD POINTER ARROW CURSOR SVG */}
          <svg
            className="w-11 h-11 drop-shadow-2xl text-gray-900"
            viewBox="0 0 24 24"
            fill="black"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
