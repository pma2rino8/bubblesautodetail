import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { work } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies from the Bubbles Auto Detail studio — six continents, one standard.",
};

export default function WorkPage() {
  return (
    <div className="bg-ink pt-32 pb-24">
      <div className="px-6 md:px-10 lg:px-16 mb-16">
        <p className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-6">
          Selected Work
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,8rem)] leading-[0.88] tracking-[-0.04em] text-frost">
          Commissions.
        </h1>
      </div>

      <div className="px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group relative overflow-hidden"
          >
            <div className="relative h-72 md:h-80">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/15 transition-colors duration-700" />
            </div>
            <div className="py-5 border-b border-frost/5">
              <p className="font-mono text-[9px] tracking-[0.2em] text-mist/60 uppercase mb-1">
                {item.year} — {item.service}
              </p>
              <h2 className="font-display text-xl text-frost">{item.title}</h2>
              <p className="font-sans text-[12px] text-platinum/50 mt-1">{item.color}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
