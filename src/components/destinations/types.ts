/**
 * Data contract for `GET http://localhost:5000/destinations`.
 *
 * The Express API (`../wanderlust-server-side`) stores whatever
 * `add-destination-form` POSTed, so every field arrives as `unknown` — `price`
 * is submitted as a string and ids come back as MongoDB `_id`. Normalize once
 * here so card components only ever see a `Destination`.
 */

export type Destination = {
  id: string;
  name: string;
  country: string;
  /** USD per person, e.g. `2700`. */
  price: number;
  /** Free text from the form, e.g. `"7 Days/6 Nights"`. */
  duration: string;
  imageUrl: string;
  category: string;
  rating: number;
};

/**
 * The add-destination form has no rating field yet, so the API never returns
 * one — fall back to the mockup's value until it does.
 */
const FALLBACK_RATING = 4.5;

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asPrice(value: unknown): number {
  const price = typeof value === "number" ? value : Number(asText(value));
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function asRating(value: unknown): number {
  const rating = typeof value === "number" ? value : Number(asText(value));
  return Number.isFinite(rating) && rating > 0 ? rating : FALLBACK_RATING;
}

/** Returns `null` for records missing a name — nothing usable to render. */
export function toDestination(
  record: Record<string, unknown>,
): Destination | null {
  const name = asText(record.name);
  if (!name) return null;

  return {
    id: String(record._id ?? record.id ?? name),
    name,
    country: asText(record.country),
    price: asPrice(record.price),
    duration: asText(record.duration),
    imageUrl: asText(record.imageUrl),
    category: asText(record.category),
    rating: asRating(record.rating),
  };
}

/** Accepts the raw JSON body and returns only well-formed destinations. */
export function parseDestinations(payload: unknown): Destination[] {
  if (!Array.isArray(payload)) return [];

  return payload
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null,
    )
    .map(toDestination)
    .filter((item): item is Destination => item !== null);
}
