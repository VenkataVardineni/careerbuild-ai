import { Check } from "lucide-react";
import { bannerItems } from "@/lib/data";

export function BannerBar() {
  return (
    <div className="banner-gradient relative overflow-hidden py-5">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)] animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 md:gap-x-12 md:px-8">
        {bannerItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 text-xs font-semibold text-white/90 md:text-sm"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-bright/20">
              <Check className="h-3 w-3 text-cyan-bright" />
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
