import { NavBar } from "@/app/widgets/nav-bar";

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
