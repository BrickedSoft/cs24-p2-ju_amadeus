import { NavigationItems } from "@/types";
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@icons";
import { routes } from "./routes";

export const copyright = `Copyright © ${new Date().getFullYear()} | EcoSync, All rights reserved.`;

export const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/" },
  { Icon: Twitter, href: "https://twitter.com/" },
  { Icon: LinkedIn, href: "https://twitter.com/" },
  { Icon: YouTube, href: "https://twitter.com/" },
  { Icon: Instagram, href: "https://twitter.com/" },
];

export const footerLinks: NavigationItems[] = [
  {
    title: "Main Navigation",
    items: [
      {
        title: "Home",
        path: routes.home,
      },
      {
        title: "Profile",
        path: routes.profile,
      },
      {
        title: "Dashboard",
        path: routes.dashboard,
      },
    ],
  },
  {
    title: "Information",
    items: [
      {
        title: "STS",
        path: "#",
      },
      {
        title: "DNCC",
        path: "#",
      },
      {
        title: "Routes",
        path: "#",
      },
    ],
  },
  {
    title: "Quick Links",
    items: [
      {
        title: "Login",
        path: routes.login,
      },
      {
        title: "Reset Password",
        path: routes.initiate,
      },
      {
        title: "FAQ",
        path: "#",
      },
    ],
  },
];

export const copyrightLinks = [
  {
    title: "Terms & Conditions",
    path: "#",
  },
  {
    title: "Privacy Policy",
    path: "#",
  },
  {
    title: "Cookie Policy",
    path: "#",
  },
];

export const address = `North Side of Dhaka, 1207`;
export const phone = "+880 1777 777777";
export const email = "dncc@mail.com";
