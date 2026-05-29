"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data";

export function ServicesPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-24 md:py-40 bg-obsidian" ref={ref}>
      <div className="px-6 md:px-10 lg:px-16 mb-16">
        <div className="overflow-hidden">
          <motion.p
            className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase"
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            02 — Services
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-frost/5">
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            className="group border-r border-frost/5 last:border-r-0 p-8 md:p-10 relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/30 transition-colors duration-700" />

            <div className="relative z-10">
              {/* Number */}
              <p className="font-mono text-[10px] tracking-[0.3em] text-mist/60 mb-8">
                {svc.number}
              </p>

              {/* Name */}
              <h3 className="font-display text-2xl md:text-3xl text-frost mb-2 leading-tight">
                {svc.name}
              </h3>
              <p className="font-sans text-[12px] text-platinum italic mb-6">
                {svc.tagline}
              </p>

              {/* Description */}
              <p className="font-sans text-[13px] text-platinum/70 leading-relaxed mb-8">
                {svc.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-platinum/50 uppercase">from</span>
                <span className="font-display text-3xl text-frost">{svc.priceFrom}</span>
              </div>

              {/* Feature list — reveals on hover */}
              <ul className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {svc.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className="w-[3px] h-[3px] rounded-full bg-mist flex-shrink-0" />
                    <span className="font-sans text-[11px] text-platinum/80">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom: duration + link */}
              <div className="mt-10 pt-6 border-t border-frost/5 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.15em] text-platinum/40 uppercase">
                  {svc.duration}
                </span>
                <a
                  href={`/services#${svc.id}`}
                  className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase hover:text-frost transition-colors duration-300"
                >
                  Details →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
