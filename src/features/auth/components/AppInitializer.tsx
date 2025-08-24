"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/services/auth/authStore";

export default function AppInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return null;
}
