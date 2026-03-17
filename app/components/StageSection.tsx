import { stageTags } from "../data";

export function StageSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 rounded-3xl bg-[#F7FAF8] px-4 py-10 text-[#0D1F17] shadow-md ring-1 ring-slate-100 sm:px-8 sm:py-12"
    >
      <div className="space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EC] px-4 py-1 text-[11px] font-medium text-[#1B3A2D]">
          ✦ FOR EVERY STAGE
        </p>
        <div className="space-y-3">
          <h2 className="text-2xl font-extrabold text-[#0D1F17] sm:text-3xl">
            From MBBS Day 1 to DM/MCh. MedPath grows with you.
          </h2>
          <p className="max-w-2xl text-sm text-[#4B5563] sm:text-base">
            Whether you&apos;re choosing a specialty or preparing for super-specialty
            entrance exams, there&apos;s a senior here who&apos;s done it.
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max flex-wrap gap-2">
            {stageTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-medium text-[#1B3A2D]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
