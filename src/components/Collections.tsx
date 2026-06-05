/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { COLLECTIONS } from "../data";
import { products } from "../lib/products";
import { useCart } from "../context/CartContext";

export default function Collections() {
  const { openProductDetails, addToCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    setShowLeftArrow(el.scrollLeft > 10);
    // Add small buffer for round-offs
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition, { passive: true });
      // Initial check
      checkScrollPosition();
    }
    return () => el?.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const slide = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="collections"
      className="relative min-h-screen w-full bg-[#0A0A0A] py-24 md:py-32 flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-grain z-10" />

      {/* Ambient background accent */}
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full glow-spotlight blur-3xl z-0 pointer-events-none opacity-40 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
        <div className="max-w-2xl space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
            018 // THE CURATED DECKS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase leading-none">
            THE 2026 ARCHIVES
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
            An absolute structural convergence of performance and premium sub-design lines, fully optimized for the 2026 season.
          </p>
        </div>

        {/* Custom luxury slide arrows */}
        <div className="flex items-center gap-4 mt-6 md:mt-0 z-30">
          <button
            onClick={() => slide("left")}
            disabled={!showLeftArrow}
            className={`p-4 border rounded-none transition-all duration-300 ${
              showLeftArrow
                ? "border-white/20 hover:border-gold text-white hover:text-gold cursor-pointer"
                : "border-white/5 text-white/10 cursor-not-allowed"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => slide("right")}
            disabled={!showRightArrow}
            className={`p-4 border rounded-none transition-all duration-300 ${
              showRightArrow
                ? "border-white/20 hover:border-gold text-white hover:text-gold cursor-pointer"
                : "border-white/5 text-white/10 cursor-not-allowed"
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Slider Area - Mouse cursor turns into "DRAG" circle */}
      <div
        id="collections-slide-wrapper"
        className="w-full relative z-20 select-none cursor-grab active:cursor-grabbing"
        data-cursor="drag"
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-scroll overflow-y-hidden px-6 md:px-12 xl:px-40 pb-16 no-scrollbar snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {COLLECTIONS.map((card) => {
            return (
              <div
                key={card.id}
                className="snap-start flex-shrink-0 w-[80vw] sm:w-[480px] md:w-[440px] xl:w-[460px] aspect-[4/5] bg-[#0D0D0D] border border-white/5 hover:border-gold transition-all duration-700 ease-out group relative flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/80"
              >
                {/* Parallax / zooming card artwork */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10 z-10 transition-opacity duration-500 group-hover:opacity-85" />
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000 ease-out brightness-[0.45] group-hover:brightness-[0.4] will-change-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Top Information Block */}
                <div className="relative z-20 p-8 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gold font-semibold uppercase">
                      {card.category}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase leading-tight mt-1 group-hover:text-gold transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 border border-white/5 bg-[#0A0A0A]/60 px-2 py-1 font-bold">
                    {card.year}
                  </span>
                </div>

                {/* Card Lower Hover Block */}
                <div className="relative z-20 p-8 space-y-6 bg-gradient-to-t from-near-black/90 to-transparent">
                  <p className="text-xs text-white/50 group-hover:text-white/70 line-clamp-3 leading-relaxed font-light transition-colors duration-300">
                    {card.description}
                  </p>

                  <div className="overflow-hidden pt-2">
                    <div className="flex items-center gap-2 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out text-gold text-xs font-mono font-black tracking-widest uppercase">
                      <span>EXPLORE SPEC</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Corner highlight lines */}
                <div className="absolute top-0 right-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-700 delay-100" />
                <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-700 delay-100" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 flex gap-4 select-none mt-4 justify-between items-center text-white/30 font-mono text-[9px] tracking-widest border-b border-white/5 pb-10">
        <span>SWIPE OR DRAG HORIZONTALLY TO EXPLORE DECK</span>
        <span>ONE8 DESIGN DIVISION // 2026 SPECIFICATION</span>
      </div>

      {/* Premium Product Directory Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 mt-32">
        <div className="border-b border-white/5 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
              018 // THE CURATED GEAR
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase leading-none">
              REAL-TIME CATALOG INDEX
            </h3>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Explore individual technical athletic gear pieces from our active roster. Link directly to the official registries for real availability checks.
            </p>
          </div>
          <p className="text-right font-mono text-[9px] tracking-widest text-[#444] select-none uppercase">
            SORT // ALPHABETICAL CODEWAY
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const isFragrance = product.category.toLowerCase().includes("fragrance");
            const defaultSize = isFragrance ? "100ml" : "UK 9";

            return (
              <div
                key={product.id}
                className="group bg-[#0D0D0D] border border-white/5 hover:border-gold transition-all duration-500 flex flex-col h-full relative cursor-pointer"
                id={`product-card-${product.id}`}
                onClick={() => openProductDetails(product)}
              >
                {/* Product Image Frame */}
                <div className="aspect-[4/5] w-full overflow-hidden relative bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-65 group-hover:opacity-40 transition-opacity duration-300" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out brightness-[0.6] group-hover:brightness-[0.8]"
                  />
                  
                  {/* Embedded Hover View Trigger with dual action links */}
                  <div className="absolute inset-0 flex flex-col gap-3.5 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 px-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductDetails(product);
                      }}
                      className="w-full py-2.5 border border-gold font-mono text-[9px] tracking-widest text-gold bg-near-black/90 font-bold uppercase backdrop-blur-subtle hover:bg-gold hover:text-near-black transition-colors"
                    >
                      VIEW DETAILED SPEC
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1, defaultSize);
                      }}
                      className="w-full py-2.5 bg-gold border border-gold font-mono text-[9px] tracking-widest text-near-black font-black uppercase hover:bg-gold-hover transition-colors"
                    >
                      QUICK ADD TO DECK
                    </button>
                  </div>
                </div>

                {/* Product Info detail panel */}
                <div className="p-6 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#0D0D0D] to-black">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] font-mono tracking-widest text-gold font-bold uppercase">
                        {product.category}
                      </span>
                      <span className="text-[8px] font-mono text-white/35 uppercase">
                        {defaultSize}
                      </span>
                    </div>
                    <h4 className="font-display font-medium text-sm text-white tracking-tight uppercase transition-colors group-hover:text-gold line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-white/40 leading-relaxed font-light line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">PRICE</span>
                      <span className="font-mono text-sm font-black text-white group-hover:text-gold transition-colors">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1, defaultSize);
                      }}
                      className="p-2 border border-white/5 hover:border-gold hover:text-gold text-white/40 bg-[#0E1012] transition-all duration-300"
                      title="Add to Loadout"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Corner accent lines */}
                <span className="absolute top-0 right-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-700 delay-100" />
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-700 delay-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
