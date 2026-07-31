import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuActivity,
  LuCompass,
  LuArrowLeft,
  LuShare2,
  LuMapPin,
  LuShieldCheck,
  LuFileText,
  LuCheck,
  LuAward,
} from "react-icons/lu";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ActivityTrendChart from "../components/profile/ActivityTrendChart";
import SectionIcon from "../components/ui/SectionIcon";
import { mockUsers, mockPosts } from "../data/communityData";

export default function UserProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find user by ID or fallback to first user
  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];
  const userPosts = mockPosts.filter(
    (p) => p.authorId === user.id || p.author === user.name,
  );

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statsList = [
    {
      value: user.reportsCount || 142,
      label: "Total Reports",
      icon: LuFileText,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      value: "98%",
      label: "Accuracy Rate",
      icon: LuCheck,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      value: user.verifiedRoutes || 38,
      label: "Reports Verified",
      icon: LuShieldCheck,
      color: "bg-amber-50 text-amber-800 border-amber-200",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-gray-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-24 w-full">
        {/* Top Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-black bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all"
          >
            <LuArrowLeft className="size-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all"
          >
            <LuShare2 className="size-3.5" />
            <span>{copied ? "Link Copied! ✓" : "Share Profile"}</span>
          </button>
        </div>

        {/* Profile Header (Centered Horizontally) */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="size-20 sm:size-24 rounded-full object-cover border-2 border-gray-300 shadow-sm mb-4"
          />

          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-gray-950 flex items-center justify-center gap-2 mb-2">
            <span>{user.name}</span>
            <span className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <LuShieldCheck className="size-3 stroke-[3]" />
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
            <span>{user.location || "Malang, Jawa Timur"}</span> —{" "}
            <span className="italic">
              "
              {user.bio ||
                "Active wheelchair user and urban accessibility advocate."}
              "
            </span>
          </p>
        </div>

        {/* Grid Layout Section */}
        <div className="space-y-8">
          {/* Row 1: Left Stats Card + Right Activity Trend */}
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {/* Left: Replaced Stats Card */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs sm:p-6 lg:h-[400px]">
              <div className="flex items-center gap-3.5">
                <SectionIcon
                  icon={LuAward}
                  colorClass="from-primary/50 text-primary"
                />
                <div>
                  <h2 className="font-sans font-bold text-sm sm:text-base text-gray-900 leading-tight">
                    Contribution Statistics
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                    A summary of mapper performance and verifications
                  </p>
                </div>
              </div>

              {/* 3 Metric Box Grid */}
              <div className="grid grid-cols-3 gap-3 my-auto">
                {statsList.map((st, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden p-4 rounded-xl border border-gray-200/70 text-center flex flex-col items-center justify-center gap-1 bg-white"
                  >
                    {/* Soft Spread Glow Effect */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 size-36 bg-primary/30 rounded-full blur-2xl pointer-events-none" />

                    <span className="relative z-10 font-sans font-medium text-xl sm:text-3xl text-gray-950 leading-none">
                      {st.value}
                    </span>
                    <span className="relative z-10 text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Activity Trend Card */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs sm:p-6 lg:h-[400px]">
              <div className="flex items-center gap-3.5">
                <SectionIcon
                  icon={LuActivity}
                  colorClass="from-primary/50 text-primary"
                />
                <div>
                  <h2 className="font-sans font-bold text-sm sm:text-base text-gray-900 leading-tight">
                    Activity Trend
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                    Route status contributions over the last 7 days
                  </p>
                </div>
              </div>

              <ActivityTrendChart />
            </div>
          </div>

          {/* Row 2: Active Reports */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <SectionIcon
                  icon={LuCompass}
                  colorClass="from-primary/50 text-primary"
                />
                <div>
                  <h2 className="font-sans font-bold text-sm sm:text-base text-gray-900 leading-tight">
                    Active Reports by {user.name}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
                    A list of mapped route points and obstacles
                  </p>
                </div>
              </div>

              <Link
                to="/map"
                className="text-xs text-black font-semibold hover:underline"
              >
                View on Map →
              </Link>
            </div>

            {/* Grid of Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/community/post/${post.id}`}
                    className="group rounded-xl border border-gray-200/80 p-3.5 hover:border-gray-400 hover:shadow-2xs transition-all flex flex-col justify-between h-full bg-white block"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="h-32 rounded-lg overflow-hidden mb-3 relative border border-gray-200">
                        <img
                          src={
                            post.image || "/images/map/map_ramp_condition.png"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span
                            className={`text-xs font-bold px-3 py-1.5 rounded-full border ${post.tagColor}`}
                          >
                            {post.tag}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-xs text-gray-950 group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5 flex items-center gap-1">
                        <LuMapPin className="size-3 text-emerald-600" />
                        {post.location}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-2 font-normal leading-relaxed line-clamp-2">
                        {post.summary || post.content}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-xs text-gray-500">
                  {user.name} has not published any reports yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
