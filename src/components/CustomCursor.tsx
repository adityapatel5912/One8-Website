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

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverElement = target.closest("[data-cursor]");
      if (hoverElement) {
        const type = hoverElement.getAttribute("data-cursor");
        if (type === "drag" || type === "view" || type === "hover") {
          setCursorType(type as any);
        } else {
          setCursorType("hover");
        }
      } else {
        const isClickable = target.closest("a, button, [role='button'], input, select");
        if (isClickable) {
          setCursorType("hover");
        } else {
          setCursorType("default");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Linear interpolation for smooth trailing action
  useEffect(() => {
    if (isMobile || !isVisible) return;

    let animationFrameId: number;
    const lerp = () => {
      setPosition((prev) => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        // Adjust speed for realistic weighted drag
        const speed = 0.15;
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
    hover: "w-10 h-10 border border-gold bg-gold/10 scale-125",
    drag: "w-16 h-16 bg-gold text-near-black font-mono font-bold text-[10px] tracking-widest",
    view: "w-16 h-16 bg-white/90 text-near-black font-mono font-bold text-[10px] tracking-widest",
  };

  return (
    <div
      id="custom-cursor"
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-550 rounded-full flex items-center justify-center transition-all duration-300 ease-out select-none will-change-transform mix-blend-difference ${cursorStyles[cursorType]}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) ${
          cursorType === "drag" || cursorType === "view" ? "" : ""
        }`,
      }}
    >
      {cursorType === "drag" && (
        <span className="animate-pulse mix-blend-normal">DRAG</span>
      )}
      {cursorType === "view" && (
        <span className="animate-pulse mix-blend-normal">VIEW</span>
      )}
    </div>
  );
}
