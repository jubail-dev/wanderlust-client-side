import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { playfair } from "@/lib/fonts"

export function CallToAction() {
  return (
    <section className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center bg-neutral-900"
        style={{ backgroundImage: 'url("/images/CTA.png")' }}
      />
      {/* /images/CTA.png ships bright — darken the top and bottom edges so the
          white copy and the button stay legible over the water. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgb(0 0 0 / 0.45), rgb(0 0 0 / 0.2) 45%, rgb(0 0 0 / 0.5))",
        }}
      />

      <div className="flex flex-col items-center">
        <h2
          className={`${playfair.className} max-w-3xl text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl`}
        >
          Ready To Start Your Journey<span className="italic">?</span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="/destinations"
          className="group mt-8 inline-flex h-12 items-center gap-3 rounded-md bg-white px-8 text-xs font-semibold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:text-sm"
        >
          Book Your Trip Today
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  )
}
