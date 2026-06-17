import {
  Bot,
  CheckCircle,
  ListChecks,
  MessageSquare,
  Play,
  Sparkles,
} from "lucide-react";
import { platformFeatures } from "@/lib/data";
import { SectionDescription, SectionHeading, SectionLabel } from "./ui";

const iconMap = {
  play: Play,
  message: MessageSquare,
  check: CheckCircle,
  list: ListChecks,
};

export function PlatformSection() {
  return (
    <section id="platform" className="section-alt py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel>Powered by CareerBuild AI</SectionLabel>
            <SectionHeading className="mt-5">
              The platform your course lives on
            </SectionHeading>
            <SectionDescription className="mt-5">
              Every course gets a full learning environment — structured content,
              AI tutoring, assessments, and progress tracking. Built for
              professionals who need more than a video playlist.
            </SectionDescription>

            <div className="mt-10 space-y-5">
              {platformFeatures.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <div
                    key={feature.title}
                    className="group flex gap-4 rounded-2xl border border-transparent p-4 transition hover:border-violet/15 hover:bg-white/80"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl icon-box icon-box-hover text-violet transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink">{feature.title}</p>
                      <p className="text-sm text-ink-muted">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet/15 via-sky/10 to-fuchsia/10 blur-2xl" />
            <div className="gradient-border-card relative">
              <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-violet/10 md:p-8">
                <div className="mb-5 flex items-center justify-between border-b border-violet/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1">
                    <Bot className="h-3 w-3 text-violet" />
                    <span className="text-xs font-bold text-violet">Course AI Tutor</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet to-violet-dark px-4 py-3 text-sm text-white shadow-lg shadow-violet/25">
                      What are the key takeaways from this chapter?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-violet/10 bg-violet-light/50 px-4 py-3 text-sm text-ink">
                      <p className="mb-1 flex items-center gap-1 text-xs font-bold text-violet">
                        <Sparkles className="h-3 w-3" /> AI Tutor
                      </p>
                      Great question. The core concepts cover the main principles,
                      practical applications, and how they connect to real-world
                      scenarios in your field...
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet to-violet-dark px-4 py-3 text-sm text-white shadow-lg shadow-violet/25">
                      Can you quiz me on what we just covered?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-sky/15 bg-sky-light/60 px-4 py-3 text-sm text-ink">
                      <p className="mb-1 flex items-center gap-1 text-xs font-bold text-sky">
                        <Sparkles className="h-3 w-3" /> AI Tutor
                      </p>
                      Starting Chapter 4 quiz: Batch records must include which
                      elements? (A) Equipment ID...
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-violet/12 bg-cream/80 px-4 py-3">
                  <input
                    type="text"
                    placeholder="Ask your course AI tutor..."
                    className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted/60 outline-none"
                    readOnly
                  />
                  <button
                    type="button"
                    className="rounded-xl bg-gradient-to-r from-violet to-violet-dark px-4 py-2 text-xs font-bold text-white shadow-md"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
