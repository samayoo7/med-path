"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Loader2, X } from "lucide-react";

const DEBOUNCE_MS = 300;
const MIN_SEARCH_LENGTH = 3;

interface College {
  id: string;
  collegeName: string;
  city: string;
  stateName: string;
}

interface CollegeSearchInputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CollegeSearchInput({
  id,
  name,
  placeholder = "Search your college (min 3 characters)",
  required,
  disabled,
}: CollegeSearchInputProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<College | null>(null);
  const [results, setResults] = useState<College[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const searchColleges = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < MIN_SEARCH_LENGTH) {
      setResults([]);
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setLoading(true);
    try {
      const res = await fetch(
        `/api/colleges/search?q=${encodeURIComponent(searchQuery)}`,
        { signal: abortRef.current.signal }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Search failed");
      }
      const data = await res.json();
      setResults(data);
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setResults([]);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (query.length < MIN_SEARCH_LENGTH) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchColleges(query);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query, searchColleges]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = selected ? selected.collegeName : query;
  const hasResults = results.length > 0;
  const showResults = showDropdown && (query.length >= MIN_SEARCH_LENGTH || hasResults);

  const handleSelect = (college: College) => {
    setSelected(college);
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSelected(null);
    setQuery("");
    setResults([]);
    setShowDropdown(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    if (query.length >= MIN_SEARCH_LENGTH && results.length === 0 && !loading) {
      searchColleges(query);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    setSelected(null);
    setShowDropdown(true);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="hidden"
        name={name}
        value={selected?.id ?? ""}
        required={required}
      />
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          readOnly={!!selected}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-12 text-base text-[#1B3A2D] placeholder:text-slate-400 focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/20 disabled:opacity-60 read-only:cursor-default read-only:bg-slate-50/50"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {selected ? (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/30 disabled:opacity-50"
              aria-label="Remove college"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <span className="pointer-events-none text-[#1B3A2D]" aria-hidden>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </span>
          )}
        </div>
      </div>

      {showResults && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white py-1 text-left shadow-lg"
        >
          {loading && results.length === 0 ? (
            <li className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              Searching…
            </li>
          ) : results.length === 0 ? (
            <li className="px-4 py-3 text-left text-sm text-slate-500">
              No colleges found. Try a different search.
            </li>
          ) : (
            results.map((college) => (
              <li key={college.id} role="option">
                <button
                  type="button"
                  onClick={() => handleSelect(college)}
                  className={`block w-full px-4 py-2.5 text-left text-base hover:bg-slate-50 ${
                    selected?.id === college.id
                      ? "bg-[#E6F4F1] text-[#1B3A2D]"
                      : "text-slate-700"
                  }`}
                >
                  {college.collegeName}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
