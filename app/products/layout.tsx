import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Explore our portfolio of high-performance web applications, dynamic investment brand systems, and premium mobile interfaces crafted by Aent Studio.",
  openGraph: {
    title: "Selected Projects & Works | Aent Studio",
    description: "Explore our portfolio of high-performance web applications, dynamic investment brand systems, and premium mobile interfaces crafted by Aent Studio.",
    url: "https://aent.studio/products",
  },
  twitter: {
    title: "Selected Projects & Works | Aent Studio",
    description: "Explore our portfolio of high-performance web applications, dynamic investment brand systems, and premium mobile interfaces crafted by Aent Studio.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
