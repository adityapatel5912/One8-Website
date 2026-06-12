/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "drag" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports hover events (touch screen exclusion)
    const mediaQuery = window.matchMedia("(any-hover: hover)");
    setIsMobile(!mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const getCursorTypeForElement = (el: HTMLElement | null): "default" | "hover" | "drag" | "view" => {
      if (!el) return "default";
      const hoverElement = el.closest("[data-cursor]");
      if (hoverElement) {
        const type = hoverElement.getAttribute("data-cursor");
        if (type === "drag" || type === "view" || type === "hover") {
          return type as any;
        }
        return "hover";
      }
      if (el.closest("a, button, [role='button'], input, select, textarea, .cursor-pointer")) {
        return "hover";
      }
      return "default";
    };

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition((prev) => {
        if (!isVisible) {
          // Initialize position directly to cursor on first movement, avoiding annoying (0,0) corner fly-in animation
          setPosition({ x: e.clientX, y: e.clientY });
        }
        return { x: e.clientX, y: e.clientY };
      });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target) {
        setCursorType(getCursorTypeForElement(target));
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [isVisible]);

  // Linear interpolation for smooth trailing action
  useEffect(() => {
    if (isMobile || !isVisible) return;

    let animationFrameId: number;
    const lerp = () => {
      setPosition((prev) => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        // Adjust speed for realistic weighted drag (inertia)
        const speed = 0.16;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animationFrameId = requestAnimationFrame(lerp);
    };

    animationFrameId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPosition, isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  const cursorStyles: Record<typeof cursorType, string> = {
    default: "w-3 h-3 bg-white",
    hover: "w-10 h-10 border border-gold bg-gold/15 scale-110",
    drag: "w-16 h-16 bg-gold text-near-black font-mono font-bold text-[10px] tracking-widest",
    view: "w-16 h-16 bg-white/90 text-near-black font-mono font-bold text-[10px] tracking-widest",
  };

  return (
    <div
      id="custom-cursor"
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-550 select-none will-change-transform mix-blend-difference"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Morphing element inside (transitions width, border, scaling without fighting translation coordinates) */}
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out ${cursorStyles[cursorType]}`}
      >
        {cursorType === "drag" && (
          <span className="animate-pulse mix-blend-normal">DRAG</span>
        )}
        {cursorType === "view" && (
          <span className="animate-pulse mix-blend-normal">VIEW</span>
        )}
      </div>
    </div>
  );
}
