import { useAuthStore } from "@/services/auth/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, router, pathname]);

  return isAuthenticated;
}
