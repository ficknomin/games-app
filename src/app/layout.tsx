import type { Metadata } from "next";
import { Nunito_Sans, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Provider } from "@/components/Provider";

const figtreeHeading = Figtree({ subsets: ['latin'], variable: '--font-heading' });

const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans' });


export const metadata: Metadata = {
  title: "GameHub",
  description: "A platform to discover and share your favorite games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", nunitoSans.variable, figtreeHeading.variable, "dark")}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
