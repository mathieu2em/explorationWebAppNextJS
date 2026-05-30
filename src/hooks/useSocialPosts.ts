"use client";

import { useState, useEffect } from "react";
import { instagramFallbackPosts } from "@/config/instagramFallbackPosts";

// Types unifiés pour les posts sociaux
export interface SocialPost {
  id: string;
  platform: "instagram" | "tiktok";
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  postUrl: string;
  isVideo?: boolean;
  timestamp?: string;
}

interface UseSocialPostsResult {
  posts: SocialPost[];
  loading: boolean;
  error: string | null;
  isUsingFallback: boolean;
}

// Posts de fallback réels, générés depuis le feed Instagram @tattoomatha.
const fallbackPosts: SocialPost[] = instagramFallbackPosts;

export function useSocialPosts(): UseSocialPostsResult {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        // Fetch Instagram et TikTok en parallèle
        const [instagramRes, tiktokRes] = await Promise.all([
          fetch("/api/instagram").catch(() => null),
          fetch("/api/tiktok").catch(() => null),
        ]);

        const allPosts: SocialPost[] = [];
        let hasRealData = false;

        // Traiter les posts Instagram
        if (instagramRes?.ok) {
          const instagramData = await instagramRes.json();
          if (instagramData.posts && instagramData.posts.length > 0) {
            hasRealData = true;
            const igPosts: SocialPost[] = instagramData.posts.map((post: {
              id: string;
              media_type: string;
              media_url: string;
              thumbnail_url?: string;
              caption?: string;
              like_count?: number;
              comments_count?: number;
              permalink: string;
              timestamp?: string;
            }) => ({
              id: `ig-${post.id}`,
              platform: "instagram" as const,
              imageUrl: post.media_type === "VIDEO" ? post.thumbnail_url || post.media_url : post.media_url,
              caption: post.caption || "",
              likes: post.like_count || 0,
              comments: post.comments_count || 0,
              postUrl: post.permalink,
              isVideo: post.media_type === "VIDEO",
              timestamp: post.timestamp,
            }));
            allPosts.push(...igPosts);
          }
        }

        // Traiter les vidéos TikTok
        if (tiktokRes?.ok) {
          const tiktokData = await tiktokRes.json();
          if (tiktokData.videos && tiktokData.videos.length > 0) {
            hasRealData = true;
            const ttPosts: SocialPost[] = tiktokData.videos.map((video: {
              id: string;
              cover_image_url: string;
              title: string;
              like_count: number;
              comment_count: number;
              share_url: string;
              create_time?: number;
            }) => ({
              id: `tt-${video.id}`,
              platform: "tiktok" as const,
              imageUrl: video.cover_image_url,
              caption: video.title || "",
              likes: video.like_count || 0,
              comments: video.comment_count || 0,
              postUrl: video.share_url,
              isVideo: true,
              timestamp: video.create_time ? new Date(video.create_time * 1000).toISOString() : undefined,
            }));
            allPosts.push(...ttPosts);
          }
        }

        // Si on a des données réelles, les trier par date
        if (hasRealData && allPosts.length > 0) {
          allPosts.sort((a, b) => {
            if (!a.timestamp || !b.timestamp) return 0;
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
          setPosts(allPosts);
          setIsUsingFallback(false);
        } else {
          // Utiliser les posts de fallback
          setPosts(fallbackPosts);
          setIsUsingFallback(true);
        }
      } catch (err) {
        console.error("Error fetching social posts:", err);
        setError("Erreur lors du chargement des posts");
        setPosts(fallbackPosts);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error, isUsingFallback };
}
