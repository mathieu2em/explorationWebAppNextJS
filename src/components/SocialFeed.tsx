"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebook, FaHeart, FaComment } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useSocialPosts, SocialPost } from "@/hooks/useSocialPosts";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function PostCard({ post, index, viewOnText }: { post: SocialPost; index: number; viewOnText: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={post.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group block aspect-square overflow-hidden rounded-xl card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Platform badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`p-2 rounded-full ${
          post.platform === "instagram" 
            ? "bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400" 
            : "bg-black"
        }`}>
          {post.platform === "instagram" ? (
            <FaInstagram className="text-white" size={16} />
          ) : (
            <FaTiktok className="text-white" size={16} />
          )}
        </div>
      </div>

      {/* Video indicator */}
      {post.isVideo && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <FaPlay className="text-white" size={10} />
            <span className="text-white text-xs">Video</span>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex flex-col items-center justify-center ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}>
        {/* Stats */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2 text-white">
            <FaHeart className="text-red-500" />
            <span className="font-medium">{formatNumber(post.likes)}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FaComment />
            <span className="font-medium">{formatNumber(post.comments)}</span>
          </div>
        </div>

        {/* Caption preview */}
        <p className="text-white/80 text-sm text-center px-4 line-clamp-2">
          {post.caption}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 text-gold-400 text-sm font-medium">
          <span>{viewOnText} {post.platform === "instagram" ? "Instagram" : "TikTok"}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

export default function SocialFeed() {
  const { t } = useLanguage();
  const { posts, loading, isUsingFallback } = useSocialPosts();

  // Only show Instagram posts
  const filteredPosts = posts.filter((post) => post.platform === "instagram");

  return (
    <section id="work" className="py-20 md:py-32 bg-ink-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gray-100">{t("social.title1")}</span>
            <span className="gradient-text">{t("social.title2")}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("social.description")}
          </p>
          {isUsingFallback && (
            <p className="text-gold-400/60 text-sm mt-2">
              (Aperçu avec images de démonstration)
            </p>
          )}
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400"></div>
          </div>
        )}

        {!loading && (
          <>

        {/* Posts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} viewOnText={t("social.viewOn")} />
          ))}
        </div>

        {/* Follow CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://instagram.com/tattoomatha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaInstagram size={20} />
            {t("social.followIg")}
          </a>
          <a
            href="https://tiktok.com/@mathieutattoomatha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg border border-gray-600 hover:bg-gray-900 transition-colors"
          >
            <FaTiktok size={18} />
            {t("social.followTt")}
          </a>
          <a
            href="https://www.facebook.com/mathieuperron1234"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaFacebook size={18} />
            {t("social.followFb")}
          </a>
        </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
