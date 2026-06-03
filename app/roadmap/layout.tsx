import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Roadmap",
  description: "Follow the product development backlog, sprint checkpoints, and upcoming milestones at Aent Studio. See what features and systems we are crafting next.",
  openGraph: {
    title: "Product Roadmap & Backlog | Aent Studio",
    description: "Follow the product development backlog, sprint checkpoints, and upcoming milestones at Aent Studio. See what features and systems we are crafting next.",
    url: "https://aent.studio/roadmap",
  },
  twitter: {
    title: "Product Roadmap & Backlog | Aent Studio",
    description: "Follow the product development backlog, sprint checkpoints, and upcoming milestones at Aent Studio. See what features and systems we are crafting next.",
  },
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
