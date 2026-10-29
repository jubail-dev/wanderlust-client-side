"use client"

import { useRef } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { playfair } from "@/lib/fonts"
import { cn } from "@/lib/utils"

type Testimonial = {
  id: string
  quote: string
  name: string
  location: string
  photo: string
}

const testimonials: Testimonial[] = [
  {
    id: "bali-trip",
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    id: "swiss-alps",
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
]

const cardClassName =
  "w-full flex-none snap-start rounded-lg border border-neutral-200 bg-white p-5 shadow-sm md:w-[calc(50%-0.75rem)]"

const arrowButtonClass =
  "size-10 rounded-full text-neutral-500 hover:text-cyan-600"

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByCards(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    // One "page" = half the track, i.e. one card on desktop (two visible).
    // Native scrollBy clamps at both ends, so no edge-state tracking needed.
    track.scrollBy({
      left: direction * (track.clientWidth / 2),
      behavior: "smooth",
    })
  }

  return (
    <section className="border-t-2 border-cyan-500 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2
              className={`${playfair.className} text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl`}
            >
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-neutral-500 sm:text-base">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              aria-label="Previous testimonials"
              className={arrowButtonClass}
              onClick={() => scrollByCards(-1)}
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              aria-label="Next testimonials"
              className={arrowButtonClass}
              onClick={() => scrollByCards(1)}
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item) => (
            <article key={item.id} className={cn(cardClassName)}>
              <div className="flex gap-5">
                <div className="flex flex-1 flex-col">
                  <p
                    className={`${playfair.className} text-[15px] leading-relaxed text-neutral-800`}
                  >
                    {item.quote}
                  </p>
                  <div className="mt-auto pt-8">
                    <p className={`${playfair.className} text-cyan-500`}>
                      — {item.name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {item.location}
                    </p>
                  </div>
                </div>

                <Image
                  src={item.photo}
                  alt={item.name}
                  width={160}
                  height={190}
                  className="h-[190px] w-40 shrink-0 rounded-md object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
