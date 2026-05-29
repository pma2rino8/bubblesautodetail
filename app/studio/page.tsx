import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Studio",
  description: "About Aurum Detail — our philosophy, our space, our team.",
};

const team = [
  {
    name: "Marcus Reyes",
    role: "Founder & Lead Detailer",
    bio: "Fifteen years of experience. Trained under three of Europe's leading concours specialists. Every car that enters the studio passes through Marcus's hands.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    name: "Elena Voss",
    role: "Paint Correction Specialist",
    bio: "Elena holds advanced certifications from GYEON, IGL Coatings, and Menzerna. She has corrected over 300 vehicles and specialises in matte and special-order finishes.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85",
  },
  {
    name: "James Park",
    role: "Interior & Leather Specialist",
    bio: "James trained as an upholstery specialist before moving into detailing. He holds a unique ability to restore and protect leather, Alcantara, and carbon fibre interiors.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85",
  },
];

export default function StudioPage() {
  return (
    <div className="bg-ink pt-32 pb-24">
      <div className="px-6 md:px-10 lg:px-16">
        {/* Header */}
        <p className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-6">
          Our Studio
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,8rem)] leading-[0.88] tracking-[-0.04em] text-frost mb-24 max-w-3xl">
          Obsession, refined.
        </h1>

        {/* Philosophy */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 border-t border-frost/5 pt-16">
          <div>
            <h2 className="font-display text-4xl text-frost mb-6">Our Philosophy</h2>
          </div>
          <div className="space-y-5">
            <p className="font-sans text-[15px] text-platinum/70 leading-[1.8]">
              Aurum Detail was founded on a single conviction: that a car&rsquo;s finish is not cosmetic — it is structural. Paint protects metal. Ceramic protects paint. Attention to detail protects everything else. We approach every vehicle as a commission rather than a service job.
            </p>
            <p className="font-sans text-[15px] text-platinum/70 leading-[1.8]">
              We are appointment-only, by design. We take on fewer cars than most studios so that each one receives the full attention it deserves. We do not rush. We do not cut corners. We do not leave until we are satisfied.
            </p>
            <p className="font-sans text-[15px] text-platinum/70 leading-[1.8]">
              Our studio in Los Angeles operates under controlled humidity and temperature. Every polishing bay is equipped with 10,000-lux inspection lighting. We document every vehicle before and after with a calibrated paint depth gauge and a full photographic record.
            </p>
          </div>
        </div>

        {/* Studio images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-32">
          {[
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85",
            "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=85",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
          ].map((src, i) => (
            <div key={i} className="relative h-48 md:h-64">
              <Image src={src} alt="Studio" fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-ink/20" />
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="border-t border-frost/5 pt-16">
          <h2 className="font-display text-4xl text-frost mb-16">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative h-72 mb-5 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="33vw"
                  />
                </div>
                <p className="font-display text-xl text-frost mb-1">{member.name}</p>
                <p className="font-mono text-[10px] tracking-[0.2em] text-mist uppercase mb-4">{member.role}</p>
                <p className="font-sans text-[13px] text-platinum/60 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
