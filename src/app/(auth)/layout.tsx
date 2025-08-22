import { inter } from "../layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}