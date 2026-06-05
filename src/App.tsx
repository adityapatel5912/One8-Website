/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStory from "./components/BrandStory";
import ProductReveal from "./components/ProductReveal";
import PerformanceShowcase from "./components/PerformanceShowcase";
import Collections from "./components/Collections";
import SocialGallery from "./components/SocialGallery";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  useEffect(() => {
    // Elegant fast countdown simulating high-end technical telemetry loading
    const interval = setInterval(() => {
      setLoadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // give slight linger for design impact
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        id="luxury-preloader-v2"
        className="fixed inset-0 bg-near-black flex flex-col justify-between p-8 md:p-16 z-550 select-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />

        {/* Header telemetry details */}
        <div className="flex justify-between items-start w-full">
          <div className="space-y-1">
            <h4 className="text-[10px] font-mono text-gold tracking-[0.3em] font-black uppercase">
              ONE8 REDESIGN PRELOAD INTEL
            </h4>
            <p className="text-[9px] font-mono text-white/35">
              HOST: CLOUDCONTAINER.INGRESS_3000
            </p>
          </div>
          <span className="text-[10px] font-mono text-gold font-semibold border border-white/5 bg-charcoal/75 px-2 py-1 font-bold">
            2026 EDITION
          </span>
        </div>

        {/* Center Logo branding scan */}
        <div className="flex flex-col items-center justify-center my-auto space-y-6">
          <div className="flex items-baseline gap-1 animate-pulse">
            <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter text-white">
              one
            </span>
            <span className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-gold">
              8
            </span>
            <span className="w-2.5 h-2.5 bg-gold rounded-full ml-1" />
          </div>

          <div className="space-y-2 w-full max-w-sm">
            <div className="h-[2px] bg-charcoal/40 w-full relative overflow-hidden">
              <div
                className="h-full bg-gold absolute left-0 top-0 transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, loadPercent)}%` }}
              />
            </div>
            
            <div className="flex justify-between font-mono text-[9px] tracking-widest text-white/40">
              <span className="animate-pulse">LOADING COUTURE CORE SERVICES...</span>
              <span className="text-gold font-bold">{Math.min(100, loadPercent)}%</span>
            </div>
          </div>
        </div>

        {/* Lower Attribution footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-8 border-t border-white/5 text-[#444] font-mono text-[10px] tracking-widest gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-white/40 font-black">
              WEBSITE REDESIGN CONCEPT BY ADITYA PATEL
            </p>
            <p className="text-[9px] text-white/20 font-light">
              REBUILD DESIGN AUDIT OF PUMA x ONE8 BRANDING
            </p>
          </div>
          <span>© 2026 COUTURE LABS</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-near-black text-white selection:bg-gold selection:text-near-black">
      {/* Background Subtle Grain Texture Layer across the entire application */}
      <div className="absolute inset-0 bg-grain z-1 pointer-events-none" />

      {/* Modern Cursor System */}
      <CustomCursor />

      {/* Progress system at top */}
      <ProgressBar />

      {/* Interactive global nav */}
      <Navbar />

      {/* Entire 7 section layout */}
      <main id="luxury8-scroller-track" className="relative z-10">
        <Hero />
        <BrandStory />
        <ProductReveal />
        <PerformanceShowcase />
        <Collections />
        <SocialGallery />
        <Footer />
      </main>
    </div>
  );
}
