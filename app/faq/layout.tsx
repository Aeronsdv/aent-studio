import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find clear answers to common questions about Aent Studio's technologies, design-first development workflow, project timelines, pricing, and post-launch maintenance.",
  openGraph: {
    title: "FAQ | Aent Studio",
    description: "Find clear answers to common questions about Aent Studio's technologies, design-first development workflow, project timelines, pricing, and post-launch maintenance.",
    url: "https://aent.studio/faq",
  },
  twitter: {
    title: "FAQ | Aent Studio",
    description: "Find clear answers to common questions about Aent Studio's technologies, design-first development workflow, project timelines, pricing, and post-launch maintenance.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
