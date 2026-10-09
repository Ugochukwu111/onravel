export const productColors = [
  { name: "Black", hex: "#171717" },
  { name: "Navy Blue", hex: "#172554" },
  { name: "Royal Blue", hex: "#2455A4" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Teal", hex: "#0F766E" },
  { name: "Forest Green", hex: "#14532D" },
  { name: "Olive", hex: "#65743A" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Wine", hex: "#722F37" },
  { name: "Maroon", hex: "#6B1F2A" },
  { name: "Charcoal", hex: "#364152" },
  { name: "Grey", hex: "#9CA3AF" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Cream", hex: "#F5E6C8" },
  { name: "Chocolate", hex: "#5D4037" },
] as const;

export type ProductColor = (typeof productColors)[number];
