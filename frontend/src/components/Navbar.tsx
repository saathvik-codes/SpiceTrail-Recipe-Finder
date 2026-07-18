"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-spice-600">
          SpiceTrail
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-spice-600">
            Search
          </Link>
          {user ? (
            <>
              <Link href="/favorites" className="hover:text-spice-600">
                Favorites
              </Link>
              <span className="text-neutral-500">{user.name}</span>
              <button onClick={logout} className="rounded bg-neutral-100 px-3 py-1 hover:bg-neutral-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-spice-600">
                Login
              </Link>
              <Link href="/register" className="rounded bg-spice-500 px-3 py-1 text-white hover:bg-spice-600">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
