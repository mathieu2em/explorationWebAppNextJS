import { NextResponse } from "next/server";

// Types pour les posts Instagram
interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramAPIResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

// Cache simple en mémoire (en production, utilise Redis)
let cache: {
  data: InstagramMedia[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    // Vérifier si les variables d'environnement sont configurées
    if (!accessToken || !userId) {
      return NextResponse.json(
        { 
          error: "Instagram API not configured",
          message: "Veuillez configurer INSTAGRAM_ACCESS_TOKEN et INSTAGRAM_USER_ID dans .env.local"
        },
        { status: 503 }
      );
    }

    // Vérifier le cache
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        posts: cache.data,
        cached: true,
      });
    }

    // Appeler l'API Instagram Graph (avec Instagram Login)
    // Note: like_count et comments_count nécessitent un compte Business/Creator
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count";
    const limit = 12; // Nombre de posts à récupérer

    const response = await fetch(
      `https://graph.instagram.com/v24.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Instagram API Error:", errorData);
      
      // Si le token est expiré
      if (errorData.error?.code === 190) {
        return NextResponse.json(
          { 
            error: "Token expired",
            message: "Le token Instagram a expiré. Veuillez en générer un nouveau sur developers.facebook.com"
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch Instagram posts" },
        { status: response.status }
      );
    }

    const data: InstagramAPIResponse = await response.json();

    // Mettre à jour le cache
    cache = {
      data: data.data,
      timestamp: now,
    };

    return NextResponse.json({
      posts: data.data,
      cached: false,
    });
  } catch (error) {
    console.error("Instagram API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
