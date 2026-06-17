"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

function hrefProps(href: string) {
  if (href.startsWith("#") || href.startsWith("/?") || (href.startsWith("/") && href.includes("#"))) {
    return { as: "a" as const, nativeHref: href };
  }
  if (href.startsWith("http")) {
    return { as: "a" as const, nativeHref: href, external: true };
  }
  return { as: "link" as const, nativeHref: href };
}

function CtaLink({
  href,
  className,
  children,
  showArrow = true,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  showArrow?: boolean;
}) {
  const props = hrefProps(href);
  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4 opacity-80" /> : null}
    </>
  );

  if (props.as === "a") {
    return (
      <a
        href={props.nativeHref}
        className={className}
        {...(props.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={props.nativeHref} className={className}>
      {content}
    </Link>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet/15 bg-violet-light/60 px-4 py-1.5">
      <Sparkles className="h-3 w-3 text-violet" />
      <span className="text-[11px] font-bold tracking-[0.18em] text-violet uppercase">
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  children,
  className = "",
  centered = false,
}: {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <h2
      className={`font-serif text-[2rem] md:text-4xl lg:text-[2.85rem] leading-[1.12] tracking-tight text-ink ${centered ? "text-center" : ""} ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-base md:text-lg leading-relaxed text-ink-muted ${className}`}>
      {children}
    </p>
  );
}

export function PrimaryButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white";

  if (href) {
    return (
      <CtaLink href={href} className={`${base} ${className}`}>
        {children}
      </CtaLink>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {children}
      {type !== "submit" && <ArrowRight className="h-4 w-4 opacity-80" />}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full border border-violet/20 bg-white/80 px-7 py-3.5 text-sm font-bold text-ink backdrop-blur-sm shadow-sm transition hover:border-violet/40 hover:bg-white hover:shadow-md hover:text-violet";

  if (href) {
    return (
      <CtaLink href={href} className={`${base} ${className}`} showArrow={false}>
        {children}
      </CtaLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}

export function GlowButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "btn-glow inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-indigo-deep";

  if (href) {
    return (
      <CtaLink href={href} className={`${base} ${className}`}>
        {children}
      </CtaLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

export function DarkButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-ink/20 transition hover:bg-indigo-deep hover:shadow-xl";

  if (href) {
    return (
      <CtaLink href={href} className={`${base} ${className}`}>
        {children}
      </CtaLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

export function Tag({
  children,
  variant = "violet",
}: {
  children: React.ReactNode;
  variant?: "violet" | "sky" | "cyan" | "indigo" | "green";
}) {
  const colors = {
    violet: "bg-violet/10 text-violet border-violet/20",
    sky: "bg-sky/10 text-sky border-sky/20",
    cyan: "bg-cyan/10 text-cyan border-cyan/20",
    indigo: "bg-indigo-deep/10 text-indigo-deep border-indigo-deep/15",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

export function GlowOrbs() {
  return (
    <>
      <div className="glow-orb glow-orb-violet -top-32 -left-32 h-[500px] w-[500px]" />
      <div className="glow-orb glow-orb-sky -top-20 right-0 h-[400px] w-[400px]" />
      <div className="glow-orb glow-orb-fuchsia bottom-0 left-1/3 h-[350px] w-[350px]" />
    </>
  );
}
