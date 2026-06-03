import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aent Studio's philosophy, mission, vision, and core principles of precision engineering, pixel-perfect design, and transparent asynchronous collaboration.",
  openGraph: {
    title: "About Us | Aent Studio",
    description: "Learn about Aent Studio's philosophy, mission, vision, and core principles of precision engineering, pixel-perfect design, and transparent asynchronous collaboration.",
    url: "https://aent.studio/about-us",
  },
  twitter: {
    title: "About Us | Aent Studio",
    description: "Learn about Aent Studio's philosophy, mission, vision, and core principles of precision engineering, pixel-perfect design, and transparent asynchronous collaboration.",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
