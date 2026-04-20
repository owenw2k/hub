import { BookOpen, ExternalLink } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

import type { ProjectCard as ProjectCardType } from "@/data/projects";

type Props = ProjectCardType;

/**
 * Displays a project card with screenshot, name, description, tech stack tags, and links.
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
  screenshot,
}: Props) => (
  <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:shadow-lg">
    {/* Screenshot or gradient placeholder */}
    <div className="aspect-[16/9] w-full overflow-hidden">
      {screenshot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshot}
          alt={`${name} screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
          <span className="select-none font-heading text-4xl font-bold text-accent/20">
            {name.charAt(0)}
          </span>
        </div>
      )}
    </div>

    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-xl font-semibold text-text-primary">{name}</h3>
        <p className="text-sm leading-relaxed text-text-muted">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {techStack.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-text-muted"
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
    </div>
  </article>
);
