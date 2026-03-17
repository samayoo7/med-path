import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section
      id="cta"
      className="rounded-3xl"
      aria-label="Get started with MedPath"
    >
      <div className="flex flex-col justify-between gap-6 rounded-[22px] bg-[#1B3A2D] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold leading-snug sm:text-2xl">
            Discover the right path for
            <br />
            your medical career.
          </h2>
          <p className="max-w-xl text-sm text-emerald-50">
            Join a private network of seniors across India who actually have
            time for your questions.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:w-auto sm:flex-row">
          <button className="inline-flex items-center justify-center rounded-full border border-emerald-100 bg-transparent px-6 py-2.5 text-sm font-semibold text-emerald-50 hover:bg-emerald-50/10">
            See a Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1B3A2D] shadow-sm hover:bg-emerald-50">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}
