import { cn } from "@/app/shared/interfaces/utils";
import { figtreeHeading, nunitoSans } from "@/config/fonts/font";
import "@/config/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        nunitoSans.variable,
        figtreeHeading.variable,
        "dark",
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
