import { ApplyTrigger } from "./ApplyTrigger";
import { InstructorCoursesScroll } from "./InstructorCoursesScroll";
import { SectionDescription, SectionHeading, SectionLabel } from "./ui";

export function TrainingsSection() {
  return (
    <section id="trainings" className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Current courses · Life sciences</SectionLabel>
          <SectionHeading className="mt-5" centered>
            Life sciences courses open for instructors
          </SectionHeading>
          <SectionDescription className="mt-5">
            These are the courses we&apos;re recruiting for right now — part of a
            CareerBuild AI × BioBuzz partnership focused on life sciences. Scroll
            through the list and apply to teach any course that fits your
            expertise.
          </SectionDescription>
        </div>
      </div>

      <InstructorCoursesScroll />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="cta-mesh relative mt-16 overflow-hidden rounded-3xl p-8 md:p-14">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-cyan-bright/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-fuchsia/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <h3 className="font-serif text-2xl md:text-4xl text-white leading-snug">
              Don&apos;t see your topic? That&apos;s our favorite kind of
              conversation.
            </h3>
            <p className="mt-5 text-white/75 leading-relaxed md:text-lg">
              Your topic isn&apos;t listed yet? Propose a course in any field —
              we&apos;re always expanding beyond our current life sciences lineup.
            </p>
            <ApplyTrigger tab="course-suggestion" variant="glow" className="mt-8">
              Propose a topic
            </ApplyTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
