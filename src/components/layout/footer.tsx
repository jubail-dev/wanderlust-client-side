"use client"

import type { FormEvent } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type FooterLink = {
  href: string
  label: string
}

// Matches the navbar routes — the destinations and account pages.
const quickLinks: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
]

// No support pages exist yet — these stay as in-page placeholders.
const supportLinks: FooterLink[] = [
  { href: "#", label: "Help Center" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Privacy Policy" },
]

const socialLinks: FooterLink[] = [
  { href: "#", label: "X" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
]

// lucide-react v1 no longer ships brand icons, so the social glyphs are inline
// SVGs (filled for X/LinkedIn, stroked for Instagram to match the design).
const socialIconClassName = "size-4 sm:size-[18px]"

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={socialIconClassName}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={socialIconClassName}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={socialIconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const socialIcons: Record<string, () => React.JSX.Element> = {
  X: XIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
}

const columnHeadingClassName =
  "text-xs font-semibold uppercase tracking-widest text-white sm:text-sm"

export function Footer() {
  // No newsletter backend yet — keep the submit from reloading the page.
  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <footer className="bg-neutral-950 px-4 pt-16 pb-8 text-neutral-400 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Wanderlust
        </p>
        <p className="mt-3 text-sm sm:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <h2 className={columnHeadingClassName}>Newsletter</h2>
            <p className="mt-3 text-sm">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex h-12 items-center rounded-md bg-neutral-800 py-1 pl-4 pr-1"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Enter email"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to the newsletter"
                className="grid size-10 shrink-0 place-items-center rounded-md text-white transition-colors hover:bg-neutral-700"
              >
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </button>
            </form>
          </div>

          <nav aria-label="Quick links">
            <h2 className={columnHeadingClassName}>Quick Links</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h2 className={columnHeadingClassName}>Support</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnHeadingClassName}>Contact Us</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+17869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandariland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wandariland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.label]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
