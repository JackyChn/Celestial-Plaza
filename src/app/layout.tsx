import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/toaster";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Celestial Plaza",
    absolute: "Celestial Plaza",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <NavBar />
            <div className="min-h-[50vh]">{children}</div>
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
