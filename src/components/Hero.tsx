/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { MoveRight, ArrowDown } from "lucide-react";
import { BRAND_TAGLINE, BRAND_TAGLINE_SUB } from "../data";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Staggered load trigger
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSmoothScroll = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Convert "ALWAYS PLAY" to split letters for elite text reveal styling
  const taglineWords = BRAND_TAGLINE.split(" ");

  return (
    <section
      id="hero-cinematic"
      className="relative min-h-screen w-full bg-near-black flex items-center overflow-hidden pt-20"
    >
      {/* Film Grain Texture layer */}
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Dynamic Dramatic Spotlight Grid */}
      <div className="absolute inset-0 z-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(10,10,10,0.95)_100%] opacity-90" />

      {/* Atmospheric Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full glow-spotlight blur-3xl z-0 pointer-events-none" />

      {/* Hero Performance Photo with dynamic subtle zoom-in container */}
      <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-near-black via-near-black/75 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-near-black to-transparent z-10" />
        <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-near-black to-transparent z-10" />
        
        <img
          src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1400"
          alt="Virat Kohli Training Focus - One8 Redesign Concept"
          className={`w-full h-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.45] transition-transform duration-3000 ease-out will-change-transform ${
            isLoaded ? "scale-100" : "scale-115"
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 z-20 flex flex-col justify-center min-h-[80vh]">
        {/* Concept Portfolio Marker */}
        <div
          className={`flex items-center gap-2 mb-6 transition-all duration-1000 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
          <p className="text-[10px] font-mono tracking-[0.3em] text-gold font-bold uppercase">
            CONCEPT REDESIGN BY ADITYA PATEL
          </p>
        </div>

        {/* Oversized Brand Tagline splits */}
        <h1
          id="hero-editorial-tagline"
          className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-white flex flex-col uppercase select-none"
        >
          {taglineWords.map((word, wordIndex) => (
            <span key={wordIndex} className="overflow-hidden block py-1.5">
              <span
                className={`inline-block transition-transform duration-1200 ease-out will-change-transform ${
                  isLoaded ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: `${wordIndex * 250}ms` }}
              >
                {wordIndex === 1 ? (
                  <span className="text-gold selection:text-white">{word}</span>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* Brand Sub / Virat Kohli Signature Attribution */}
        <p
          id="hero-tagline-attribution"
          className={`text-[11px] sm:text-xs font-mono tracking-[0.4em] text-white/50 font-medium max-w-md mt-6 transition-all duration-1000 delay-500 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {BRAND_TAGLINE_SUB}
        </p>

        {/* Actions panel */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mt-12 transition-all duration-1100 delay-700 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => handleSmoothScroll("#reveal")}
            data-cursor="view"
            className="group flex items-center justify-between gap-6 px-8 py-5 bg-white text-near-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-gold hover:text-near-black shadow-lg shadow-white/5 active:scale-98"
          >
            DISCOVER THE GEAR
            <MoveRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          <button
            onClick={() => handleSmoothScroll("#collections")}
            className="group flex items-center justify-center gap-2 px-8 py-5 border border-white/10 hover:border-gold/40 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-300 active:scale-98"
          >
            THE 2026 COLLECTIONS
          </button>
        </div>
      </div>

      {/* Decorative Slide Indicator Anchor */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000 ${
          isLoaded ? "opacity-60" : "opacity-0"
        }`}
      >
        <span className="text-[9px] font-mono tracking-widest text-white/40">
          SCROLL
        </span>
        <button
          onClick={() => handleSmoothScroll("#story")}
          className="p-1 rounded-full border border-white/10 hover:border-gold/20 text-white/40 hover:text-gold transition-colors duration-300"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>

      {/* Performance coordinates */}
      <div className="absolute right-12 bottom-12 z-25 hidden xl:flex flex-col gap-1 items-end select-none pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
          LATITUDE. 12° 58' N
        </span>
        <span className="text-[9px] font-mono text-white/40">
          PORTFOLIO ARCHIVE / ADITYA PATEL
        </span>
      </div>
    </section>
  );
}
