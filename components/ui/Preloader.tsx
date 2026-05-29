"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 900);
        }, 300);
      }
      setCount(current);
    }, 40);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-ink flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
        >
          {/* Logo */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="Bubbles Auto Detail"
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Counter */}
          <div className="font-mono text-[11px] tracking-[0.3em] text-platinum">
            <motion.span
              key={count}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {String(count).padStart(2, "0")}
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-[1px] bg-mist/20 w-full">
            <motion.div
              className="h-full bg-mist"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.04 }}
            />
          </div>

          {/* Panel split on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink origin-top"
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink origin-bottom"
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
