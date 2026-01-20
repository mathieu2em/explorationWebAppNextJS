/**
 * Detects if the current browser is Instagram's in-app browser
 * Instagram's browser has strict CSP that blocks inline scripts
 */
export const isInstagramBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes('instagram');
};

/**
 * Detects if the current browser is any restrictive in-app browser
 * (Instagram, Facebook, LinkedIn, etc.)
 */
export const isRestrictiveInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    userAgent.includes('instagram') ||
    userAgent.includes('fban') || // Facebook app
    userAgent.includes('fbav') || // Facebook app
    userAgent.includes('linkedin')
  );
};
