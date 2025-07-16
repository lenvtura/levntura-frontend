import { Routes } from "@/constants/routes";

export const Navlinks = [
  {
    label(label: string = "Home") {
      return label;
    },
    path: Routes.home,
  },
  {
    label(label: string = "About us") {
      return label;
    },
    path: Routes.about,
  },
  // {
  //   label(label: string = "Gallery") {
  //     return label;
  //   },
  //   path: Routes.gallery,
  // },
  // {
  //   label(label: string = "Blogs") {
  //     return label;
  //   },
  //   path: Routes.blogs,
  // },
  // {
  //   label(label: string = "Programs") {
  //     return label;
  //   },
  //   path: Routes.programs,
  // },
  // {
  //   label(label: string = "Careers") {
  //     return label;
  //   },
  //   path: Routes.careers,
  // },
  {
    label(label: string = "Contact") {
      return label;
    },
    path: Routes.contact,
  },
];
