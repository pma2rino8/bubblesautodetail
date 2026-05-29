import type { Metadata } from "next";
import Image from "next/image";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Four tiers of luxury automotive detailing — from express maintenance to full concours preparation.",
};

export default function ServicesPage() {
  return (
    <div className="bg-ink pt-32">
      <div className="px-6 md:px-10 lg:px-16 pb-24">
        <p className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-6">
          01 — Services
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,8rem)] leading-[0.88] tracking-[-0.04em] text-frost mb-24">
          What we do.
        </h1>

        <div className="space-y-0">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              className="grid md:grid-cols-2 gap-0 border-t border-frost/5 py-16 md:py-24"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-mist/50 mb-6">
                  {svc.number}
                </p>
                <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] leading-[0.92] tracking-[-0.03em] text-frost mb-3">
                  {svc.name}
                </h2>
                <p className="font-sans text-[13px] italic text-platinum mb-8">{svc.tagline}</p>
                <p className="font-sans text-[14px] text-platinum/70 leading-relaxed max-w-md mb-10">
                  {svc.description}
                </p>

                <div className="mb-10">
                  <ul className="space-y-3">
                    {svc.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <span className="w-[3px] h-[3px] rounded-full bg-mist flex-shrink-0" />
                        <span className="font-sans text-[12px] text-platinum/70">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] text-platinum/40 uppercase mb-1">From</p>
                    <p className="font-display text-4xl text-frost">{svc.priceFrom}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] text-platinum/40 uppercase mb-1">Duration</p>
                    <p className="font-sans text-[13px] text-platinum">{svc.duration}</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-10 md:mt-0 h-64 md:h-auto">
                <Image
                  src={`https://images.unsplash.com/photo-${i % 2 === 0 ? "1503376780353-7e6692767b70" : "1592198084033-aade902d1aae"}?w=900&q=85`}
                  alt={svc.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
