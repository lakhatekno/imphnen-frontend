import ProtectedLayout from "../protected-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
