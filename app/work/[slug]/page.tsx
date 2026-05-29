import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: `${item.service} — ${item.color}. ${item.location}.`,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();

  return (
    <div className="bg-ink pt-32 pb-24">
      <div className="px-6 md:px-10 lg:px-16 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12">
          <Link href="/work" className="font-mono text-[10px] tracking-[0.25em] text-platinum/40 uppercase hover:text-mist transition-colors">
            Work
          </Link>
          <span className="text-platinum/20">—</span>
          <span className="font-mono text-[10px] tracking-[0.25em] text-platinum/40 uppercase">{item.title}</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] text-mist uppercase mb-4">
            {item.year} — {item.service}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,7rem)] leading-[0.88] tracking-[-0.04em] text-frost mb-4">
            {item.title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-6">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-platinum/30 uppercase mb-1">Colour</p>
              <p className="font-sans text-[13px] text-platinum">{item.color}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-platinum/30 uppercase mb-1">Location</p>
              <p className="font-sans text-[13px] text-platinum">{item.location}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-platinum/30 uppercase mb-1">Service</p>
              <p className="font-sans text-[13px] text-platinum">{item.service}</p>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[65vh] mb-16">
          <Image
            src={item.afterImage}
            alt={`${item.title} after detailing`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Body copy */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div>
            <div className="w-8 h-[1px] bg-mist mb-6" />
            <p className="font-mono text-[9px] tracking-[0.25em] text-platinum/30 uppercase">
              Case Study
            </p>
          </div>
          <div>
            <p className="font-sans text-[15px] text-platinum/80 leading-[1.8]">
              {item.body}
            </p>
          </div>
        </div>

        {/* Before/After */}
        <div className="mt-20 grid md:grid-cols-2 gap-2">
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-platinum/30 uppercase mb-3">Before</p>
            <div className="relative h-64 md:h-80">
              <Image src={item.beforeImage} alt="Before" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-ink/20" />
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-mist/60 uppercase mb-3">After</p>
            <div className="relative h-64 md:h-80">
              <Image src={item.afterImage} alt="After" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-20 pt-12 border-t border-frost/5">
          <Link
            href="/work"
            className="font-mono text-[11px] tracking-[0.25em] text-platinum/50 uppercase hover:text-mist transition-colors"
          >
            ← All Work
          </Link>
        </div>
      </div>
    </div>
  );
}
