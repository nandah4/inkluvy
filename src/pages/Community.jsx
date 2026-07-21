import { useState } from "react";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuHeart,
  LuMapPin,
  LuMessageSquare,
  LuPlus,
  LuSearch,
  LuShare2,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuSparkles,
  LuThumbsUp,
  LuTrophy,
  LuUsers,
  LuX,
} from "react-icons/lu";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const initialPosts = [
  {
    id: 1,
    author: "Syahla Aulia",
    avatar: "/images/profile-avatar.png",
    role: "Verified Contributor",
    time: "2 hours ago",
    location: "Stasiun Malang Kota Baru",
    title: "Lift Aksesibel Stasiun Kota Kembali Beroperasi Normal 🎉",
    content:
      "Tim Inkluvy dan petugas stasiun baru saja menyelesaikan perbaikan lift peron 2. Sudah dicoba dengan kursi roda elektrik dan berfungsi sangat halus!",
    tag: "Verified Update",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    likes: 42,
    comments: 12,
    isLiked: false,
    image: "/images/community/community_elevator_update.png",
  },
  {
    id: 2,
    author: "Fadhil Rizky",
    avatar: "/images/avatars/avatar_fadhil.png",
    role: "Gold Mapper",
    time: "5 hours ago",
    location: "Jl. Veteran (Depan UB Gate 1)",
    title: "Perbaikan Trotoar Sementara — Rampa Kayu Disediakan 🚧",
    content:
      "Ada pengerjaan galian kabel di sepanjang trotoar Jl. Veteran. Kontraktor menyediakan rampa kayu sementara dengan landaian 5 derajat. Harap hati-hati jika lewat malam hari.",
    tag: "Obstacle Warning",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
    likes: 28,
    comments: 8,
    isLiked: false,
    image: "/images/community/community_sidewalk_ramp.png",
  },
];

