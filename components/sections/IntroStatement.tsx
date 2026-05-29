"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const words = ["We", "don't", "wash", "cars.", "We", "restore", "light."];

export function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-ink flex items-center justify-center"
    >
      <p className="font-display italic text-[clamp(2.5rem,5vw,6rem)] leading-[1.05] tracking-[-0.03em] text-center max-w-4xl">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
            <motion.span
              className="inline-block text-frost"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : { y: "100%" }}
              transition={{
                duration: 1,
                delay: i * 0.08,
                ease: [0.6, 0.01, 0.05, 0.95],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </p>
    </section>
  );
}
