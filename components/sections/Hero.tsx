"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LocalTime } from "@/components/ui/LocalTime";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { containerVariants, lineVariants, fadeVariants, LUXURY_EASE } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/80" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
        <Image
          src="/images/IMG_9282.jpg"
          alt="Black Porsche 911 in studio lighting"
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
      </div>

      {/* Top-right: local time */}
      <motion.div
        className="absolute top-20 right-6 md:right-10 lg:right-16 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: LUXURY_EASE }}
      >
        <LocalTime />
      </motion.div>

      {/* Bottom-right: Est. */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 lg:right-16 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: LUXURY_EASE }}
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-platinum uppercase">
          Est. 2014
        </span>
      </motion.div>

      {/* Bottom-left: scroll cue */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-10 lg:left-16 z-30 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: LUXURY_EASE }}
      >
        <motion.div
          className="w-[1px] h-12 bg-mist/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-[10px] tracking-[0.3em] text-platinum uppercase">
          Scroll
        </span>
      </motion.div>

      {/* Hero copy */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-10 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[90vw] md:max-w-[75vw] lg:max-w-[65vw]"
        >
          {/* Label */}
          <div className="overflow-hidden mb-6">
            <motion.div
              variants={lineVariants}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
            >
              <span className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase">
                01 — Automotive Atelier
              </span>
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="font-display leading-[0.88] tracking-[-0.04em] mb-8">
            <div className="overflow-hidden">
              <motion.div
                variants={lineVariants}
                transition={{ duration: 1.2, ease: LUXURY_EASE }}
                className="text-[clamp(3.5rem,8vw,10rem)] text-frost"
              >
                Concours-grade
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                variants={lineVariants}
                transition={{ duration: 1.2, ease: LUXURY_EASE }}
                className="text-[clamp(3.5rem,8vw,10rem)] italic text-frost"
              >
                care{" "}
                <span className="not-italic text-platinum">for</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                variants={lineVariants}
                transition={{ duration: 1.2, ease: LUXURY_EASE }}
              >
                <span className="text-[clamp(3.5rem,8vw,10rem)] text-frost">
                  collectors.
                </span>
                <motion.span
                  className="block h-[2px] bg-mist mt-2 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 1, ease: LUXURY_EASE }}
                />
              </motion.div>
            </div>
          </h1>

          {/* Sub-line + CTA */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: LUXURY_EASE }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10"
            >
              <p className="font-sans text-[13px] tracking-[0.05em] text-platinum max-w-xs leading-relaxed">
                By appointment only. Bay Area, CA.
                <br />
                Every vehicle treated as a commission.
              </p>
              <MagneticButton
                as="a"
                href="/book"
                dataCursor="BOOK"
                className="group border border-mist/40 hover:border-mist px-7 py-3.5 transition-all duration-700"
              >
                <span className="font-mono text-[11px] tracking-[0.3em] text-mist uppercase">
                  Reserve a Slot →
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
