import Link from "next/link";

import { DestinationCard } from "@/components/destinations/destination-card";
import type { Destination } from "@/components/destinations/types";

type DestinationGridProps = {
  destinations: Destination[];
};

export function DestinationGrid({ destinations }: DestinationGridProps) {
  if (destinations.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed px-6 py-16 text-center">
        <p className="text-base font-medium text-neutral-900">
          No destinations yet
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Your catalogue is empty — add a travel package to see it here.
        </p>
        <Link
          href="/add-destinations"
          className="mt-5 inline-flex h-9 items-center rounded-md bg-cyan-600 px-4 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          Add Travel Package
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}
