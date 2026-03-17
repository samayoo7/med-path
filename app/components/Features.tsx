import { Section } from "./Section";
import { FeatureCard } from "./FeatureCard";
import { featureCards } from "../data";

export function Features() {
  return (
    <>
      <section id="features" className="scroll-mt-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EC] px-4 py-1 text-[11px] font-medium text-[#1B3A2D]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2D6A4F]" />
          <span>FEATURES</span>
        </div>
        <h2 className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-[#1B3A2D] sm:text-3xl">
          Everything you need to find guidance —{" "}
          <span className="relative inline-block">
            <span>nothing you don&apos;t.</span>
            <span className="pointer-events-none absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#95D5B2] via-[#52B788] to-[#40916C] opacity-80" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-[#4B5563] sm:text-base">
          Built lean and private, for students who just want real answers from
          real seniors — no feeds, no noise, just focused conversations.
        </p>
      </section>

      <Section className="relative bg-[#F0F7F4]">
        <div className="pointer-events-none absolute -left-40 -top-32 h-72 w-72 rounded-full bg-[#2BB5A0]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#2D6A4F]/5 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-2">
          {featureCards.map((card, index) => (
            <FeatureCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </Section>
    </>
  );
}
