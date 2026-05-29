"use client";

const brands = [
  "PORSCHE", "FERRARI", "McLAREN", "ASTON MARTIN", "ROLLS-ROYCE",
  "BENTLEY", "LAMBORGHINI", "BUGATTI", "PAGANI", "KOENIGSEGG",
];

export function MarqueeBand() {
  const repeated = [...brands, ...brands];

  return (
    <div className="py-6 border-y border-frost/5 bg-ink overflow-hidden">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {repeated.map((brand, i) => (
          <span key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="font-mono text-[11px] tracking-[0.4em] text-platinum/40 uppercase">
              {brand}
            </span>
            <span className="text-mist/30 text-[8px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
