import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Let's build something elite. Share your digital project ideas, SaaS application requirements, or visual design inquiries with the Aent Studio team.",
  openGraph: {
    title: "Contact Aent Studio | Elite Design & Development",
    description: "Let's build something elite. Share your digital project ideas, SaaS application requirements, or visual design inquiries with the Aent Studio team.",
    url: "https://aent.studio/contact",
  },
  twitter: {
    title: "Contact Aent Studio | Elite Design & Development",
    description: "Let's build something elite. Share your digital project ideas, SaaS application requirements, or visual design inquiries with the Aent Studio team.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
