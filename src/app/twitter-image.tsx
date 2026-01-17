import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mathieu Perron - Tatoueur Lanaudière | matha.tattoo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            right: "20px",
            bottom: "20px",
            border: "2px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "20px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              background: "linear-gradient(135deg, #d4af37 0%, #f5e6a3 50%, #d4af37 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "10px",
              fontFamily: "serif",
            }}
          >
            Mathieu Perron
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 36,
              color: "#f5f5f5",
              marginBottom: "30px",
              fontFamily: "sans-serif",
            }}
          >
            Artiste Tatoueur
          </div>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#d4af37",
                fontFamily: "sans-serif",
              }}
            >
              📍 St-Jean-de-Matha, Lanaudière
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: "#888888",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
              fontFamily: "sans-serif",
              marginBottom: "60px",
            }}
          >
            Tatouages personnalisés uniques • Studio privé
          </div>

          {/* Domain */}
          <div
            style={{
              fontSize: 32,
              color: "#d4af37",
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            matha.tattoo
          </div>
        </div>

        {/* Decorative corners */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "60px",
            height: "60px",
            borderTop: "3px solid #d4af37",
            borderLeft: "3px solid #d4af37",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            width: "60px",
            height: "60px",
            borderTop: "3px solid #d4af37",
            borderRight: "3px solid #d4af37",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            width: "60px",
            height: "60px",
            borderBottom: "3px solid #d4af37",
            borderLeft: "3px solid #d4af37",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "60px",
            height: "60px",
            borderBottom: "3px solid #d4af37",
            borderRight: "3px solid #d4af37",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
