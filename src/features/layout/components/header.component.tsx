"use client";

import { useAuthStore } from "@/services/auth/authStore";
import { FileText, House, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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

  if (pathname === "/")
    return (
      <header className="fixed top-0 w-full bg-white shadow z-50">
        <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 px-8">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="KerjaMerdeka Logo"
            className="h-8"
            width={32}
            height={32}
          />

          {/* Hamburger Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              // X icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700">
            <li>
              <a href="#features">Fitur Unggulan</a>
            </li>
            <li>
              <a href="#steps">Cara Kerja</a>
            </li>
            <li>
              <a href="#about">Tentang Kami</a>
            </li>
          </ul>

          <div className="hidden md:flex space-x-3">
            {isAuthenticated ? (
              <a
                href="/job-companion"
                className="bg-accent text-white px-4 py-2 rounded-lg"
              >
                Dasbor
              </a>
            ) : (
              <>
                <a href="/login" className="text-accent px-4 py-2">
                  Masuk
                </a>
                <a
                  href="/register"
                  className="bg-accent text-white px-4 py-2 rounded-lg"
                >
                  Daftar
                </a>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col space-y-4 py-4 px-8 text-gray-700">
              <li>
                <a href="#features" onClick={() => setIsOpen(false)}>
                  Fitur Unggulan
                </a>
              </li>
              <li>
                <a href="#steps" onClick={() => setIsOpen(false)}>
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setIsOpen(false)}>
                  Tentang Kami
                </a>
              </li>
            </ul>
            <div className="flex flex-col space-y-3 py-4 px-8">
              {isAuthenticated ? (
                <a
                  href="/job-companion"
                  className="bg-accent text-white px-4 py-2 rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Dasbor
                </a>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-accent text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Masuk
                  </a>
                  <a
                    href="/register"
                    className="bg-accent text-white px-4 py-2 rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    );

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
