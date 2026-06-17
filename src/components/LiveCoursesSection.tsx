import { ArrowRight, Star } from "lucide-react";
import { liveCourses } from "@/lib/data";
import { CAREERBUILD_URL } from "@/lib/applyForms";
import { SectionDescription, SectionHeading, SectionLabel, Tag } from "./ui";

const avatarGradients = {
  violet: "from-violet to-violet-dark",
  sky: "from-sky to-cyan",
};

export function LiveCoursesSection() {
  return (
    <section className="section-alt py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Available now</SectionLabel>
          <SectionHeading className="mt-5" centered>
            Courses already live on the marketplace
          </SectionHeading>
          <SectionDescription className="mt-5">
            See what&apos;s enrolling today — and imagine your course alongside
            them.
          </SectionDescription>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {liveCourses.map((course) => (
            <div
              key={course.title}
              className="premium-card group relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 md:p-10"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-violet/5 blur-3xl transition group-hover:bg-violet/10" />

              <Tag variant="green">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {course.status}
                </span>
              </Tag>

              <h3 className="font-serif mt-6 text-3xl md:text-4xl text-ink">
                {course.title}
              </h3>

              <div className="mt-6 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradients[course.color as keyof typeof avatarGradients]} text-sm font-extrabold text-white shadow-lg`}
                >
                  {course.initials}
                </div>
                <div>
                  <p className="font-bold text-ink">{course.instructor}</p>
                  <p className="text-sm text-ink-muted">{course.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-muted md:text-base">
                {course.description}
              </p>

              <a
                href={`${CAREERBUILD_URL}/courses`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white"
              >
                Enroll on CareerBuild AI
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
