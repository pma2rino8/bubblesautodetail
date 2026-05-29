import type { Metadata } from "next";
import Link from "next/link";
import { journalEntries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on paint correction, ceramic coatings, and the craft of automotive detailing.",
};

export default function JournalPage() {
  return (
    <div className="bg-ink pt-32 pb-24">
      <div className="px-6 md:px-10 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.35em] text-mist uppercase mb-6">
          Journal
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,8rem)] leading-[0.88] tracking-[-0.04em] text-frost mb-24">
          Studio notes.
        </h1>

        <div className="space-y-0">
          {journalEntries.map((entry, i) => (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}`}
              className="group block border-t border-frost/5 py-10 hover:bg-obsidian/50 transition-colors duration-300 -mx-6 md:-mx-10 lg:-mx-16 px-6 md:px-10 lg:px-16"
            >
              <div className="grid md:grid-cols-[1fr_3fr_1fr] gap-6 items-start">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-mist/50 uppercase">
                    {entry.category}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.15em] text-platinum/30 mt-1">
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-frost mb-3 group-hover:text-mist transition-colors duration-300 leading-tight">
                    {entry.title}
                  </h2>
                  <p className="font-sans text-[13px] text-platinum/60 leading-relaxed max-w-xl">
                    {entry.excerpt}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-platinum/30 uppercase">
                    {entry.readTime} read
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-mist uppercase mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
