export const siteConfig = {
  name: "Onravel",
  description:
    "Contemporary African fashion designed to make a statement.",

  url: "https://onravel.com",

  brand: {
    name: "Onravel",
    tagline: "Wear your statement.",
  },

  contact: {
    email: "hello@onravel.com",
    phone: "",
    whatsapp: "",
  },

  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    twitter: "",
  },

  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Scrubs",
      href: "/scrubs",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
} as const;