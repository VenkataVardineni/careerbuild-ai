"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { useApplyModal } from "./ApplyModalProvider";
import { PrimaryButton } from "./ui";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openApply } = useApplyModal();

  const navItemClass =
    "rounded-lg px-4 py-2 text-sm font-semibold text-ink-muted transition hover:bg-violet/8 hover:text-violet";

  return (
    <header className="nav-bar fixed inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[4.5rem] md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl icon-box-violet text-white font-extrabold text-sm shadow-lg">
            C
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-violet to-sky opacity-0 blur transition group-hover:opacity-40" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-ink">
              CareerBuild AI
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.href === "#apply-instructor" ? (
              <button
                key={link.href}
                type="button"
                onClick={() => openApply("instructor")}
                className={navItemClass}
              >
                {link.label}
              </button>
            ) : link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className={navItemClass}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={navItemClass}>
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <PrimaryButton
            onClick={() => openApply("instructor")}
            className="!px-5 !py-2.5 !text-xs"
          >
            Apply to teach
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2.5 text-ink transition hover:bg-violet/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-violet/10 bg-white px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) =>
              link.href === "#apply-instructor" ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => {
                    openApply("instructor");
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-ink-muted transition hover:bg-violet/8 hover:text-violet"
                >
                  {link.label}
                </button>
              ) : link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-ink-muted transition hover:bg-violet/8 hover:text-violet"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-ink-muted transition hover:bg-violet/8 hover:text-violet"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <PrimaryButton
              onClick={() => {
                openApply("instructor");
                setMobileOpen(false);
              }}
              className="mt-3 w-full"
            >
              Apply to teach
            </PrimaryButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
