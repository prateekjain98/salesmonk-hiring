import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#0f0f0f",
            colorInputText: "#ffffff",
            colorText: "#ffffff",
            colorTextSecondary: "rgba(255,255,255,0.65)",
            colorPrimary: "#f97316",
            colorNeutral: "#ffffff",
            borderRadius: "0.5rem",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          },
          elements: {
            headerTitle: "!text-white",
            headerSubtitle: "!text-white/60",
            socialButtonsBlockButton: "!text-white/80 !border-white/15",
            socialButtonsBlockButtonText: "!text-white/80",
            dividerText: "!text-white/35",
            formFieldLabel: "!text-white/55",
            footerActionText: "!text-white/50",
            footerActionLink: "!text-orange-400 hover:!text-orange-300",
            identityPreviewText: "!text-white/70",
          },
        }}
      >
        <body className="min-h-screen flex flex-col antialiased bg-black">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
