"use client";
import { useRequireAuth } from "@/features/auth/hooks/useAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuth();
  return <>{children}</>;
}
