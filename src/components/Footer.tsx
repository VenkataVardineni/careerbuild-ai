export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-midnight py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-violet/5 via-transparent to-sky/5" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl icon-box-violet text-xs font-extrabold text-white">
            C
          </div>
          <span className="text-sm font-extrabold text-white">CareerBuild AI</span>
        </div>

        <p className="text-xs text-white/40 text-center">
          CareerBuild AI · Professional course marketplace
        </p>

        <a
          href="mailto:hello@careerbuild.ai"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-cyan-bright/30 hover:text-cyan-bright"
        >
          Questions? hello@careerbuild.ai
        </a>
      </div>
    </footer>
  );
}
