"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  id,
  name,
  options,
  placeholder,
  required,
  disabled,
  value = "",
  onChange,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.label ?? placeholder;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <select
        name={name}
        required={required}
        value={selectedValue}
        onChange={() => {}}
        className="pointer-events-none absolute inset-0 z-0 opacity-0"
        tabIndex={-1}
        aria-hidden
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        id={id}
        onClick={() => {
          if (!disabled) {
            setIsOpen((o) => !o);
          }
        }}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
        className={`w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-12 text-left text-base text-[#1B3A2D] focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/20 disabled:opacity-60 ${className}`}
      >
        <span className={selectedValue ? "" : "text-slate-400"}>
          {selectedLabel}
        </span>
      </button>
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1B3A2D]"
        aria-hidden
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </span>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
          style={{ minWidth: "100%" }}
        >
          {options.map((opt) => (
            <li key={opt.value} role="option">
              <button
                type="button"
                onClick={() => {
                  setSelectedValue(opt.value);
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-base hover:bg-slate-50 ${
                  selectedValue === opt.value
                    ? "bg-[#E6F4F1] text-[#1B3A2D]"
                    : "text-slate-700"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
