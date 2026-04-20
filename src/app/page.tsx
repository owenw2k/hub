import { ExternalLink, Mail } from "lucide-react";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink } from "@/components/ui/button";
import letterboxdData from "@/data/letterboxd.json";
import { infraProjects, projects } from "@/data/projects";
import { formatRating } from "@/lib/format-rating";

import type { LetterboxdFilm } from "@/types/letterboxd";

const films = letterboxdData.films as LetterboxdFilm[];

/**
 * Homepage — hero, projects, infrastructure, recently watched, and contact.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky nav */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-heading text-lg font-semibold text-text-primary">Owen W</span>
          <DarkModeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="pb-24 pt-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Software engineer
          </p>
          <h1
            id="hero-heading"
            className="font-heading text-6xl font-bold tracking-tight text-text-primary sm:text-7xl lg:text-8xl"
          >
            Building things
            <br />
            on the web.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
            I like working across the full stack — from database schemas to UI details. Currently
            building a blog, a travel map, and whatever else seems interesting.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink
              href="https://github.com/owenw2k"
              variant="outline"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <ExternalLink className="mr-1.5 h-4 w-4" />
              GitHub
            </ButtonLink>
            <ButtonLink
              href="mailto:owenw2k@gmail.com"
              variant="outline"
              size="sm"
              aria-label="Send email"
            >
              <Mail className="mr-1.5 h-4 w-4" />
              Email
            </ButtonLink>
          </div>
        </section>

        {/* Projects */}
        <section aria-labelledby="projects-heading" className="pb-24">
          <h2
            id="projects-heading"
            className="font-heading text-3xl font-semibold text-text-primary"
          >
            Projects
          </h2>
          <p className="mt-2 text-text-muted">Things I&apos;ve built and am building.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>

        {/* Behind the Scenes */}
        <section aria-labelledby="infra-heading" className="pb-24">
          <h2 id="infra-heading" className="font-heading text-3xl font-semibold text-text-primary">
            Behind the Scenes
          </h2>
          <p className="mt-2 text-text-muted">
            Supporting services — scrapers, workers, cron jobs.
          </p>
          {infraProjects.length === 0 ? (
            <p className="mt-8 text-sm text-text-muted">Nothing to show yet. Check back soon.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {infraProjects.map((project) => (
                <article
                  key={project.name}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl font-semibold text-text-primary">
                      {project.name}
                    </h3>
                    <p className="text-sm text-text-muted">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-2">
                    <ButtonLink
                      href={project.githubUrl}
                      size="sm"
                      variant="outline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View repo
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Recently Watched */}
        <section aria-labelledby="watched-heading" className="pb-24">
          <h2
            id="watched-heading"
            className="font-heading text-3xl font-semibold text-text-primary"
          >
            Recently Watched
          </h2>
          <p className="mt-2 text-text-muted">Latest from Letterboxd.</p>
          {films.length === 0 ? (
            <p className="mt-8 text-sm text-text-muted">Waiting on the scraper…</p>
          ) : (
            <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
              {films.slice(0, 6).map((film) => (
                <a
                  key={film.letterboxdUrl}
                  href={film.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2"
                  aria-label={`${film.title} (${film.year}) — ${formatRating(film.rating)}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={film.posterUrl}
                    alt={`${film.title} poster`}
                    className="aspect-[2/3] w-full rounded-lg object-cover transition-opacity group-hover:opacity-80"
                  />
                  <span className="text-xs text-accent" aria-hidden>
                    {formatRating(film.rating)}
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading" className="pb-24">
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-semibold text-text-primary"
          >
            Say hello
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-muted">
            Questions, ideas, or just want to say hi — my inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="mailto:owenw2k@gmail.com" size="sm">
              <Mail className="mr-1.5 h-4 w-4" />
              owenw2k@gmail.com
            </ButtonLink>
            <ButtonLink
              href="https://github.com/owenw2k"
              size="sm"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-1.5 h-4 w-4" />
              GitHub
            </ButtonLink>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-xs text-text-muted">
          <p>Built with Next.js, Tailwind, and too much coffee.</p>
        </div>
      </footer>
    </div>
  );
}
