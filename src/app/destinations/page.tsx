import type { Metadata } from "next";

import { DestinationGrid } from "@/components/destinations/destination-grid";
import {
  parseDestinations,
  type Destination,
} from "@/components/destinations/types";
import { playfair } from "@/lib/fonts";

// Hardcoded to match add-destination-form — no env indirection exists yet.
const DESTINATIONS_URL = `${process.env.NEXT_PUBLIC_API_URL}/destinations`;

type LoadResult = {
  destinations: Destination[];
  /** True when the API could not be reached — distinct from an empty list. */
  failed: boolean;
};

async function loadDestinations(): Promise<LoadResult> {
  try {
    // `no-store` keeps newly added packages visible without a rebuild.
    const response = await fetch(DESTINATIONS_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Destinations API responded with ${response.status}`);
    }
    return { destinations: parseDestinations(await response.json()), failed: false };
  } catch {
    return { destinations: [], failed: true };
  }
}

export const metadata: Metadata = {
  title: "Explore Destinations | Wanderlust",
  description:
    "Find your perfect travel experience from our curated collection.",
};

export default async function AllDestinationsPage() {
  const { destinations, failed } = await loadDestinations();

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <h1
            className={`${playfair.className} text-4xl font-normal tracking-tight text-neutral-900 md:text-5xl`}
          >
            Explore All Destinations
          </h1>
          <p className="mt-3 text-sm text-neutral-500 sm:text-base">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        <p className="mt-10 text-sm text-neutral-500">
          Showing {destinations.length} destination
          {destinations.length === 1 ? "" : "s"}
        </p>

        {failed ? (
          <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50 px-6 py-10 text-center">
            <p className="font-medium text-amber-900">
              Couldn&apos;t reach the travel API
            </p>
            <p className="mt-2 text-sm text-amber-800">
              Start the backend with{" "}
              <code className="rounded bg-amber-100 px-1.5 py-0.5">
                cd ../wanderlust-server-side &amp;&amp; node index.js
              </code>{" "}
              and reload this page.
            </p>
          </div>
        ) : (
          <DestinationGrid destinations={destinations} />
        )}
      </div>
    </section>
  );
}
