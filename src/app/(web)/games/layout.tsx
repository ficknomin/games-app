import { NavBar } from "@/app/widgets/nav-bar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Games",
    template: "%s | Games",
  },
  description: "Games collection with 1000+ games for all platforms",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full w-full flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}
