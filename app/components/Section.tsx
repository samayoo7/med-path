import { cn } from "../../lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 rounded-3xl bg-white/95 px-4 py-10 shadow-md ring-1 ring-slate-100/80 backdrop-blur-sm sm:px-8 sm:py-12",
        className,
      )}
    >
      {children}
    </section>
  );
}