const leaderboards = [
  {
    rank: 1,
    name: "Fadhil Rizky",
    role: "Gold Mapper",
    points: "2,450 pts",
    reports: "210 Reports",
    avatar: "/images/avatars/avatar_fadhil.png",
  },
  {
    rank: 2,
    name: "Siti Rahma",
    role: "Silver Mapper",
    points: "1,980 pts",
    reports: "185 Reports",
    avatar: "/images/avatars/avatar_siti.png",
  },
];

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newTag, setNewTag] = useState("Obstacle Warning");

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Syahla Aulia",
      avatar: "/images/profile-avatar.png",
      role: "Community Member",
      time: "Just now",
      location: newLocation || "Malang City",
      title: newTitle,
      content: newContent,
      tag: newTag,
      tagColor:
        newTag === "Obstacle Warning"
          ? "bg-amber-50 text-amber-800 border-amber-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200",
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewLocation("");
    setShowCreateModal(false);
  };

  // Filter posts based on search query and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.tag === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-20 overflow-x-hidden">
        {/* Community Hero Header */}
        <section className="relative py-8 sm:py-12 lg:py-16 border-gray-100">
          <div className="mx-auto px-4 sm:px-8 lg:px-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold text-gray-800 shadow-2xs mb-4 sm:mb-6">
              <LuUsers className="size-3.5 sm:size-4 text-emerald-500" />
              <span>Inkluvy Community Hub</span>
            </div>

            <h1 className="font-sans text-2xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-tight">
              Together for Accessible & Inclusive Cities
            </h1>

            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Connect with fellow citizens, share real-time obstacle updates,
              verify accessible routes, and help everyone move through the city
              with freedom.
            </p>
          </div>
        </section>

        {/* Main Grid: Feed & Sidebar */}
        <div
          id="feed"
          className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 pt-4 sm:pt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            
            {/* Left Feed Column (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
              
              {/* Search Bar & Quick Category Filters Component */}
              <div className="bg-[#F5F5F3] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-gray-200/80 flex flex-col gap-3 sm:gap-3.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <h3 className="font-semibold text-xs sm:text-base text-gray-900 flex items-center gap-1.5 sm:gap-2">
                    <LuSlidersHorizontal className="size-3.5 sm:size-4 text-gray-700" />
                    <span>Search Updates & Filters</span>
                  </h3>

                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-black px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-medium text-white shadow-2xs hover:bg-gray-800 transition-all shrink-0"
                  >
                    <LuPlus className="size-3 sm:size-3.5" />
                    <span>Create Report</span>
                  </button>
                </div>

                {/* Search Input Box */}
                <div className="relative flex items-center w-full">
                  <LuSearch className="absolute left-3 size-3.5 sm:size-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search updates, locations, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 sm:right-3 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LuX className="size-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Category Pills */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-0.5">
                  {[
                    "All",
                    "Verified Update",
                    "Obstacle Warning",
                    "Community Praise",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? "bg-black text-white shadow-2xs font-semibold"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/60"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Header */}
              <div className="flex items-center justify-between pt-1 sm:pt-2">
                <h2 className="font-semibold text-lg sm:text-xl text-gray-900 flex items-center gap-2">
                  <span>Live Community Updates</span>
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </h2>
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  Showing {filteredPosts.length} posts
                </span>
              </div>

              {/* Feed List */}
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#F5F5F3] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col gap-3 sm:gap-4 transition-all hover:shadow-xs"
                  >
                    {/* Author Header */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="size-9 sm:size-11 rounded-full object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <h3 className="font-bold text-xs sm:text-base text-gray-900 flex items-center gap-1 sm:gap-1.5">
                            <span>{post.author}</span>
                            <span className="size-3.5 sm:size-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                              <LuShieldCheck className="size-2 sm:size-2.5 stroke-[3]" />
                            </span>
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-500 font-normal">
                            {post.role} • {post.time}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${post.tagColor} shrink-0`}
                      >
                        {post.tag}
                      </span>
                    </div>

                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-medium bg-white/80 border border-gray-200/60 px-2.5 py-1 rounded-lg w-fit">
                      <LuMapPin className="size-3 sm:size-3.5 text-primary shrink-0" />
                      <span>{post.location}</span>
                    </div>

                    {/* Content Title & Body */}
                    <div>
                      <h4 className="font-bold text-sm sm:text-lg text-gray-900 mb-1 sm:mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Image (if available) */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden max-h-56 sm:max-h-72 w-full border border-gray-200/60">
                        <img
                          src={post.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-2 sm:pt-3 flex items-center justify-between text-[11px] sm:text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 sm:gap-1.5 transition-colors ${
                            post.isLiked
                              ? "text-primary font-bold"
                              : "hover:text-gray-900"
                          }`}
                        >
                          <LuHeart
                            className={`size-3.5 sm:size-4 ${
                              post.isLiked ? "fill-primary text-primary" : ""
                            }`}
                          />
                          <span>{post.likes} Likes</span>
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1 sm:gap-1.5 hover:text-gray-900 transition-colors"
                        >
                          <LuMessageSquare className="size-3.5 sm:size-4" />
                          <span>{post.comments} Comments</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                      >
                        <LuShare2 className="size-3 sm:size-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </motion.article>
                ))
              ) : (
                /* Empty State if Search Result is empty */
                <div className="bg-[#F5F5F3] rounded-xl p-6 sm:p-8 text-center border border-gray-200/80 flex flex-col items-center justify-center gap-2.5 sm:gap-3">
                  <LuSearch className="size-6 sm:size-8 text-gray-400" />
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">
                    No community updates found
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 max-w-sm">
                    No results match "{searchQuery}". Try searching for another keyword or location.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-1 sm:mt-2 text-xs font-bold text-black underline underline-offset-4"
                  >
                    Clear Search Filters
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar Column (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Leaderboard Card */}
              <div className="bg-[#F5F5F3] rounded-xl sm:rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                    <LuTrophy className="size-5 text-amber-500" />
                    <span>Top Mappers This Month</span>
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">
                    Malang
                  </span>
                </div>

                <div className="flex flex-col gap-3.5">
                  {leaderboards.map((user) => (
                    <div
                      key={user.rank}
                      className="bg-white rounded-xl p-3.5 border border-gray-200/70 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-bold text-xs size-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                          #{user.rank}
                        </span>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="size-9 rounded-full object-cover border border-gray-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                            {user.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            {user.role}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-xs text-black block">
                          {user.points}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {user.reports}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events Card */}
              <div className="bg-[#F5F5F3] rounded-xl sm:rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col gap-4">
                <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2 ">
                  <LuSparkles className="size-4 text-yellow-500 fill-yellow-500" />
                  <span>Upcoming Community Events</span>
                </h3>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs flex flex-col gap-3">
                    <span className="text-[11px] font-bold text-black uppercase tracking-wider">
                      Sat, 28 July 2026 • 08:00 AM
                    </span>
                    <h4 className="font-bold text-sm text-gray-900">
                      Malang Accessibility Walk & Mapping Day
                    </h4>
                    <p className="text-xs text-gray-600 font-normal">
                      Kumpul di Alun-Alun Malang untuk memetakan trotoar & rampa
                      publik bersama relawan disabilitas.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 shadow-xs flex flex-col gap-3">
                    <span className="text-[11px] font-bold text-black uppercase tracking-wider">
                      Sun, 5 August 2026 • 10:00 AM
                    </span>
                    <h4 className="font-bold text-sm text-gray-900">
                      Workshop Navigasi Suara untuk Tunanetra
                    </h4>
                    <p className="text-xs text-gray-600 font-normal">
                      Pelatihan penggunaan fitur panduan suara haptic Inkluvy di
                      Gedung UB TV.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal: Create Post / Report */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative"
          >
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <LuX className="size-4" />
            </button>

            <h3 className="font-bold text-xl text-gray-900 mb-1">
              Post Community Update
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Share real-time route conditions, lift updates, or report an
              obstacle for citizens.
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lift Peron 2 Stasiun Malang Aktif Kembali"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Location / Place Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Jl. Veteran No. 8, Malang"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Category / Tag
                </label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none"
                >
                  <option value="Obstacle Warning">Obstacle Warning 🚧</option>
                  <option value="Verified Update">Verified Update ✅</option>
                  <option value="Community Praise">Community Praise 🎉</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Content / Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the condition, slope, lift status, or accessible route info..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-bold shadow-md hover:bg-gray-800"
                >
                  Publish Update
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
