/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, MouseEvent } from "react";
import { NAV_LINKS } from "../data";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Classify if page has scrolled beyond key threshold
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Automatically hide/show bar based on scroll velocity direction
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false); // Scrolling down - conceal
      } else {
        setIsVisible(true); // Scrolling up - display
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="main-navigation-bar"
      className={`fixed top-0 left-0 w-full z-400 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-near-black/85 backdrop-blur-md py-4 border-b border-white/5 shadow-lg"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo with Champagne Gold highlights */}
        <a
          id="navbar-brand-logo"
          href="#"
          className="group flex items-baseline gap-1"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-gold transition-colors duration-300">
            one
          </span>
          <span className="font-sans font-black text-2xl text-gold group-hover:text-white transition-colors duration-300">
            8
          </span>
          <span className="w-[4px] h-[4px] bg-gold rounded-full ml-0.5" />
        </a>

        {/* Floating anchor list */}
        <div id="navbar-links" className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-xs font-mono font-medium tracking-widest text-white/60 hover:text-white transition-colors duration-300 relative py-1 group"
            >
              {link.label.toUpperCase()}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Gold Action Button & Cart Trigger */}
        <div id="navbar-action-ctas" className="flex items-center gap-3">
          <button
            id="navbar-cart-trigger"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2.5 bg-[#0E1012]/80 hover:bg-near-black border border-white/5 hover:border-gold/30 text-white hover:text-gold transition-all duration-300 relative group cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-near-black text-[8px] font-mono font-black rounded-full w-3 h-3 flex items-center justify-center animate-pulse scale-95">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-mono text-[9px] tracking-widest font-bold uppercase hidden sm:inline">
              DECK
            </span>
          </button>

          <a
            href="#collections"
            id="navbar-cta-btn"
            onClick={(e) => handleSmoothScroll(e, "#collections")}
            className="relative overflow-hidden px-5 py-2.5 bg-gold hover:bg-gold-hover text-near-black text-[10px] font-mono font-black tracking-widest uppercase transition-all duration-300 transform active:scale-95 shadow-md shadow-gold/25"
          >
            SHOP CONCEPT
          </a>
        </div>
      </div>
    </nav>
  );
}
