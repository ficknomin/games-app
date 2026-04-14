import type { Metadata } from "next";
import "@/config/styles/globals.css";
import { cn } from "@/app/shared/interfaces/utils";
import { Provider } from "@/config/providers/query-provider.component";
import { SyncProvider } from "@/config/providers/sync-provider.component";
import { figtreeHeading, nunitoSans } from "@/config/fonts/font";

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
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        nunitoSans.variable,
        figtreeHeading.variable,
        "dark",
      )}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <SyncProvider>{children}</SyncProvider>
        </Provider>
      </body>
    </html>
  );
}
