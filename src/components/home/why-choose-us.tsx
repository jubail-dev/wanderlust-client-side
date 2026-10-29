import Image from "next/image"
import type { ReactNode } from "react"

import { playfair } from "@/lib/fonts"

type Feature = {
  id: string
  icon: string
  title: ReactNode
  description: string
}

const features: Feature[] = [
  {
    id: "safe-and-secure",
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    id: "expert-guides",
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    id: "support-24-7",
    icon: "/images/Headset.png",
    // "24/7" renders in the sans body font — the serif only styles "Support".
    title: (
      <>
        <span className="font-sans">24/7</span> Support
      </>
    ),
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-[#e0f2f7] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2
          className={`${playfair.className} text-center text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl`}
        >
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-500 sm:text-base">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="rounded-lg bg-white p-8 shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="size-10"
              />
              <h3
                className={`${playfair.className} mt-6 text-2xl font-medium text-neutral-900`}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
