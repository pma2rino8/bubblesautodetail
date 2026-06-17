import type { Metadata } from "next";
import Image from "next/image";
import { detailPackages, ceramicPackages, addOns } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Detail packages from Bronze to Diamond, ceramic coating tiers up to nine years, and à la carte add-on services.",
};

const packageImages = [
  "/images/IMG_9819.jpg",
  "/images/IMG_9586.jpg",
  "/images/IMG_1264.jpg",
  "/images/IMG_1350.jpg",
  "/images/IMG_9282.jpg",
];

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

        {/* Detail packages */}
        <h2 className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-2">
          Detail Packages
        </h2>
        <div className="space-y-0">
          {detailPackages.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              className="grid md:grid-cols-2 gap-0 border-t border-frost/5 py-16 md:py-24"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-mist/50 mb-6">
                  {svc.number}
                </p>
                <h3 className="font-display text-[clamp(2rem,4vw,4.5rem)] leading-[0.92] tracking-[-0.03em] text-frost mb-3">
                  {svc.name}
                </h3>
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

                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-platinum/40 uppercase mb-1">Price</p>
                  <p className="font-display text-4xl text-frost">{svc.price}</p>
                </div>
              </div>

              <div className="relative mt-10 md:mt-0 h-64 md:h-auto">
                <Image
                  src={packageImages[i % packageImages.length]}
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

        {/* Ceramic coating */}
        <h2
          id="ceramic-coating"
          className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-2 mt-32 pt-16 border-t border-frost/5"
        >
          Ceramic Coating
        </h2>
        <p className="font-sans text-[14px] text-platinum/70 leading-relaxed max-w-md mb-12">
          Long-term paint protection, chosen by durability. Every tier includes professional decontamination and installation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-frost/5 border border-frost/5">
          {ceramicPackages.map((pkg) => (
            <div key={pkg.id} id={pkg.id} className="bg-ink p-8 flex flex-col">
              <p className="font-mono text-[10px] tracking-[0.3em] text-mist/50 mb-6">{pkg.number}</p>
              <h3 className="font-display text-2xl text-frost mb-1 leading-tight">{pkg.name}</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] text-platinum/40 uppercase mb-6">
                {pkg.duration} protection
              </p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-[3px] h-[3px] rounded-full bg-mist flex-shrink-0 mt-2" />
                    <span className="font-sans text-[12px] text-platinum/70">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-frost/5">
                <p className="font-mono text-[9px] tracking-[0.25em] text-platinum/40 uppercase mb-1">Starting at</p>
                <p className="font-display text-3xl text-frost">{pkg.priceFrom}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <h2
          id="add-ons"
          className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-2 mt-32 pt-16 border-t border-frost/5"
        >
          Add-On Services
        </h2>
        <p className="font-sans text-[14px] text-platinum/70 leading-relaxed max-w-md mb-12">
          À la carte services to combine with any package, priced from.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12">
          {addOns.map((item) => (
            <div
              key={item.name}
              className="flex items-baseline justify-between gap-4 py-4 border-b border-frost/5"
            >
              <span className="font-sans text-[13px] text-platinum/80">{item.name}</span>
              <span className="font-mono text-[12px] text-mist whitespace-nowrap">
                from {item.priceFrom}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
