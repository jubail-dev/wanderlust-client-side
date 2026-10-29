
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, X, Save } from "lucide-react";

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

type DestinationData = {
  _id: string;
  name?: string;
  country?: string;
  category?: string;
  price?: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

function normalizeCategory(category?: string) {
  return CATEGORIES.find(
    (option) =>
      option.toLowerCase() === category?.trim().toLowerCase(),
  ) ?? "";
}

const EditDestinationsDialog = ({
  destinationData,
}: {
  destinationData: DestinationData;
}) => {
  const [category, setCategory] = useState(
    normalizeCategory(destinationData.category),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editDestinationButton = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedData = Object.fromEntries(formData.entries());

    // Custom Select-এর value আলাদাভাবে যোগ করা হচ্ছে।
    updatedData.category = category;

    if (!category) {
      alert("Please select a category.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destinationData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update destination");
      }

      console.log("Destination updated:", data);
      alert("Destination updated successfully!");

      // Updated data দেখার জন্য page refresh।
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <Edit className="mr-2 h-4 w-4" />
            Edit Package
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-normal text-gray-900">
            Update Travel Package
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Make changes to the travel package details below.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4 py-2"
          onSubmit={editDestinationButton}
        >
          {/* Package Name */}
          <div className="space-y-2">
            <Label htmlFor="package-name">Package Name</Label>
            <Input
              id="package-name"
              name="name"
              defaultValue={destinationData.name ?? ""}
              className="bg-gray-50/50"
              required
            />
          </div>

          {/* Country and Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="text-xs font-semibold uppercase tracking-wider text-gray-800"
              >
                Country
              </Label>
              <Input
                id="country"
                name="country"
                defaultValue={destinationData.country ?? ""}
                className="bg-gray-50/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-xs font-semibold uppercase tracking-wider text-gray-800"
              >
                Category
              </Label>

              <Select
                value={category || null}
                onValueChange={(value) => setCategory(value ?? "")}
              >
                <SelectTrigger
                  id="category"
                  className="bg-gray-50/50"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={destinationData.price ?? ""}
                className="bg-gray-50/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                defaultValue={destinationData.duration ?? ""}
                className="bg-gray-50/50"
                required
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label htmlFor="departure-date">Departure Date</Label>
            <Input
              id="departure-date"
              name="departureDate"
              type="date"
              defaultValue={destinationData.departureDate ?? ""}
              className="bg-gray-50/50"
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              name="imageUrl"
              type="url"
              defaultValue={destinationData.imageUrl ?? ""}
              className="bg-gray-50/50"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={destinationData.description ?? ""}
              className="min-h-[120px] resize-none bg-gray-50/50"
              required
            />
          </div>

          <DialogFooter className="flex gap-2 pt-4 sm:justify-end">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationsDialog;
