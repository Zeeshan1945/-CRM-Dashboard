import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const urbanist = localFont({
  src: "../assets/Urbanist.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: {
    default: "Rapport — the CRM that remembers every customer",
    template: "%s · Rapport",
  },
  description:
    "Rapport is a sales CRM dashboard: revenue, hot deals, pipeline, customers, schedule and team performance in one place.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121411" },
    { media: "(prefers-color-scheme: light)", color: "#e9e5dc" },
  ],
};

// Runs before first paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem("rapport-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={urbanist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
