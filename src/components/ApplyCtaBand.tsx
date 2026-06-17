import { ApplyTrigger } from "./ApplyTrigger";

export function ApplyCtaBand() {
  return (
    <section className="hex-pattern relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-violet/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky/15 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
        <p className="text-[11px] font-bold tracking-[0.18em] text-cyan-bright uppercase">
          Join the marketplace
        </p>
        <h2 className="font-serif mt-4 text-3xl leading-tight text-white md:text-5xl">
          Ready to start teaching?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          Apply as an instructor or propose a course topic — we respond within 2
          business days.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ApplyTrigger tab="instructor" variant="primary">
            Apply to teach
          </ApplyTrigger>
          <ApplyTrigger tab="course-suggestion" variant="glow">
            Suggest a course
          </ApplyTrigger>
        </div>
      </div>
    </section>
  );
}
