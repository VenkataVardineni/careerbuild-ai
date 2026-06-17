import { Building2, User } from "lucide-react";
import { ApplyTrigger } from "./ApplyTrigger";
import { SectionDescription, SectionHeading, SectionLabel } from "./ui";

export function TwoWaysSection() {
  return (
    <section className="section-alt py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Two ways to build</SectionLabel>
          <SectionHeading className="mt-5" centered>
            Whether you&apos;re one expert or an entire institution
          </SectionHeading>
          <SectionDescription className="mt-5">
            Individual subject-matter experts and organizations both have a home
            here. Choose the path that fits how you teach.
          </SectionDescription>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="premium-card group relative overflow-hidden rounded-3xl bg-white p-8 md:p-10">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet via-fuchsia to-violet" />
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet/10 blur-3xl transition group-hover:bg-violet/20" />
            <div className="relative flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl icon-box-violet text-white">
                <User className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-violet uppercase">
                  For individuals
                </span>
                <h3 className="font-serif mt-2 text-2xl md:text-3xl text-ink">
                  Subject-Matter Experts
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                  You&apos;re a practitioner, consultant, or industry expert with
                  deep knowledge in your field. Publish your course, earn on every
                  enrollment, and let us handle the rest.
                </p>
                <ApplyTrigger tab="instructor" params={{ kind: "individual" }} variant="primary" className="mt-7 !px-6 !py-3">
                  Apply as instructor
                </ApplyTrigger>
              </div>
            </div>
          </div>

          <div className="premium-card group relative overflow-hidden rounded-3xl bg-white p-8 md:p-10">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-sky via-cyan to-sky" />
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-sky/10 blur-3xl transition group-hover:bg-sky/20" />
            <div className="relative flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-cyan text-white shadow-lg shadow-sky/30">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-sky uppercase">
                  For institutions
                </span>
                <h3 className="font-serif mt-2 text-2xl md:text-3xl text-ink">
                  Providers, Schools & Colleges
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                  License your curriculum, white-label our platform, or co-publish
                  training programs for your students and corporate clients at
                  scale.
                </p>
                <ApplyTrigger tab="instructor" params={{ kind: "institution" }} variant="dark" className="mt-7 !px-6 !py-3">
                  Partner with us
                </ApplyTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
