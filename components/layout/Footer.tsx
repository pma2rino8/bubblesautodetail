"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/book", label: "Reserve" },
];

const socialLinks = [
  { href: "https://www.instagram.com/themr.bubbles", label: "Instagram" },
  { href: "https://www.tiktok.com/@themr.bubbles", label: "TikTok" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer className="bg-obsidian border-t border-frost/5 pt-20 pb-0 overflow-hidden" ref={ref}>
      <div className="px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Col 1: Nav */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] text-platinum/30 uppercase mb-6">
              Navigation
            </p>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] text-platinum/60 hover:text-frost transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Col 2: Contact */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] text-platinum/30 uppercase mb-6">
              Contact
            </p>
            <div className="space-y-2">
              <p className="font-sans text-[13px] text-platinum/60">Bay Area, CA</p>
              <p className="font-sans text-[13px] text-platinum/60 mt-4">(831) 783-6987</p>
              <p className="font-sans text-[13px] text-platinum/60">hello@bubblesautodetail.com</p>
            </div>
          </div>

          {/* Col 3: Social + Newsletter */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] text-platinum/30 uppercase mb-6">
              Social
            </p>
            <div className="space-y-3 mb-10">
              {socialLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] text-platinum/60 hover:text-frost transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>

            <p className="font-mono text-[9px] tracking-[0.35em] text-platinum/30 uppercase mb-4">
              Studio Notes
            </p>
            <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-frost/10 focus:border-mist/40 px-4 py-2.5 font-sans text-[12px] text-frost placeholder-platinum/30 outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="border border-l-0 border-frost/10 hover:border-mist/40 px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-mist uppercase transition-colors duration-300"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom: legal */}
        <div className="border-t border-frost/5 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[9px] tracking-[0.2em] text-platinum/25 uppercase">
            © 2026 Bubbles Auto Detail. All rights reserved.
          </p>
          <p className="font-mono text-[9px] tracking-[0.2em] text-platinum/25 uppercase">
            Bay Area, California
          </p>
        </div>

        {/* Footer logo */}
        <div className="pb-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 0.15, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
          >
            <Image
              src="/logo.png"
              alt="Bubbles Auto Detail"
              width={280}
              height={112}
              className="h-28 w-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
