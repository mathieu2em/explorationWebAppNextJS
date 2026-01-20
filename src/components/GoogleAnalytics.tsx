"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { isRestrictiveInAppBrowser } from "@/utils/browserDetection";

const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  // Default to false to prevent server-rendering inline scripts that break Instagram's CSP
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load analytics in non-restrictive browsers (not Instagram, Facebook, etc.)
    if (!isRestrictiveInAppBrowser()) {
      setShouldLoad(true);
    }
  }, []);

  if (!GA_MEASUREMENT_ID || !shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
