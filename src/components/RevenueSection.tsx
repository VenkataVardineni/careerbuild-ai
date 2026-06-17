import { Building2, GraduationCap } from "lucide-react";
import { revenueStreams } from "@/lib/data";
import { SectionDescription, SectionHeading, SectionLabel, Tag } from "./ui";

const iconMap = {
  graduation: GraduationCap,
  building: Building2,
};

const accentGradients = [
  "from-violet/15 to-violet/5",
  "from-indigo-deep/10 to-violet/5",
];

export function RevenueSection() {
  return (
    <section id="earn" className="section-glow py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Your revenue</SectionLabel>
          <SectionHeading className="mt-5" centered>
            Two ways to{" "}
            <span className="text-gradient italic">earn.</span>
          </SectionHeading>
          <SectionDescription className="mt-5">
            Instructors earn when students enroll in their courses, and when
            schools and employers license their content for teams and cohorts.
          </SectionDescription>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {revenueStreams.map((stream, i) => {
            const Icon = iconMap[stream.icon as keyof typeof iconMap];
            return (
              <div
                key={stream.title}
                className={`premium-card group relative overflow-hidden rounded-3xl p-7 md:p-9 bg-gradient-to-b ${accentGradients[i]}`}
              >
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-violet/5 blur-2xl transition group-hover:bg-violet/10" />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl icon-box-violet text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Tag variant={stream.tagColor as "violet" | "indigo"}>
                    {stream.tag}
                  </Tag>
                  <h3 className="font-serif mt-4 text-xl font-semibold text-ink">
                    {stream.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {stream.description}
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
