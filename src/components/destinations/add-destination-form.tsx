"use client";

import * as React from "react";
import { SaveIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "@/components/ui/toast";

const CATEGORIES = [
  "Beach",
  "Adventure",
  "City",
  "Mountain",
  "Cultural",
  "Wildlife",
  "Island",
  "Luxury",
] as const;

type FormValues = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  name: "",
  country: "",
  // Matches the mockup's pre-selected category.
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Destination name is required";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required";
  }

  if (!values.category) {
    errors.category = "Choose a category";
  }

  if (!values.price.trim()) {
    errors.price = "Price is required";
  } else if (
    !/^\d+(\.\d{1,2})?$/.test(values.price.trim()) ||
    Number(values.price) <= 0
  ) {
    errors.price = "Enter a valid price, e.g. 1299";
  }

  if (!values.duration.trim()) {
    errors.duration = "Duration is required";
  }

  if (!values.departureDate) {
    errors.departureDate = "Departure date is required";
  }

  if (!values.imageUrl.trim()) {
    errors.imageUrl = "Image URL is required";
  } else {
    try {
      const url = new URL(values.imageUrl.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.imageUrl = "Enter a URL starting with http:// or https://";
      }
    } catch {
      errors.imageUrl = "Enter a valid URL, e.g. https://example.com/image.jpg";
    }
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  } else if (values.description.trim().length < 20) {
    errors.description = "Tell travellers a bit more (at least 20 characters)";
  }

  return errors;
}

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function FormField({ id, label, error, className, children }: FormFieldProps) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function AddDestinationForm() {
  const [values, setValues] = React.useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function updateField(key: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors({});
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.add({
        type: "error",
        title: "Some fields need attention",
        description: "Fix the highlighted fields and try again.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: swap for the real API call (e.g. POST /api/destinations)
      // once the backend endpoint exists — there is no API layer yet.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // `Select` is not a native form control, so FormData omits its value.
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add destination");
      }

      toast.add({
        type: "success",
        title: "Travel package added",
        description: `"${values.name.trim()}" is now part of your catalogue.`,
      });
      handleReset();
    } catch {
      toast.add({
        type: "error",
        title: "Could not add the travel package",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Toaster>
      <Card className="shadow-sm [--card-spacing:1.5rem] md:[--card-spacing:2rem]">
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                id="destination-name"
                label="Destination Name"
                error={errors.name}
                className="sm:col-span-2"
              >
                <Input
                  id="destination-name"
                  name="name"
                  className="h-10"
                  autoComplete="off"
                  placeholder="Bali Paradise"
                  value={values.name}
                  aria-invalid={Boolean(errors.name)}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </FormField>

              <FormField
                id="destination-country"
                label="Country"
                error={errors.country}
              >
                <Input
                  id="destination-country"
                  name="country"
                  className="h-10"
                  autoComplete="off"
                  placeholder="Indonesia"
                  value={values.country}
                  aria-invalid={Boolean(errors.country)}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                />
              </FormField>

              <FormField
                id="destination-category"
                label="Category"
                error={errors.category}
              >
                <Select
                  value={values.category || null}
                  onValueChange={(value) =>
                    updateField("category", value ?? "")
                  }
                >
                  <SelectTrigger
                    id="destination-category"
                    className="h-10! w-full"
                    aria-invalid={Boolean(errors.category)}
                  >
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                id="destination-price"
                label="Price (USD)"
                error={errors.price}
              >
                <Input
                  id="destination-price"
                  name="price"
                  type="number"
                  min={0}
                  step="0.01"
                  className="h-10"
                  placeholder="e.g., 1299"
                  value={values.price}
                  aria-invalid={Boolean(errors.price)}
                  onChange={(event) => updateField("price", event.target.value)}
                />
              </FormField>

              <FormField
                id="destination-duration"
                label="Duration"
                error={errors.duration}
              >
                <Input
                  id="destination-duration"
                  name="duration"
                  className="h-10"
                  autoComplete="off"
                  placeholder="e.g. 7 Days/6 Nights"
                  value={values.duration}
                  aria-invalid={Boolean(errors.duration)}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                />
              </FormField>

              <FormField
                id="destination-departure"
                label="Departure Date"
                error={errors.departureDate}
                className="sm:col-span-2"
              >
                <Input
                  id="destination-departure"
                  name="departureDate"
                  type="date"
                  className="h-10"
                  value={values.departureDate}
                  aria-invalid={Boolean(errors.departureDate)}
                  onChange={(event) =>
                    updateField("departureDate", event.target.value)
                  }
                />
              </FormField>

              <FormField
                id="destination-image"
                label="Image URL"
                error={errors.imageUrl}
                className="sm:col-span-2"
              >
                <Input
                  id="destination-image"
                  name="imageUrl"
                  type="url"
                  className="h-10"
                  autoComplete="off"
                  placeholder="https://example.com/image.jpg"
                  value={values.imageUrl}
                  aria-invalid={Boolean(errors.imageUrl)}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                />
              </FormField>

              <FormField
                id="destination-description"
                label="Description"
                error={errors.description}
                className="sm:col-span-2"
              >
                <Textarea
                  id="destination-description"
                  name="description"
                  className="min-h-28 resize-y"
                  placeholder="Describe the travel experience..."
                  value={values.description}
                  aria-invalid={Boolean(errors.description)}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                />
              </FormField>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              {/* `!` keeps these colours from losing to the Button variant styles. */}
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isSubmitting}
                className="h-9 gap-2 border-destructive/30! px-4 text-destructive! hover:border-destructive/50 hover:bg-destructive/10! hover:text-destructive!"
              >
                <Trash2Icon />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 gap-2 bg-cyan-600! px-4 text-white hover:bg-cyan-700!"
              >
                {isSubmitting ? <Spinner /> : <SaveIcon />}
                {isSubmitting ? "Adding..." : "Add Travel Package"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Toaster>
  );
}
