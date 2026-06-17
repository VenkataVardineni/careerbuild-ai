import {
  Clock,
  Coins,
  Handshake,
  Heart,
  Target,
  Wrench,
} from "lucide-react";
import { whyTeachCards } from "@/lib/data";
import { SectionDescription, SectionHeading, SectionLabel } from "./ui";

const iconMap = {
  coins: Coins,
  target: Target,
  wrench: Wrench,
  heart: Heart,
  clock: Clock,
  handshake: Handshake,
};

export function WhyTeachSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Why teach here</SectionLabel>
          <SectionHeading className="mt-5">
            Your expertise is the product.
            <span className="mt-1 block text-gradient italic">We make it sell.</span>
          </SectionHeading>
          <SectionDescription className="mt-5">
            You spent years building deep knowledge. We turn that into a course
            that earns — without you becoming a platform operator.
          </SectionDescription>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyTeachCards.map((card, i) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <div
                key={card.title}
                className="premium-card group rounded-3xl bg-white p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl icon-box icon-box-hover text-violet transition">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-extrabold text-violet/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
