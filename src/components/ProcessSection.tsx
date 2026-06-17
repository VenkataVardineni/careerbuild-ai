import { processSteps } from "@/lib/data";
import { SectionDescription, SectionHeading, SectionLabel } from "./ui";

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading className="mt-5" centered>
            Launching with us is genuinely simple
          </SectionHeading>
          <SectionDescription className="mt-5">
            From application to earning — four steps, minimal friction, maximum
            support.
          </SectionDescription>
        </div>

        <div className="relative mt-20">
          <div className="absolute top-12 left-[12.5%] right-[12.5%] hidden h-px bg-gradient-to-r from-transparent via-violet/25 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="premium-card group relative rounded-3xl bg-white p-7 text-center lg:text-left"
              >
                <div className="mx-auto lg:mx-0 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet/10 to-sky/10 transition group-hover:from-violet group-hover:to-violet-dark">
                  <span className="font-serif text-2xl font-bold text-violet transition group-hover:text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
