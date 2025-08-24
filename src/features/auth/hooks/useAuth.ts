"use client";
import { useAuthStore } from "@/services/auth/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!_hasHydrated) return;
    console.log("isAuthenticated:", isAuthenticated, "pathname:", pathname);
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, router, pathname, _hasHydrated]);

  return isAuthenticated && _hasHydrated;
}
