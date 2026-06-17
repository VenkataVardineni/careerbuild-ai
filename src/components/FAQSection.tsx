"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqItems } from "@/lib/data";
import { SectionHeading, SectionLabel } from "./ui";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-alt py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <SectionLabel>Questions, answered</SectionLabel>
          <SectionHeading className="mt-5" centered>
            What to know before you apply
          </SectionHeading>
        </div>

        <div className="mt-14 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`faq-item rounded-2xl px-6 py-5 ${isOpen ? "faq-item-open" : ""}`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-ink pr-4 md:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      isOpen
                        ? "bg-violet text-white shadow-lg shadow-violet/30"
                        : "bg-violet/8 text-violet"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-ink-muted md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
