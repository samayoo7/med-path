import { NAVY } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: NAVY }}>
              MedPath
            </span>
            <span className="text-[11px] text-slate-500">
              Find your senior. Find your path.
            </span>
          </div>
          <p>Built for Indian medical students. Made with ❤️ in India.</p>
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} MedPath. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <button className="text-slate-600 hover:text-slate-900">About</button>
          <button className="text-slate-600 hover:text-slate-900">
            Privacy Policy
          </button>
          <button className="text-slate-600 hover:text-slate-900">Contact</button>
        </div>
      </div>
    </footer>
  );
}
