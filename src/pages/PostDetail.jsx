import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuHeart,
  LuMapPin,
  LuMessageSquare,
  LuShare2,
  LuShieldCheck,
  LuClock,
  LuSend,
  LuBookmark,
} from "react-icons/lu";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SectionIcon from "../components/ui/SectionIcon";
import { mockPosts, mockUsers } from "../data/communityData";

function renderFormattedContent(text) {
  if (!text) return null;
  const lines = text.split("\n");

  return (
    <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Bullet point lines
        if (trimmed.startsWith("- ")) {
          const bulletContent = trimmed.slice(2);
          const parts = bulletContent.split(/(\*\*.*?\*\*)/g);
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 py-0.5">
              <span className="size-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
              <p className="text-gray-700 leading-relaxed">
                {parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={pIdx} className="font-bold text-gray-900">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </p>
            </div>
          );
        }

        // Header / Bold title lines
        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          return (
            <h4
              key={idx}
              className="font-bold text-base sm:text-lg text-gray-900 pt-3 pb-1"
            >
              {trimmed.slice(2, -2)}
            </h4>
          );
        }

        // Regular paragraph with inline **bold**
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={idx}>
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pIdx} className="font-bold text-gray-900">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find post by ID or fallback to first post
  const initialPost = mockPosts.find((p) => p.id === id) || mockPosts[0];
  const [post, setPost] = useState(initialPost);
  const author = mockUsers.find((u) => u.id === post.authorId) || {
    id: post.authorId,
    name: post.author,
    avatar: post.avatar,
    role: post.role,
  };

  const [comments, setComments] = useState(post.comments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      authorId: "syahla-aulia",
      author: "Syahla Aulia",
      avatar: "/images/profile-avatar.png",
      time: "Just now",
      content: newCommentText.trim(),
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col justify-between">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 mx-auto max-w-4xl w-full"
      >
        {/* Back Navigation Bar */}
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-black bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all"
          >
            <LuArrowLeft className="size-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-xl border text-xs font-medium transition-all ${
                isBookmarked
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              title="Save Report"
            >
              <LuBookmark
                className={`size-3.5 ${isBookmarked ? "fill-amber-500" : ""}`}
              />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all"
            >
              <LuShare2 className="size-3.5" />
              <span>{copied ? "Link Copied! ✓" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* 1 Column Main Post Detail Container */}
        <div className="flex flex-col gap-5 w-full">
          {/* Main Card */}
          <div className=" py-10 flex flex-col gap-5">
            {/* Category Tag & Timestamp */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-100">
              <span
                className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${post.tagColor}`}
              >
                {post.tag}
              </span>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 font-medium">
                <LuClock className="size-3.5" />
                <span>{post.fullDate || post.time}</span>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-snug">
              {post.title}
            </h1>

            {/* Author Header Row & Verified Location */}
            <div className="group flex flex-wrap items-center justify-between gap-3 sm:gap-4 my-4 sm:my-5">
              <Link to={`/community/user/${author.id}`} className="shrink-0">
                <div className="flex items-center gap-2.5">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="size-9 sm:size-10 rounded-full object-cover border border-gray-200 shadow-2xs"
                  />
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{author.name}</span>
                      <span className="size-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <LuShieldCheck className="size-2 stroke-[3]" />
                      </span>
                    </h3>
                    <p className="text-[11px] text-gray-500 font-normal">
                      {author.role}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-800 font-medium bg-emerald-50/60 border border-emerald-200/70 p-2.5 sm:p-3 rounded-xl max-w-full">
                <LuMapPin className="size-3.5 text-emerald-600 shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-emerald-950">
                    Verified Location:{" "}
                  </span>
                  <span>{post.location}</span>
                </div>
              </div>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="rounded-xl overflow-hidden border border-gray-200 max-h-[380px] bg-black/5 shadow-xs">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Formatted Content Body (Includes bold headers & bullet points) */}
            <div className="border-t border-gray-100 pt-5">
              {renderFormattedContent(post.content)}
            </div>

            {/* Interactive Actions Row */}
            <div className="flex items-center justify-start gap-5 sm:gap-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleLike}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  isLiked
                    ? "bg-rose-50 border-rose-200 text-rose-600 shadow-2xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LuHeart
                  className={`size-4 sm:size-5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`}
                />
                <span>{likesCount} Likes</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <LuMessageSquare className="size-4 text-gray-400" />
                <span>{comments.length} Comments</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <SectionIcon
                icon={LuMessageSquare}
                colorClass="from-primary/50 text-primary"
              />
              <h3 className="font-bold text-base sm:text-lg text-gray-900">
                Discussion & Comments ({comments.length})
              </h3>
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="flex flex-col gap-3">
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Share your feedback or experience with this location..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-b from-black to-black/50 text-white text-xs font-bold shadow-2xs hover:from-black hover:to-black/70 disabled:opacity-50 transition-all"
                >
                  <LuSend className="size-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* Comments List (border-b instead of full box border) */}
            <div className="divide-y divide-gray-100 pt-2 border-t border-gray-100">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="py-4 flex items-start gap-3.5"
                  >
                    <Link to={`/community/user/${comment.authorId}`}>
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="size-9 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <Link
                          to={`/community/user/${comment.authorId}`}
                          className="font-bold text-xs sm:text-sm text-gray-900 hover:text-primary transition-colors"
                        >
                          {comment.author}
                        </Link>
                        <span className="text-[10px] sm:text-xs text-gray-400 font-normal">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 font-normal leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-4">
                  No comments yet. Be the first to share your feedback!
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
