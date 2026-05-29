"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { work } from "@/lib/data";

const featured = work.slice(0, 5);

const gridLayouts = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
];

export function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-16 bg-ink" ref={ref}>
      <div className="flex items-end justify-between mb-16">
        <div>
          <div className="overflow-hidden mb-3">
            <motion.p
              className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              03 — Selected Work
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.5rem,4vw,5rem)] leading-[0.92] tracking-[-0.03em] text-frost"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              Recent commissions.
            </motion.h2>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            href="/work"
            className="hidden md:inline-flex font-mono text-[10px] tracking-[0.25em] text-platinum uppercase hover:text-mist transition-colors duration-300"
          >
            View All →
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-2 md:h-[80vh]">
        {featured.map((item, i) => (
          <motion.div
            key={item.slug}
            className={`relative overflow-hidden group ${gridLayouts[i]}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.9, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            <Link href={`/work/${item.slug}`}>
              <div className="relative w-full h-64 md:h-full min-h-[240px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.6,0.01,0.05,0.95)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors duration-700" />

                {/* Info overlay on hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.6,0.01,0.05,0.95)]">
                  <div className="bg-ink/80 backdrop-blur-sm p-4">
                    <p className="font-mono text-[9px] tracking-[0.25em] text-mist uppercase mb-1">
                      {item.year} — {item.service}
                    </p>
                    <h3 className="font-display text-xl text-frost leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
