import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SKYTIVE PHOTOBOOTH — Contemporary Studio Photobooth",
  description:
    "Contemporary Minimalist Editorial Photobooth. Tangkap momen terbaikmu dalam format 3-Strip dan Newspaper Edition langsung dari browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen min-h-[100dvh] flex flex-col antialiased bg-[#F5F3EE] text-[#191919] selection:bg-[#191919] selection:text-[#F5F3EE]">
        <Header />
        <main className="w-full flex-1 flex flex-col items-center justify-start px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#191919",
              color: "#F5F3EE",
              border: "1px solid rgba(245, 243, 238, 0.15)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              borderRadius: "10px",
            },
          }}
        />
      </body>
    </html>
  );
}

