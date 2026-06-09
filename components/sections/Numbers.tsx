"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 440, suffix: "+", label: "Vehicles detailed" },
  { value: 4, suffix: " years", label: "In business" },
  { value: 37, suffix: "", label: "Awards & accolades" },
  { value: 100, suffix: "%", label: "Appointment only" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-20 border-y border-frost/5 bg-ink" ref={ref}>
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-frost/5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="px-8 py-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            <p className="font-display text-[clamp(2.5rem,4vw,4.5rem)] text-frost leading-none tracking-[-0.03em] mb-2">
              <Counter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-platinum/50 uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
