"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { isRestrictiveInAppBrowser } from "@/utils/browserDetection";

const MicrosoftClarity = () => {
  // Default to false to prevent server-rendering inline scripts that break Instagram's CSP
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load Clarity in non-restrictive browsers (not Instagram, Facebook, etc.)
    if (!isRestrictiveInAppBrowser()) {
      setShouldLoad(true);
    }
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "v35jgnj63w");
        `,
      }}
    />
  );
};

export default MicrosoftClarity;
