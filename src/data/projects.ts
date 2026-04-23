/**
 * Data types and content for the project showcase and infrastructure sections.
 */

import { Camera } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/** A public-facing project with a live deployment. */
export type ProjectCard = {
  /** Display name shown as the card heading. */
  name: string;
  /** One-line description shown on the card. */
  description: string;
  /** Deployed live URL; omit until the project is live. */
  liveUrl?: string;
  /** GitHub repository URL. */
  githubUrl: string;
  /** Optional link to a blog post case study. */
  caseStudyUrl?: string;
  /** Tech stack labels rendered as tags. */
  techStack: string[];
  /** Path to a screenshot in /public; omit until a screenshot is available. */
  screenshot?: string;
};

/** A backend or infrastructure project with no frontend deployment. */
export type InfraCard = {
  /** Display name shown as the card heading. */
  name: string;
  /** One-line description of what the service does. */
  description: string;
  /** GitHub repository URL. */
  githubUrl: string;
  /** Tech stack labels rendered as tags. */
  techStack: string[];
  /** Lucide icon representing what the tool does. */
  icon: LucideIcon;
};

/** Projects shown in the main showcase section. */
export const projects: ProjectCard[] = [
  {
    name: "Blog",
    description: "Personal blog with writing on software, design, and building things.",
    githubUrl: "https://github.com/owenw2k/blog",
    techStack: ["Next.js", "Tailwind", "AWS Lambda", "DynamoDB", "MDX"],
  },
  {
    name: "Travel Buddy",
    description:
      "Interactive map to track the regions you've visited, driven through, and lived in.",
    githubUrl: "https://github.com/owenw2k/travel-buddy",
    techStack: ["Next.js", "Tailwind", "Zustand", "react-simple-maps", "IndexedDB"],
  },
];

/** Infrastructure and tooling projects shown in the "Behind the Scenes" section. */
export const infraProjects: InfraCard[] = [
  {
    name: "screenshot-action",
    description:
      "GitHub composite action that captures element-level PR screenshots, diffs them pixel-by-pixel against the base branch, and injects a before/after table into the PR description.",
    githubUrl: "https://github.com/owenw2k/screenshot-action",
    techStack: ["GitHub Actions", "TypeScript", "Node.js", "Playwright", "pixelmatch"],
    icon: Camera,
  },
];
