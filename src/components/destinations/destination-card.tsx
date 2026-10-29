import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@/components/destinations/types";

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  
  const {id, name, country, price, duration, imageUrl, rating } = destination;

  return (
    <Card className="gap-3 bg-transparent p-0 shadow-none ring-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No photo
          </div>
        )}

        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
          {rating.toFixed(1)}
          <Star className="size-3 fill-current" aria-hidden="true" />
        </span>
      </div>

      <CardContent className="flex flex-col gap-2 p-0">
        <p className="flex items-center gap-1.5 text-sm text-neutral-600">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {country || "Location to be announced"}
        </p>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg leading-snug font-medium text-neutral-900">
            {name}
          </h3>
          <p className="shrink-0 text-lg font-semibold text-neutral-900">
            ${price}
            <span className="text-sm font-normal text-neutral-500">
              /Person
            </span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-neutral-600">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          {duration}
        </p>

        {/* No destination detail route yet — swap for the real href later. */}
        <a
          href={`http://localhost:3000/destinations/${id}`}
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-bold tracking-wide uppercase text-cyan-600 transition-colors hover:text-cyan-700"
        >
          Book Now
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </CardContent>
    </Card>
  );
}
