/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState, FormEvent, MouseEvent } from "react";
import { Mail, ArrowRight, Github, Heart, MessageSquare } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const handleScrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className="relative bg-near-black pt-24 pb-12 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Atmospheric bottom golden flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-gold/5 blur-[120px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        
        {/* Newsletter Bar & Shimmer Section */}
        <div
          className={`bg-[#0D0D0D] border border-white/5 p-8 md:p-12 mb-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12 transition-all duration-1000 transform ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="max-w-md space-y-2">
            <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase">
              018 // TRANSMISSION TUNNEL
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight uppercase leading-none">
              SUBSCRIBE TO ACTIVE SPECS
            </h3>
            <p className="text-xs text-white/45 leading-relaxed font-light">
              Gain instant access to technical athletic product launches, luxury Virat Kohli collection releases, and members-only concept showcases.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative w-full lg:max-w-md flex flex-col sm:flex-row gap-4 items-stretch">
            {isSubscribed ? (
              <div className="bg-gold/10 border border-gold text-gold font-mono text-[10px] tracking-widest font-bold py-4 px-6 flex-grow flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
                TRANSMISSION TARGET LOCKED. SUCCESS.
              </div>
            ) : (
              <>
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    required
                    placeholder="ENTER COUTURE EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 hover:border-white/20 focus:border-gold py-4 pl-12 pr-6 text-xs text-white placeholder-white/30 font-mono tracking-widest outline-none transition-all duration-300"
                  />
                </div>

                {/* Sparkling Champagne gold shimmer button layout */}
                <button
                  type="submit"
                  className="group relative overflow-hidden bg-gold hover:bg-gold-hover text-near-black text-xs font-mono font-black tracking-widest uppercase py-4 px-8 flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95"
                >
                  {/* Subtle sweep line overlay */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <style>{`
                    @keyframes shimmer {
                      100% { transform: translateX(250%); }
                    }
                    .animate-shimmer {
                      animation: shimmer 1s ease-out;
                    }
                  `}</style>
                  SUBSCRIBE
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Dynamic Directory Index */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <a href="#" onClick={handleScrollToTop} className="font-display font-black text-2xl tracking-tighter text-white flex items-baseline gap-0.5">
              <span>one</span>
              <span className="text-gold">8</span>
              <span className="w-1 h-1 bg-gold rounded-full ml-0.5" />
            </a>
            <p className="text-[11px] text-white/40 leading-relaxed font-light">
              Premium physical luxury and athletic couture engineered side-by-side with Virat Kohli. Spec-built for the year 2026.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-gold font-black uppercase">
              DIRECTORY
            </h4>
            <ul className="space-y-2 text-xs font-light text-white/50">
              <li><a href="#story" className="hover:text-white transition-colors duration-200">The Story</a></li>
              <li><a href="#reveal" className="hover:text-white transition-colors duration-200">Gear Reveal</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors duration-200">Performance stats</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors duration-200">2026 Collections</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-gold font-black uppercase">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-xs font-light text-white/50">
              <li><a href="https://one8.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">Official One8</a></li>
              <li><a href="https://one8.com/products" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">Catalog Registry</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Concept Blueprint</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">System Telemetry</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-gold font-black uppercase">
              SOCIAL CONNECT
            </h4>
            <ul className="space-y-2 text-xs font-light text-white/50">
              <li><a href="https://instagram.com/one8store" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors duration-200">@one8store</a></li>
              <li><a href="https://instagram.com/virat.kohli" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">@virat.kohli</a></li>
              <li><a href="https://twitter.com/imVkohli" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">Twitter Spec</a></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-gold font-black uppercase">
              CONCEIVED BY
            </h4>
            <div className="flex flex-col gap-2 bg-charcoal border border-white/5 p-4 rounded-none">
              <span className="text-[11px] font-mono font-bold text-white tracking-widest uppercase">
                ADITYA PATEL
              </span>
              <span className="text-[9px] font-mono text-white/40 uppercase">
                PORTFOLIO EDITION // WEB SPEC
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[9px] font-mono text-gold hover:text-white transition-colors duration-200 mt-2"
              >
                <Github className="w-3 h-3" />
                EXPLORE WORK
              </a>
            </div>
          </div>

        </div>

        {/* Giant Watermarked background logo branding */}
        <div className="relative select-none pointer-events-none w-full flex justify-center py-6 border-t border-b border-white/5 overflow-hidden">
          <span className="font-display font-black text-[12vw] tracking-tighter leading-none text-white/[0.015] selection:bg-transparent uppercase">
            ONE8ATHLETICS
          </span>
        </div>

        {/* Lower Attribution Row */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-12 text-[#444] font-mono text-[10px] tracking-widest uppercase">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <span className="text-white/40 font-bold block">
              Website Redesign Concept by Aditya Patel
            </span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="text-white/20 select-none">
              Inspired by Puma x One8 Engineering
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>© 2026 ONE8. ALL RIGHTS RESERVED.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
