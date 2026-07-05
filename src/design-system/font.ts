import localFont from "next/font/local";

export const Gelion = localFont({
  src: [
    {
      path: "../assets/fonts/gelion-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/gelion-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/gelion-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/gelion-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/gelion-black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});
