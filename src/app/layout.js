import { Inter } from "next/font/google";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "HireLoop — Find Your Dream Job Today",
  description: "HireLoop connects top talent with world-class companies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <ConditionalNavbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
