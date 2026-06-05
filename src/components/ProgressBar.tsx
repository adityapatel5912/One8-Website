/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) return;
      
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(currentProgress);

      // Fade out progress bar when near the bottom of the page (near footer)
      const footerOffset = document.documentElement.scrollHeight - window.innerHeight - 200;
      if (window.scrollY > footerOffset) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="scroll-progress-container"
      className={`fixed top-0 left-0 w-full h-[3px] bg-charcoal/40 z-500 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        id="scroll-progress-fill"
        className="h-full bg-gold shadow-md shadow-gold/40 transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
