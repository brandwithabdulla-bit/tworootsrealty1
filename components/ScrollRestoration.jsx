'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Force manual scroll restoration so browser never restores clamped scroll to footer
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    // 2. On mount / reload: if there is a hash or it's a reload, clear anchor hash and reset to top
    try {
      const navEntries = performance.getEntriesByType('navigation');
      const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

      if (isReload || window.location.hash) {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        resetToTop();
      }
    } catch {
      resetToTop();
    }

    // Run reset immediately and on subsequent animation frames to prevent delayed SSR / image expansion clamps
    resetToTop();
    const frameId = requestAnimationFrame(resetToTop);
    const timeoutId = setTimeout(resetToTop, 50);
    const timeoutId2 = setTimeout(resetToTop, 150);

    // 3. Before unloading (when user hits reload or leaves), reset scroll to 0 so browser never saves footer offset
    const handleBeforeUnload = () => {
      resetToTop();
    };

    // 4. Handle pageshow (including back/forward navigation or bfcache)
    const handlePageShow = (e) => {
      if (e.persisted) {
        resetToTop();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // On client-side route change, ensure scroll is always at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
