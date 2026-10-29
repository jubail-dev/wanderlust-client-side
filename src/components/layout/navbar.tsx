"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

type NavItem = {
  href: string;
  label: string;
  icon?: typeof User;
};

const primaryLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/add-destinations", label: "Add Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
];

const accountLinks: NavItem[] = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/login", label: "Login" },
  { href: "/sign-up", label: "Sign Up" },
];

const guestAccountLinks = accountLinks.filter(
  (item) => item.href === "/login" || item.href === "/sign-up",
);
const signedInAccountLinks = accountLinks.filter(
  (item) => item.href !== "/login" && item.href !== "/sign-up",
);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "?";
}

function NavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-600 transition-colors hover:text-cyan-700",
        "after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:bg-cyan-500 after:content-[''] after:transition-transform",
        active
          ? "font-medium text-cyan-700 after:scale-x-100"
          : "after:scale-x-0 hover:after:scale-x-100",
      )}
    >
      {Icon ? <Icon aria-hidden="true" className="size-4" /> : null}
      <span>{item.label}</span>
    </Link>
  );
}

/** Profile Avatar Trigger with Dialog/Popover Content */
function UserMenu({
  name,
  image,
  onSignOut,
}: {
  name: string;
  image?: string | null;
  onSignOut: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger className="flex cursor-pointer items-center gap-2 rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Avatar>
          <AvatarImage src={image ?? undefined} alt={name} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-2.5">
            <Avatar className="size-9">
              <AvatarImage src={image ?? undefined} alt={name} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-sm font-semibold text-neutral-800">
                {name}
              </span>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={onSignOut}
            className="w-full justify-start gap-2"
          >
            <LogOut className="size-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const accountNavLinks = isPending
    ? []
    : user
      ? signedInAccountLinks
      : guestAccountLinks;
  const mobileLinks = [...primaryLinks, ...accountNavLinks];

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 sm:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" className="size-5" />
          </Button>

          <nav aria-label="Primary" className="hidden items-center md:flex">
            {primaryLinks.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="justify-self-center text-xl font-bold tracking-tight text-cyan-500 sm:text-2xl"
        >
          Wanderlust
        </Link>

        <nav
          aria-label="Account"
          className="hidden items-center justify-end gap-2 md:flex"
        >
          {accountNavLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          {user ? (
            <UserMenu
              name={user.name}
              image={user.image}
              onSignOut={handleSignOut}
            />
          ) : null}
        </nav>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <nav
            id="mobile-navigation"
            aria-label="Mobile"
            className="flex flex-col gap-1 px-2 pt-12 pb-4"
          >
            {mobileLinks.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
            {user ? (
              <div className="mt-2 border-t border-neutral-200 pt-4 px-3 flex items-center justify-between">
                <UserMenu
                  name={user.name}
                  image={user.image}
                  onSignOut={handleSignOut}
                />
                <span className="text-sm font-medium text-neutral-700">
                  {user.name}
                </span>
              </div>
            ) : null}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
