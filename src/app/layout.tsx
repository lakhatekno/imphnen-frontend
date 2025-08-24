import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/features/layout/components/header.component";
import AppInitializer from "@/features/auth/components/AppInitializer";
import Toast from "@/lib/components/toast";
import { useToast } from "@/services/toast.store";
import ToastWrapper from "@/features/layout/components/ToastWrapper.component";
import Footer from "@/features/layout/components/footer.component";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kerja Merdeka",
  description: "Generate CV kamu pake AI!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AppInitializer />
        <Header />
        <main className="p-8 pb-20 gap-16 md:px-20 relative">
          {children}

          {/* Toast / Notif */}
          <ToastWrapper></ToastWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
