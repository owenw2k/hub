import { BookOpen, ExternalLink } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

import type { ProjectCard as ProjectCardType } from "@/data/projects";

type Props = ProjectCardType;

/**
 * Displays a project card with name, description, tech stack tags, and links.
 *
 * @param props - ProjectCard data.
 */
export const ProjectCard = ({
  name,
  description,
  liveUrl,
  githubUrl,
  caseStudyUrl,
  techStack,
}: Props) => (
  <article className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md">
    <div className="flex flex-col gap-1">
      <h3 className="font-heading text-xl font-semibold text-text-primary">{name}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>

    <div className="flex flex-wrap gap-2">
      {techStack.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-muted"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="mt-auto flex flex-wrap gap-2 pt-2">
      {liveUrl && (
        <ButtonLink href={liveUrl} size="sm" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
          Live demo
        </ButtonLink>
      )}
      <ButtonLink
        href={githubUrl}
        size="sm"
        variant="outline"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </ButtonLink>
      {caseStudyUrl && (
        <ButtonLink
          href={caseStudyUrl}
          size="sm"
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
          Case study
        </ButtonLink>
      )}
    </div>
  </article>
);
