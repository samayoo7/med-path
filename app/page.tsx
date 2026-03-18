"use client";

import {
  Header,
  Hero,
  Features,
  CourseSection,
  StatsSection,
  Testimonial,
  CTABanner,
  Footer,
} from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF] text-slate-900">
      <Header />

      <main
        id="top"
        className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-14 lg:gap-16 lg:px-8 lg:py-16"
      >
        <Hero />
        <Features />
        <CourseSection />
        <StatsSection />
        <Testimonial />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
