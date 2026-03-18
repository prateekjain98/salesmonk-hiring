import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import type { Appearance } from "@clerk/ui";
import "./globals.css";
import localFont from "next/font/local";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata = {
  title: "Careers — SalesMonk",
  description: "Join us in building the GTM intelligence layer.",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const clerkAppearance = {
  variables: {
    colorPrimary: "#f97316",
    colorBackground: "#0f0f0f",
    colorForeground: "#ffffff",
  },
  elements: {
    card: "bg-[#111111] border border-white/8 shadow-none",
    headerTitle: "text-white",
    headerSubtitle: "text-white/50",
    socialButtonsBlockButton: "border-white/10 bg-white/4 text-white/80 hover:bg-white/8",
    socialButtonsBlockButtonText: "text-white/80",
    dividerText: "text-white/30",
    formFieldLabel: "text-white/50",
    formFieldInput: "bg-[#1a1a1a] border-white/10 text-white",
    footerActionText: "text-white/40",
    footerActionLink: "text-orange-400 hover:text-orange-300",
  },
} satisfies Appearance;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClerkProvider ui={ui} appearance={clerkAppearance}>
        <body className="min-h-screen flex flex-col antialiased bg-black">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
