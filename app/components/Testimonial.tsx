import { Quote, Star } from "lucide-react";

export function Testimonial() {
  return (
    <section
      aria-label="Student testimonial"
      className="mx-auto mt-6 w-full max-w-6xl"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(43,181,160,0.12)] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(43,181,160,0.06)_0%,rgba(255,255,255,1)_70%)] px-6 py-10 shadow-[0_4px_6px_rgba(0,0,0,0.03),0_20px_60px_rgba(0,0,0,0.07)] sm:px-10 sm:py-16">
        <span className="pointer-events-none absolute left-8 top-6 hidden select-none text-[160px] font-serif leading-none text-[#1B3A2D]/5 md:block">
          &quot;
        </span>
        <span className="pointer-events-none absolute bottom-6 right-8 hidden rotate-180 select-none text-[160px] font-serif leading-none text-[#1B3A2D]/5 md:block">
          &quot;
        </span>

        <div className="pointer-events-none absolute left-8 top-1/2 hidden h-24 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#2BB5A0] to-transparent lg:block" />
        <div className="pointer-events-none absolute right-8 top-1/2 hidden h-24 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#2BB5A0] to-transparent lg:block" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
              />
            ))}
          </div>

          <Quote className="mb-6 h-10 w-10 text-[#2BB5A0]" strokeWidth={1.5} />

          <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-[#1F2937] sm:text-2xl sm:leading-relaxed">
            I had no idea which specialty to pick. One conversation with an{" "}
            <strong className="font-semibold not-italic text-[#1B3A2D]">
              MS Surgery resident
            </strong>{" "}
            on MedPath gave me more clarity than{" "}
            <strong className="font-semibold not-italic text-[#1B3A2D]">
              2 years of browsing forums
            </strong>
            .
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 text-xs text-[#6B7280] sm:text-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2BB5A0] text-base font-bold text-white ring-2 ring-[#2BB5A0] ring-offset-2 ring-offset-white">
              PS
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-[#0D1F17]">Priya S.</p>
              <span className="rounded-full bg-[#E6F4F1] px-2 py-0.5 text-[10px] font-semibold text-[#1B8A6B]">
                ✓ Verified Student
              </span>
            </div>
            <p>3rd Year MBBS, AIIMS New Delhi</p>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-[#1B3A2D]" />
            <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
            <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
          </div>
        </div>
      </div>
    </section>
  );
}
