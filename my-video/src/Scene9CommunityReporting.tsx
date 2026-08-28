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
import {
  LuUsers,
  LuFileText,
  LuMapPin,
  LuShieldAlert,
  LuAccessibility,
  LuSend,
  LuMessageSquare,
  LuThumbsUp,
  LuShare2,
  LuCheck,
  LuCamera,
  LuSparkles,
  LuNavigation,
} from "react-icons/lu";
import { SWOOSH_SOUND, ALERT_PING_SOUND } from "./audioEffects";

export const Scene9CommunityReporting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // TIMING & SPRINGS (300 Frames = 10 Seconds @ 30 FPS)
  // ----------------------------------------------------
  const swooshSoundFrame = 65;
  const contentTransitionFrame = 80;

  // Continuous Smooth Auto-Scroll Y for Right Column Feed (Frame 100 - 275)
  const feedScrollY = interpolate(
    frame,
    [100, 275],
    [0, 540],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  // Step 1: Icon Center Entrance Spring (Frame 4+)
  const iconEntranceSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 140 },
  });

  // Step 2: Icon Ultra-Smooth Slide Left (Frame 14 - 44)
  const iconSlideLeftX = interpolate(
    frame,
    [14, 44],
    [180, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Step 2b: Icon Soft Rotation to Right (Frame 18 - 45)
  const iconRotateDeg = interpolate(
    frame,
    [18, 45],
    [0, 15],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Step 3: Feature Name Smooth Unfold & Slide Right (Frame 24+)
  const textEntranceSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 130 },
  });

  // Step 4: Ultra-Smooth Slide Left Exit Animation for Icon + Text (Frame 65 - 100)
  const slideOutLeftX = interpolate(
    frame,
    [65, 100],
    [0, -1800],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Phase 2 Content Entrance Spring
  const contentEntranceSpring = spring({
    frame: frame - contentTransitionFrame,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 140 },
  });

  // Left Form Entrance Spring
  const formSpring = spring({
    frame: frame - (contentTransitionFrame + 10),
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // Right Feed Entrance Spring
  const feedSpring = spring({
    frame: frame - (contentTransitionFrame + 25),
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 150 },
  });

  // Step 5: Content Container Slide Left Exit Animation (Frame 255 - 295)
  const contentSlideOutLeftX = interpolate(
    frame,
    [255, 295],
    [0, -2000],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center p-8 font-sans select-none antialiased text-gray-900 overflow-hidden">
      
      {/* Audio Triggers */}
      {frame === swooshSoundFrame && <Audio src={SWOOSH_SOUND} volume={0.6} />}
      {frame === contentTransitionFrame + 5 && <Audio src={ALERT_PING_SOUND} volume={0.6} />}
      {frame === 255 && <Audio src={SWOOSH_SOUND} volume={0.6} />}

      {/* PHASE 1: MINIMALIST MOTION TITLE (LIGHT PURPLE Squircle Icon with React-Icons/Lucide Users Icon) */}
      {frame < contentTransitionFrame + 18 && (
        <div
          style={{
            transform: `translateX(${slideOutLeftX}px)`,
          }}
          className="flex items-center gap-8 sm:gap-10 z-20"
        >
          {/* 1. Light Purple Gradient Squircle Icon */}
          <div
            style={{
              transform: `translateX(${iconSlideLeftX}px) scale(${iconEntranceSpring}) rotate(${iconRotateDeg}deg)`,
              opacity: iconEntranceSpring,
            }}
            className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200 via-indigo-300 to-purple-400 rounded-[32px] flex items-center justify-center shrink-0 border border-white/60 transition-transform"
          >
            <LuUsers className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-sm transform -rotate-6" />
          </div>

          {/* 2. Feature Name in Google Sans Font-Medium */}
          {frame >= 22 && (
            <div
              style={{
                opacity: textEntranceSpring,
                transform: `translateX(${interpolate(textEntranceSpring, [0, 1], [-40, 0])}px)`,
              }}
              className="flex flex-col gap-1"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gray-900 font-sans leading-tight whitespace-nowrap">
                Community Reporting
              </h1>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: 2-COLUMN SPLIT SHOWCASE (EXACT REAL REPORT FORM IN ENGLISH) */}
      {frame >= contentTransitionFrame - 5 && (
        <div
          style={{
            opacity: contentEntranceSpring,
            transform: `translateX(${contentSlideOutLeftX}px) scale(${contentEntranceSpring})`,
          }}
          className="w-full max-w-[1240px] h-[720px] bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden relative flex flex-col z-10 p-6 gap-6"
        >
          {/* Header Bar with Light Blue Accents & React Icons Lucide */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center shrink-0">
                <LuUsers className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 font-sans tracking-tight">
                Inkluvy Community Hub & Reporting
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 px-3.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>1.4k Active Member Stories</span>
            </div>
          </div>

          {/* 2-COLUMN GRID BODY */}
          <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
            
            {/* LEFT COLUMN: REAL REPORT FORM (MATCHING /community FORM IN ENGLISH) */}
            <div
              style={{
                opacity: formSpring,
                transform: `translateY(${interpolate(formSpring, [0, 1], [30, 0])}px)`,
              }}
              className="col-span-5 bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <h3 className="font-bold text-sm text-gray-900 font-sans flex items-center gap-2">
                  <LuFileText className="w-4 h-4 text-sky-600" /> Create Route Condition Report
                </h3>
                <span className="text-[10px] font-semibold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <LuSparkles className="w-3 h-3" /> Real-Time Sync
                </span>
              </div>

              {/* Form Input 1: Location Name & GPS Spot */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">
                  Location Name & GPS Spot
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><LuNavigation className="w-3.5 h-3.5 text-sky-500" /> Jl. Veteran (In front of Gate 2)</span>
                  <span className="text-[10px] text-sky-600 font-bold">Pick on Map</span>
                </div>
              </div>

              {/* Form Input 2: Route Risk Level (Vulnerability) */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">
                  Route Risk Level (Vulnerability)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-bold">
                    <LuShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Caution / Vulnerable</span>
                  </div>
                  <div className="bg-sky-50 border border-sky-300 text-sky-900 px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-[11px] font-bold">
                    <LuAccessibility className="w-3.5 h-3.5 text-sky-600" />
                    <span>Accessible Ramp</span>
                  </div>
                </div>
              </div>

              {/* Form Input 3: Report Details & Community Voice */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">
                    Report Details / Community Voice
                  </label>
                  <span className="text-[9px] text-sky-600 font-semibold flex items-center gap-1">
                    <LuCamera className="w-3 h-3" /> Photo Attached
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-normal text-gray-700 flex-1 leading-relaxed">
                  Deep cable trench opening cuts across the main sidewalk. Very dangerous for wheelchair commuters & visually impaired pedestrians.
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs py-3 rounded-xl text-center shadow-sm flex items-center justify-center gap-2">
                <LuSend className="w-4 h-4" /> Submit Community Report
              </div>
            </div>

            {/* RIGHT COLUMN: RECENT REPORTS FEED (IN ENGLISH WITH ATTACHED IMAGES) */}
            <div
              style={{
                opacity: feedSpring,
                transform: `translateY(${interpolate(feedSpring, [0, 1], [30, 0])}px)`,
              }}
              className="col-span-7 bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 overflow-hidden relative"
            >
              {/* Header Feed */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 z-20 bg-white">
                <h3 className="font-bold text-sm text-gray-900 font-sans flex items-center gap-2">
                  <LuMessageSquare className="w-4 h-4 text-sky-600" /> Recent Reports & Community Stories
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-500">
                  <span className="bg-gray-100 px-2.5 py-1 rounded-lg font-bold text-gray-800">All Reports</span>
                  <span className="px-2.5 py-1">Verified Only</span>
                </div>
              </div>

              {/* Feed Items Container with Continuous Smooth Auto-Scroll Y */}
              <div className="relative flex-1 overflow-hidden">
                <div
                  style={{
                    transform: `translateY(-${feedScrollY}px)`,
                  }}
                  className="flex flex-col gap-4"
                >
                  
                  {/* POST 1: Sidewalk Trench (WITH IMAGE 1) */}
                  <div className="bg-slate-50/80 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-sky-200 text-sky-800 font-bold flex items-center justify-center text-xs">
                          SA
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-gray-900">Syahla Aulia</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <LuCheck className="w-2.5 h-2.5" /> Verified Reporter
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            2 mins ago • <LuMapPin className="w-2.5 h-2.5 text-sky-500" /> Jl. Veteran Malang
                          </p>
                        </div>
                      </div>
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-200">
                        Severe Hazard
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-gray-900 font-sans">
                      Unprotected Cable Trench on Main Sidewalk
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      "Deep opening cuts across the main sidewalk. Very dangerous for wheelchair users and visually impaired pedestrians."
                    </p>

                    {/* REPORT PHOTO IMAGE 1 */}
                    <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
                      <Img
                        src={staticFile("images/community_sidewalk_ramp.png")}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <LuCamera className="w-3 h-3" /> Field Report Photo
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1 text-sky-600 font-bold">
                        <LuThumbsUp className="w-3.5 h-3.5" /> 18 Likes
                      </span>
                      <span className="flex items-center gap-1"><LuMessageSquare className="w-3.5 h-3.5" /> 5 Comments</span>
                      <span className="flex items-center gap-1"><LuShare2 className="w-3.5 h-3.5" /> Share</span>
                    </div>
                  </div>

                  {/* POST 2: Station Platform Lift (WITH IMAGE 2) */}
                  <div className="bg-slate-50/80 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-blue-200 text-blue-800 font-bold flex items-center justify-center text-xs">
                          BH
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-gray-900">Budi Handoko</span>
                            <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                              Wheelchair Commuter
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            15 mins ago • <LuMapPin className="w-2.5 h-2.5 text-sky-500" /> Malang City Station
                          </p>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        ✓ Verified Accessible
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-gray-900 font-sans">
                      New Accessible Elevator & Gentle Slope Ramp!
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      "Station platform 2 elevator is back online with a gentle slope ramp. Thank you for taking action on our community report!"
                    </p>

                    {/* REPORT PHOTO IMAGE 2 */}
                    <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
                      <Img
                        src={staticFile("images/community_elevator_update.png")}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <LuCamera className="w-3 h-3" /> Facility Update Photo
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1 text-sky-600 font-bold">
                        <LuThumbsUp className="w-3.5 h-3.5" /> 32 Likes
                      </span>
                      <span className="flex items-center gap-1"><LuMessageSquare className="w-3.5 h-3.5" /> 12 Comments</span>
                      <span className="flex items-center gap-1"><LuShare2 className="w-3.5 h-3.5" /> Share</span>
                    </div>
                  </div>

                  {/* POST 3: Accessibility Audit Walk (WITH IMAGE 3) */}
                  <div className="bg-slate-50/80 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-indigo-200 text-indigo-800 font-bold flex items-center justify-center text-xs">
                          MI
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-gray-900">Maya Indah</span>
                            <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded">
                              Visually Impaired Advocate
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            45 mins ago • <LuMapPin className="w-2.5 h-2.5 text-sky-500" /> Downtown Malang
                          </p>
                        </div>
                      </div>
                      <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-sky-200">
                        Community Event
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-gray-900 font-sans">
                      Joint Community Accessibility Audit & Mapping Walk
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      "Great turnout for our joint community audit mapping sidewalk accessibility in downtown Malang!"
                    </p>

                    {/* REPORT PHOTO IMAGE 3 */}
                    <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
                      <Img
                        src={staticFile("images/event_accessibility_walk.png")}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <LuCamera className="w-3 h-3" /> Community Action Photo
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-[11px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1 text-sky-600 font-bold">
                        <LuThumbsUp className="w-3.5 h-3.5" /> 58 Likes
                      </span>
                      <span className="flex items-center gap-1"><LuMessageSquare className="w-3.5 h-3.5" /> 21 Comments</span>
                      <span className="flex items-center gap-1"><LuShare2 className="w-3.5 h-3.5" /> Share</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
