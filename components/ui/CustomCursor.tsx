"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const ringY = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20 });
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const ringXRaw = useMotionValue(-100);
  const ringYRaw = useMotionValue(-100);
  const springRingX = useSpring(ringXRaw, { stiffness: 150, damping: 20 });
  const springRingY = useSpring(ringYRaw, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      setIsHidden(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringXRaw.set(e.clientX);
      ringYRaw.set(e.clientY);
    };

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setLabel(cursorLabel || "");
      setIsHovering(true);
    };

    const onLeaveInteractive = () => {
      setLabel("");
      setIsHovering(false);
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive as EventListener);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, [data-cursor]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive as EventListener);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [dotX, dotY, ringXRaw, ringYRaw]);

  if (isHidden) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-mist" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          x: springRingX,
          y: springRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
        }}
        transition={{ duration: 0.3, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        <div
          className="w-full h-full rounded-full border border-mist/40 flex items-center justify-center"
          style={{ transition: "background 0.3s" }}
        >
          {label && (
            <span className="text-[9px] font-mono tracking-widest text-mist uppercase leading-none">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
