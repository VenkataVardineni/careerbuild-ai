"use client";

import { ArrowRight } from "lucide-react";
import type { ApplyParams, ApplyTab } from "@/lib/applyForms";
import { useApplyModal } from "./ApplyModalProvider";
import { DarkButton, GlowButton, PrimaryButton } from "./ui";

type ApplyTriggerVariant = "primary" | "glow" | "dark" | "link";

type ApplyTriggerProps = {
  tab: ApplyTab;
  params?: ApplyParams;
  children: React.ReactNode;
  className?: string;
  variant?: ApplyTriggerVariant;
  showArrow?: boolean;
};

export function ApplyTrigger({
  tab,
  params,
  children,
  className = "",
  variant = "primary",
  showArrow = true,
}: ApplyTriggerProps) {
  const { openApply } = useApplyModal();
  const onClick = () => openApply(tab, params);

  if (variant === "primary") {
    return (
      <PrimaryButton onClick={onClick} className={className}>
        {children}
      </PrimaryButton>
    );
  }

  if (variant === "glow") {
    return (
      <GlowButton onClick={onClick} className={className}>
        {children}
      </GlowButton>
    );
  }

  if (variant === "dark") {
    return (
      <DarkButton onClick={onClick} className={className}>
        {children}
      </DarkButton>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-inherit cursor-pointer transition ${className}`}
    >
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4" /> : null}
    </button>
  );
}
