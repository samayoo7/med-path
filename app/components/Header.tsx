"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { navLinks } from "../data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all",
        scrolled && "bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.06)]",
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="MedPath">
          <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-[#1B3A2D] text-white shadow-md shadow-[#1B3A2D]/40">
            <span className="text-lg font-semibold">MP</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[25px] font-semibold tracking-tight text-[#1B3A2D]">
              MedPath
            </span>
            <span className="text-[13px] text-slate-500">
              Find your senior. Find your path.
            </span>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-xs font-medium text-slate-600 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] text-slate-600 transition-colors hover:bg-[#E6F4F1] hover:text-[#1B3A2D]"
            >
              <span>{item.label}</span>
              <span className="text-[9px] text-slate-400">▾</span>
              <span className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-transparent via-[#2BB5A0] to-transparent transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden text-xs font-medium text-slate-600 hover:text-[#1B3A2D] sm:inline-flex">
            Login
          </button>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-[#1B3A2D] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(27,58,45,0.5)] hover:bg-[#18402d] sm:px-5 sm:text-sm"
          >
            <span className="hidden sm:inline">Get Started Free</span>
            <span className="sm:hidden">Get Started</span>
          </a>
        </div>
      </div>
    </header>
  );
}
