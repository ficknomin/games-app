import { Nunito_Sans, Figtree } from "next/font/google";

export const figtreeHeading = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
