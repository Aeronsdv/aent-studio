import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the Aent Studio digital community. Connect with our founders, design-focused engineers, and partners on Discord, WhatsApp, GitHub, and Twitter.",
  openGraph: {
    title: "Community | Aent Studio",
    description: "Join the Aent Studio digital community. Connect with our founders, design-focused engineers, and partners on Discord, WhatsApp, GitHub, and Twitter.",
    url: "https://aent.studio/community",
  },
  twitter: {
    title: "Community | Aent Studio",
    description: "Join the Aent Studio digital community. Connect with our founders, design-focused engineers, and partners on Discord, WhatsApp, GitHub, and Twitter.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
