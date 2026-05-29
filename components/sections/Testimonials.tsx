"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[index];

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 bg-obsidian" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-16">
          05 — From Our Clients
        </p>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              {/* Baby-blue hairline */}
              <div className="w-12 h-[1px] bg-mist mb-10" />

              <blockquote className="font-display italic text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-frost mb-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-6 h-[1px] bg-mist/30" />
                <div>
                  <p className="font-sans text-[13px] text-platinum">
                    {t.author}, {t.location}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.15em] text-platinum/40 mt-1">
                    {t.vehicle}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={prev}
            className="font-mono text-[11px] tracking-[0.2em] text-platinum/50 hover:text-frost transition-colors duration-300 uppercase"
          >
            ← Prev
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-[1px] transition-all duration-500 ${
                  i === index ? "w-8 bg-mist" : "w-3 bg-platinum/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="font-mono text-[11px] tracking-[0.2em] text-platinum/50 hover:text-frost transition-colors duration-300 uppercase"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
