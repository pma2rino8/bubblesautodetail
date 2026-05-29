"use client";

import { useState } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { Hero } from "@/components/sections/Hero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { ServicesPanel } from "@/components/sections/ServicesPanel";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Process } from "@/components/sections/Process";
import { Numbers } from "@/components/sections/Numbers";
import { Testimonials } from "@/components/sections/Testimonials";
import { MarqueeBand } from "@/components/sections/Marquee";
import { BookingCTA } from "@/components/sections/BookingCTA";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Hero />
        <IntroStatement />
        <MarqueeBand />
        <ServicesPanel />
        <FeaturedWork />
        <Process />
        <Numbers />
        <Testimonials />
        <BookingCTA />
      </div>
    </>
  );
}
