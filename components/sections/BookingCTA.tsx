"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function BookingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      className="relative py-32 md:py-48 px-6 md:px-10 lg:px-16 bg-ink overflow-hidden"
      ref={ref}
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-deep/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="overflow-hidden mb-3">
          <motion.p
            className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase"
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            06 — Reserve
          </motion.p>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h2
            className="font-display text-[clamp(3rem,7vw,8rem)] leading-[0.88] tracking-[-0.04em] text-frost"
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ delay: 0.1, duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            Bring it in.
          </motion.h2>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-start gap-10 mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-[0.2em] text-platinum/40 uppercase">Address</p>
            <p className="font-sans text-[13px] text-platinum leading-relaxed">
              2818 Olympic Blvd<br />
              Los Angeles, CA 90006
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-[0.2em] text-platinum/40 uppercase">Hours</p>
            <p className="font-sans text-[13px] text-platinum leading-relaxed">
              Mon–Fri 8am–6pm<br />
              Sat 9am–4pm
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-[0.2em] text-platinum/40 uppercase">Phone</p>
            <p className="font-sans text-[13px] text-platinum">+1 (310) 555-0192</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
        >
          <MagneticButton
            as="a"
            href="/book"
            dataCursor="BOOK"
            className="border border-mist/40 hover:border-mist px-10 py-5 transition-all duration-700 group"
          >
            <span className="font-mono text-[12px] tracking-[0.3em] text-mist uppercase group-hover:text-frost transition-colors duration-500">
              Reserve a Slot →
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
