"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    name: "Inspection",
    description: "Under 10,000-lux inspection lights, we document every imperfection — swirl marks, scratches, water etching, paint transfer. Baseline paint depth readings taken per panel.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=85",
  },
  {
    number: "02",
    name: "Decontamination",
    description: "Iron fallout dissolving, clay bar treatment, citrus pre-wash and pH-neutral hand wash. The surface is chemically and physically clean before any polishing begins.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85",
  },
  {
    number: "03",
    name: "Correction",
    description: "Machine polishing removes swirl marks, buffer trails and light scratches. We use multiple compounds and pads, working panel-by-panel in optimal ambient conditions.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85",
  },
  {
    number: "04",
    name: "Protection",
    description: "Ceramic coating, paint sealant, or carnauba wax applied to specification. Each product is selected to match the vehicle's use case, storage environment, and owner preference.",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=900&q=85",
  },
  {
    number: "05",
    name: "Final Inspection",
    description: "The finished car is inspected under raking light from every angle. We photograph each panel and walk the owner through our findings. Nothing leaves unless we're satisfied.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-24 md:py-40 bg-obsidian" ref={ref}>
      <div className="px-6 md:px-10 lg:px-16 mb-16">
        <div className="overflow-hidden mb-3">
          <motion.p
            className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase"
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            04 — Our Process
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(2.5rem,4vw,5rem)] leading-[0.92] tracking-[-0.03em] text-frost"
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ delay: 0.1, duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            How we work.
          </motion.h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: step list */}
        <div className="px-6 md:px-10 lg:px-16 space-y-0 border-r border-frost/5">
          {steps.map((step, i) => (
            <button
              key={i}
              className="w-full text-left py-8 border-b border-frost/5 group"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-[10px] tracking-[0.25em] text-mist/50 mt-1">
                  {step.number}
                </span>
                <div>
                  <h3
                    className={`font-display text-2xl leading-tight mb-2 transition-colors duration-300 ${
                      active === i ? "text-frost" : "text-platinum/50"
                    }`}
                  >
                    {step.name}
                  </h3>
                  <motion.p
                    className="font-sans text-[13px] text-platinum/60 leading-relaxed"
                    animate={{ opacity: active === i ? 1 : 0, height: active === i ? "auto" : 0 }}
                    transition={{ duration: 0.4, ease: [0.6, 0.01, 0.05, 0.95] }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: image */}
        <div className="relative hidden md:block">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <Image
                src={step.image}
                alt={step.name}
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
