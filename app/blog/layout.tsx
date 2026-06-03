import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aent Journal",
  description: "Explore the latest updates, digital product design methodologies, frontend performance solutions, and engineering insights from the creators at Aent Studio.",
  openGraph: {
    title: "Aent Journal (Blog) | Aent Studio",
    description: "Explore the latest updates, digital product design methodologies, frontend performance solutions, and engineering insights from the creators at Aent Studio.",
    url: "https://aent.studio/blog",
  },
  twitter: {
    title: "Aent Journal (Blog) | Aent Studio",
    description: "Explore the latest updates, digital product design methodologies, frontend performance solutions, and engineering insights from the creators at Aent Studio.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
