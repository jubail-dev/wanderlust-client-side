"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type SearchField = {
  id: string
  name: string
  label: string
  placeholder: string
  cellClassName: string
}

// Dividers are declared per cell (not with `divide-*`) so each breakpoint keeps
// a clean grid: 1 column on mobile, 2 on tablet, 5 on desktop.
const searchFields: SearchField[] = [
  {
    id: "search-location",
    name: "location",
    label: "Location",
    placeholder: "Address, City or Zip",
    cellClassName: "border-b lg:border-b-0",
  },
  {
    id: "search-dates",
    name: "dates",
    label: "Date/Duration",
    placeholder: "Anytime/3 Days",
    cellClassName: "border-b sm:border-l lg:border-b-0",
  },
  {
    id: "search-budget",
    name: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
    cellClassName: "border-b lg:border-b-0 lg:border-l",
  },
  {
    id: "search-people",
    name: "people",
    label: "People",
    placeholder: "5-10",
    cellClassName: "border-b sm:border-l lg:border-b-0",
  },
]

const cellBaseClass =
  "flex flex-col justify-center gap-1.5 border-white/15 px-5 py-3.5 transition-colors focus-within:bg-white/10"

export function HeroSearch() {
  return (
    <form
      aria-label="Search destinations"
      onSubmit={(event) => {
        // TODO: no search backend exists yet — keep this a no-op instead of
        // pretending results are available.
        event.preventDefault()
      }}
      className="relative z-10 border-t border-white/20 bg-black/45 backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {searchFields.map((field) => (
          <div key={field.id} className={cn(cellBaseClass, field.cellClassName)}>
            <Label
              htmlFor={field.id}
              className="text-[13px] font-semibold text-white"
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              name={field.name}
              type="text"
              placeholder={field.placeholder}
              className="h-auto rounded-none border-0 bg-transparent px-0 text-sm text-white placeholder:text-white/60 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-white/70"
            />
          </div>
        ))}

        <Button
          type="submit"
          className="h-full w-full rounded-none bg-cyan-500 px-6 py-4 text-sm font-semibold text-white hover:bg-cyan-600 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/15"
        >
          <Search aria-hidden="true" className="size-4" />
          Search
        </Button>
      </div>
    </form>
  )
}
