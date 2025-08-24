"use client";

import { useAuthStore } from "@/services/auth/authStore";
import { FileText, House, User } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Hide nav buttons on (auth) pages
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/auth");

  return (
    <header className="sticky top-0 z-10 bg-white flex items-center justify-between min-h-20 shadow-sm shadow-gray-500 px-8 md:px-20 py-2">
      <div className="flex gap-2 items-center">
        <Link href="/" className="font-sans font-bold text-accent text-2xl">
          KerjaMerdeka
        </Link>
        {!isAuthPage && (
          <nav className="flex gap-2">
            <Link
              href={"/job-companion"}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-accent text-white rounded-lg"
            >
              <House />
              Dashboard
            </Link>
            <Link
              href={"/"}
              className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg"
            >
              <FileText />
              CV Saya
            </Link>
          </nav>
        )}
      </div>
      <div className="flex gap-2">
        {isAuthenticated ? (
          <>
            <Link
              href={"/profile"}
              className="flex items-center gap-1 px-4 py-2 text-sm"
            >
              <User />
              Profile
            </Link>
            <button
              className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-[#EF4444] hover:bg-[#db3d3d] text-white rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-white border border-accent text-accent rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
