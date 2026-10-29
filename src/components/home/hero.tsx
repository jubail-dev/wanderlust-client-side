import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroSearch } from "./hero-search"
import { cn } from "@/lib/utils"

// Secondary background layer: if `/images/Banner.png` ever goes missing its
// layer fails to paint and this photo shows through (CSS layers stack, so no JS
// fallback is needed). Delete this constant and the second url() if you would
// rather ship only the local asset.
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=70"

const CTA_CLASS =
  "inline-flex h-11 items-center gap-2 rounded-md px-6 text-xs font-semibold uppercase tracking-wider text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[560px] flex-col overflow-hidden lg:min-h-[calc(100svh_-_4rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center bg-neutral-900"
        style={{
          backgroundImage: `url("/images/Banner.png"), url("${FALLBACK_IMAGE}")`,
        }}
      />
      {/* Light scrim only — /images/Banner.png already ships with darkening
          baked in, so a strong overlay here washes the photo out to near black. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgb(0 0 0 / 0.3), rgb(0 0 0 / 0.15) 45%, rgb(0 0 0 / 0.45))",
        }}
      />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <h1 className="max-w-4xl text-4xl font-light leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
          <span className="block">Discover Your</span>
          <span className="block">Next Adventure</span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/destinations"
            className={cn(CTA_CLASS, "bg-cyan-500 hover:bg-cyan-600 group")}
          >
            Explore Now
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/destinations"
            className={cn(
              CTA_CLASS,
              "bg-white/20 backdrop-blur-sm hover:bg-white/30"
            )}
          >
            View Destination
          </Link>
        </div>
      </div>

      <HeroSearch />
    </section>
  )
}
