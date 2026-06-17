"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { selectClass } from "@/lib/formUi";

export type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

type PanelPosition = {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  maxHeight: number;
};

export function FormSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required,
  disabled,
  className = "",
}: FormSelectProps) {
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);
  const isPlaceholder = !selected;

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 6;
    const padding = 12;
    const spaceBelow = window.innerHeight - rect.bottom - padding;
    const spaceAbove = rect.top - padding;
    const preferred = Math.min(280, Math.max(spaceBelow, spaceAbove));
    const openUp = spaceBelow < 200 && spaceAbove > spaceBelow;
    const maxHeight = Math.max(160, Math.min(preferred, openUp ? spaceAbove - gap : spaceBelow - gap));

    setPosition(
      openUp
        ? {
            bottom: window.innerHeight - rect.top + gap,
            left: rect.left,
            width: rect.width,
            maxHeight,
          }
        : {
            top: rect.bottom + gap,
            left: rect.left,
            width: rect.width,
            maxHeight,
          },
    );
  }, []);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectValue = (next: string) => {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const panel =
    open && mounted && position ? (
      <div
        ref={panelRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={id}
        className="fixed z-[200] overflow-hidden rounded-2xl border border-violet/15 bg-white shadow-xl shadow-violet/10"
        style={{
          top: position.top,
          bottom: position.bottom,
          left: position.left,
          width: position.width,
          maxHeight: position.maxHeight,
        }}
      >
        <ul className="max-h-[inherit] overflow-y-auto overscroll-contain py-1.5">
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectValue(opt.value)}
                  className={`flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left text-sm leading-snug transition ${
                    active
                      ? "bg-violet/10 font-semibold text-violet"
                      : "text-ink hover:bg-violet/5"
                  }`}
                >
                  <span className="min-w-0 flex-1 break-words">{opt.label}</span>
                  {active ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;

  return (
    <div className={`select-field group relative ${className}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required || undefined}
        aria-controls={open ? listboxId : undefined}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
        }}
        className={`${selectClass} relative block w-full text-left ${
          isPlaceholder ? "select-placeholder" : ""
        } ${open ? "border-violet/45 bg-white shadow-[0_0_0_4px_rgba(124,58,237,0.12)]" : ""}`}
      >
        <span className="block truncate pr-1">
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={`select-chevron pointer-events-none absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-violet/8 text-violet transition group-hover:bg-violet/12 ${
            open ? "bg-violet/15" : ""
          }`}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </span>
      </button>

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
