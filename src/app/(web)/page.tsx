import { Metadata } from "next";
import { HomePage } from "@/app/modules/home";

export const metadata: Metadata = {
  title: "Games Hub",
  description: "A video games collection hub to research and favorite games",
};

const Home = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <HomePage />
    </div>
  );
};

export default Home;
