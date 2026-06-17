"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ClipboardList,
  Database,
  FileText,
  FlaskConical,
  Microscope,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { wantedTrainings } from "@/lib/data";
import { ApplyTrigger } from "./ApplyTrigger";
import { Tag } from "./ui";

const iconMap = {
  file: FileText,
  database: Database,
  shield: Shield,
  clipboard: ClipboardList,
  flask: FlaskConical,
  chart: BarChart3,
  microscope: Microscope,
};

const tagVariants: Record<string, "violet" | "sky" | "cyan" | "indigo" | "green"> = {
  "QUALITY & GMP": "violet",
  MANUFACTURING: "sky",
  CLINICAL: "cyan",
  REGULATORY: "indigo",
  "DATA & SYSTEMS": "sky",
  "LAB & MANUFACTURING": "green",
  "LAB & SAFETY": "green",
};

export function InstructorCoursesScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 380);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <div className="relative mt-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f8f7ff] to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f8f7ff] to-transparent md:w-24" />

      <div className="absolute -top-14 right-4 z-20 flex gap-2 md:right-8">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll courses left"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-violet/15 bg-white text-ink shadow-md transition hover:border-violet/30 hover:text-violet disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll courses right"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-violet/15 bg-white text-ink shadow-md transition hover:border-violet/30 hover:text-violet disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="courses-scroll flex gap-5 overflow-x-auto pb-4 pl-4 pr-4 md:pl-8 md:pr-8"
      >
        {wantedTrainings.map((training) => {
          const Icon = iconMap[training.icon as keyof typeof iconMap] ?? FileText;
          return (
            <article
              key={training.title}
              className="premium-card group flex w-[min(340px,85vw)] shrink-0 snap-start flex-col rounded-3xl bg-white p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl icon-box icon-box-hover text-violet transition">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {training.tags.map((tag) => (
                    <Tag key={tag} variant={tagVariants[tag] ?? "violet"}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>

              <h3 className="font-serif mt-5 text-lg font-semibold leading-snug text-ink">
                {training.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {training.description}
              </p>

              <ApplyTrigger
                tab="instructor"
                variant="link"
                className="mt-6 text-sm font-bold text-violet hover:gap-2.5 hover:text-violet-dark"
              >
                Apply to teach
              </ApplyTrigger>
            </article>
          );
        })}
      </div>
    </div>
  );
}
