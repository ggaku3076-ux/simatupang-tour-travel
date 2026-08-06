import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
  useEffect(() => {
    // Detect mobile touch to prevent overriding native 120Hz/60Hz touch scroll momentum
    const isMobileTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    if (isMobileTouch) {
      return; // Use native smooth touch scrolling on mobile to eliminate lag completely
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);
};
