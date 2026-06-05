/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Heart, MessageCircle, Instagram } from "lucide-react";
import { INSTAGRAM_POSTS } from "../data";

export default function SocialGallery() {
  const [revealedTiles, setRevealedTiles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const tileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setRevealedTiles((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const tiles = document.querySelectorAll(".instagram-masonry-tile");
    tiles.forEach((tile) => tileObserver.observe(tile));

    return () => tileObserver.disconnect();
  }, []);

  // Bento configuration so we have dynamic, high-end rhythmic variations in heights & widths (editorial)
  const bentoGridClasses = [
    "md:col-span-4 md:row-span-2 h-[350px] md:h-[550px]", // Tile 1 (large editorial vertical portrait)
    "md:col-span-4 h-[260px] md:h-[260px]", // Tile 2 (horizontal square)
    "md:col-span-4 md:row-span-2 h-[350px] md:h-[550px]", // Tile 3 (tall column)
    "md:col-span-4 h-[260px] md:h-[260px] md:-mt-[290px] md:h-[260px]", // Tile 4 (shifted bento row)
  ];

  return (
    <section
      id="social"
      className="relative min-h-screen w-full bg-[#0D0D0D] py-24 md:py-36 overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Atmospheric lighting backdrop */}
      <div className="absolute top-1/3 right-1/12 w-[500px] h-[500px] rounded-full glow-spotlight blur-3xl z-0 pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <Instagram className="w-4 h-4 text-gold" />
            <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
              @ONE8STORE // THE EDIT DIRECT
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase leading-none">
            SOCIAL TRANSMISSION
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
            Real-time visual reports of high-performance gear, designed and cataloged for the active elite of the 2026 season. Feel the community energy.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 z-20 relative">
          {INSTAGRAM_POSTS.map((post, index) => {
            const bentoClass =
              index === 0
                ? "md:col-span-8 h-[350px] md:h-[480px]" // Large landscape lead
                : index === 1
                ? "md:col-span-4 h-[350px] md:h-[480px]" // Compact portait
                : index === 2
                ? "md:col-span-4 h-[350px] md:h-[440px]" // Vertical square
                : index === 3
                ? "md:col-span-4 h-[350px] md:h-[440px]" // Vertical grid
                : index === 4
                ? "md:col-span-4 h-[350px] md:h-[440px]" // Vertical item
                : "md:col-span-12 h-[280px] md:h-[350px]"; // Full-bleed footer showcase

            // Calculate staggered float speed to give random organic lift effect
            const floatDelay = `${index * 0.4}s`;
            const floatDuration = `${6 + (index % 2) * 2}s`;

            return (
              <div
                key={post.id}
                data-id={post.id}
                className={`instagram-masonry-tile relative bg-near-black border border-white/5 group overflow-hidden shadow-xl shadow-black/60 cursor-pointer will-change-transform ${bentoClass} ${
                  revealedTiles[post.id]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${(index % 3) * 150}ms`,
                  // Dynamic subtle float animation block
                  animation: `breathe-float ${floatDuration} ease-in-out infinite alternate`,
                  animationDelay: floatDelay,
                }}
              >
                {/* Style sheet for inline float breathe trick */}
                <style>{`
                  @keyframes breathe-float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-8px) rotate(0.4deg); }
                  }
                `}</style>

                {/* Cover art background container with Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/10 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover object-center filter grayscale contrast-[1.1] brightness-[0.45] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.4] transition-all duration-1000 ease-out will-change-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Top Overlay metadata */}
                <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[10px] tracking-widest text-gold font-bold">
                    @ONE8STORE
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {post.date}
                  </span>
                </div>

                {/* Main Content Info Block in Lower Canvas */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-4">
                  {/* Hearts / Comments counter indicators */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-white/50 group-hover:text-gold transition-colors duration-300">
                      <Heart className="w-3.5 h-3.5 fill-transparent group-hover:fill-gold group-hover:text-gold" />
                      <span className="font-mono text-xs font-bold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50 group-hover:text-white transition-colors duration-300">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs font-bold">{post.comments}</span>
                    </div>
                  </div>

                  {/* Caption statement */}
                  <p className="text-xs text-white/40 group-hover:text-white/85 line-clamp-2 leading-relaxed font-light transition-colors duration-500">
                    {post.caption}
                  </p>
                </div>

                {/* Border frames that expand trigger on hover */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
                <div className="absolute top-0 right-0 w-[1.5px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-[1.5px] h-full bg-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="mt-16 text-center select-none z-20 relative">
          <a
            href="https://one8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 py-4 px-10 border border-white/10 hover:border-gold/40 text-white font-mono text-[10px] tracking-widest font-black uppercase hover:bg-gold hover:text-near-black hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-md"
          >
            JOIN @ONE8STORE ON INSTAGRAM
          </a>
        </div>

      </div>
    </section>
  );
}
