import type { Metadata } from "next";
import "./globals.css";
import { PenyediaTema } from "@/components/penyedia-tema";

export const metadata: Metadata = {
  title: "Bagas Pratama — Senior Fullstack Engineer & Creative Technologist",
  description:
    "Portal identitas digital profesional dan platform deployment instan untuk web statis via drag-and-drop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        <PenyediaTema
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </PenyediaTema>
      </body>
    </html>
  );
}
