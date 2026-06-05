/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

export default function ProductReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile viewport limits to suppress complex calc
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the viewport the section has scrolled
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Interpolate progress fraction (0 when entering bottom, 1 when exiting top)
      const visibleRange = viewportHeight + elementHeight;
      const progress = 1 - (elementTop + elementHeight) / visibleRange;
      
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollFraction(clamped);

      // Lock reveal state if scrolled past center
      if (clamped > 0.4) {
        setHasRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run immediately

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Compute spotlight sweep displacement based on scroll fraction
  // This moves the highlight beam across the shoe from left to right as the user scrolls
  const lightPositionX = isMobile ? 50 : Math.max(10, Math.min(90, scrollFraction * 100));

  const productName = "PRO.NITRO";
  const productSub = "CARBON-INFUSED PROPULSION SNEAKER";

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative min-h-screen w-full bg-near-black py-24 md:py-32 flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Dynamic Dramatic Light Sweep backplates */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out z-0"
        style={{
          background: isMobile
            ? "radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.15) 0%, rgba(0,0,0,0) 65%)"
            : `radial-gradient(circle at ${lightPositionX}% 45%, rgba(201, 168, 76, 0.18) 0%, rgba(201, 168, 76, 0.03) 40%, rgba(0, 0, 0, 0) 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left Column: Descriptive Stats / Luxury Product Details */}
        <div id="product-left-philosophy" className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-1">
          <div className="border-l-2 border-gold/40 pl-6 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
              ENG. COLLAB / 018
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
              SCULPTED FROM PURE VELOCITY
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Crafted in collaboration with Virat Kohli. The Pro Nitro is sculpted meticulously to bridge the absolute demands of dynamic pitch training with executive runway aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-charcoal/45 p-6 border border-white/5">
              <span className="text-xs font-mono text-white/40 block mb-1">CUSHION</span>
              <p className="text-base font-display font-bold text-white">NITRO-PLATE</p>
              <div className="w-8 h-[2px] bg-gold mt-2" />
            </div>
            <div className="bg-charcoal/45 p-6 border border-white/5">
              <span className="text-xs font-mono text-white/40 block mb-1">STABILIZER</span>
              <p className="text-base font-display font-bold text-white">CARBON-BAR</p>
              <div className="w-8 h-[2px] bg-gold mt-2" />
            </div>
          </div>
        </div>

        {/* Center Screen: Majestic Floating Sneaker */}
        <div id="product-center-display" className="lg:col-span-5 flex flex-col items-center justify-center relative py-12 order-1 lg:order-2">
          
          {/* Ambient Breathing Glow underneath */}
          <div className="absolute bottom-4 w-[280px] h-[35px] bg-gold rounded-full filter blur-[35px] animate-glow-breathe z-0" />

          {/* Majestic Shoe Canvas with Interactive Shadows */}
          <div
            className={`relative z-10 transition-all duration-1000 ease-out transform ${
              hasRevealed ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-40 translate-y-8"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=900"
              alt="One8 Pro Nitro Luxury Silhouette"
              className="w-full max-w-[420px] object-contain drop-shadow-[0_20px_40px_rgba(201,168,76,0.18)] grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out rotate-[-12deg] cursor-pointer"
              referrerPolicy="no-referrer"
              data-cursor="view"
            />
          </div>

          <div className="mt-8 text-center select-none">
            <p className="text-[10px] font-mono tracking-[0.25em] text-white/40">
              LIGHT Sweep: ON SCROLL REVEAL INTERACTION
            </p>
          </div>
        </div>

        {/* Right Column: Title + Split Presentation specs */}
        <div id="product-right-meta" className="lg:col-span-3 flex flex-col justify-center order-3 space-y-8">
          <div className="space-y-2">
            {/* Split Title letters mimicking custom typography */}
            <div className="overflow-hidden">
              <h2 className="font-display font-black text-6xl md:text-7xl lg:text-7xl text-white tracking-tighter leading-none uppercase">
                {productName.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-transform duration-700 ease-out ${
                      hasRevealed ? "translate-y-0" : "translate-y-[110%]"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </h2>
            </div>
            <p className="text-xs font-mono tracking-widest text-gold font-bold uppercase">
              {productSub}
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-white/5">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-mono text-white/40">SPECIFICATION</span>
              <span className="text-xs font-mono text-white/80">018-CARBON</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-mono text-white/40">COLORWAY</span>
              <span className="text-xs font-mono text-gold font-bold">OBSIDIAN / CHAMPAGNE</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-mono text-white/40">AVAILABILITY</span>
              <span className="text-xs font-mono text-white/80">LIMITED CONCEPT RELEASE</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#collections"
              className="inline-block py-4 px-6 border border-gold text-gold font-mono text-[10px] tracking-widest font-bold uppercase hover:bg-gold hover:text-near-black hover:scale-[1.03] active:scale-95 transition-all duration-300 w-full text-center"
            >
              RESERVE SNEAKER (2026 EDITION)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
