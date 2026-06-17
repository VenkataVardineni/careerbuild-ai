import {
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { heroFeatures, trustItems } from "@/lib/data";
import { ApplyTrigger } from "./ApplyTrigger";
import { GlowOrbs, SecondaryButton } from "./ui";

const iconMap = {
  users: Users,
  sparkles: Sparkles,
  trending: TrendingUp,
  zap: Zap,
};

const stats = [
  { value: "$0", label: "Cost to launch" },
  { value: "2×", label: "Ways to earn" },
  { value: "2 days", label: "Publishing head start" },
];

export function Hero() {
  return (
    <section className="hero-mesh relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="hero-grid absolute inset-0" />
      <div className="hero-stars absolute inset-0 opacity-40" />
      <GlowOrbs />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-xs font-semibold text-violet shadow-sm backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-violet animate-pulse" />
              CareerBuild AI
              <span className="text-ink-muted font-normal">· Your domain. Our platform.</span>
            </span>

            <h1 className="font-serif mt-8 text-[2.6rem] leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.6rem]">
              Teach what you know.{" "}
              <span className="text-gradient-warm italic">
                Earn every time it&apos;s learned.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg md:leading-relaxed">
              Build courses on a platform that handles everything else —
              publishing, payments, and learner support.
              You bring the expertise. We bring the infrastructure.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ApplyTrigger tab="instructor" variant="primary">
                Apply to be an instructor
              </ApplyTrigger>
              <SecondaryButton href="#trainings">See upcoming trainings</SecondaryButton>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-lg">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-pill rounded-2xl px-4 py-3 text-center">
                  <p className="text-lg font-extrabold text-gradient">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-ink-muted uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-ink-muted">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-violet" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet/20 via-sky/10 to-fuchsia/20 blur-2xl" />

            <div className="gradient-border-card relative animate-float">
              <div className="glass-card rounded-3xl p-7 md:p-9">
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-ink-muted uppercase">
                    Why instructors choose us
                  </span>
                  <span className="rounded-full bg-gradient-to-r from-ink to-indigo-deep px-3.5 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg">
                    Community-powered
                  </span>
                </div>

                <div className="space-y-6">
                  {heroFeatures.map((feature, i) => {
                    const Icon = iconMap[feature.icon as keyof typeof iconMap];
                    return (
                      <div
                        key={feature.title}
                        className="group flex gap-4 rounded-2xl p-3 transition hover:bg-violet/5"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl icon-box icon-box-hover text-violet transition">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-ink">{feature.title}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                            {feature.description}
                          </p>
                        </div>
                        <span className="ml-auto self-center text-xs font-bold text-violet/30">
                          0{i + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8f7ff] to-transparent" />
    </section>
  );
}
