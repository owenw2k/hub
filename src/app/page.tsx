import { Download, ExternalLink, Mail } from "lucide-react";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink } from "@/components/ui/button";
import letterboxdData from "@/data/letterboxd.json";
import { infraProjects, projects } from "@/data/projects";
import { formatRating } from "@/lib/format-rating";

import type { LetterboxdFilm } from "@/types/letterboxd";

const films = letterboxdData.films as LetterboxdFilm[];

/**
 * Homepage: hero, projects, infrastructure, recently watched, and contact.
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

      <main>
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden">
          {/* Warm radial glow behind the hero */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,color-mix(in_oklch,var(--accent)_8%,transparent),transparent)]" />
          <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-20">
            {/* Initials badge */}
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent font-heading text-xl font-bold text-white">
              OW
            </div>
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
              I like working across the full stack, from database schemas to UI details. Currently
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
          </div>
        </section>

        {/* About + Resume */}
        <section aria-labelledby="about-heading" className="bg-surface/60 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              {/* Photo */}
              <div className="shrink-0 lg:w-72">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/self.jpg"
                    alt="Owen W"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-6">
                <h2
                  id="about-heading"
                  className="font-heading text-3xl font-semibold text-text-primary"
                >
                  About
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-text-muted">
                  <p>
                    I&apos;m a software engineer who enjoys building things end-to-end: writing the
                    schema, standing up the API, and sweating the UI details. I care about code that
                    is easy to read, systems that are easy to reason about, and products that are
                    actually pleasant to use.
                  </p>
                  <p>
                    Outside of work I&apos;m usually watching films, planning the next trip, or
                    tinkering with a side project that probably won&apos;t ship. This site is one of
                    the ones that did.
                  </p>
                </div>
                <div>
                  <ButtonLink href="/resume.pdf" download size="sm">
                    <Download className="mr-1.5 h-4 w-4" />
                    Download resume
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section aria-labelledby="projects-heading" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline gap-3">
              <h2
                id="projects-heading"
                className="font-heading text-3xl font-semibold text-text-primary"
              >
                Projects
              </h2>
              <span className="text-sm text-text-muted">
                Things I&apos;ve built and am building.
              </span>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Behind the Scenes */}
        <section aria-labelledby="infra-heading" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline gap-3">
              <h2
                id="infra-heading"
                className="font-heading text-3xl font-semibold text-text-primary"
              >
                Behind the Scenes
              </h2>
              <span className="text-sm text-text-muted">Scrapers, workers, cron jobs.</span>
            </div>
            {infraProjects.length === 0 ? (
              <p className="mt-8 text-sm text-text-muted">Nothing to show yet. Check back soon.</p>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {infraProjects.map((project) => (
                  <article
                    key={project.name}
                    className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-accent/50 to-transparent" />
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
          </div>
        </section>

        {/* Recently Watched — surface tint */}
        <section aria-labelledby="watched-heading" className="bg-surface/60 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline gap-3">
              <h2
                id="watched-heading"
                className="font-heading text-3xl font-semibold text-text-primary"
              >
                Recently Watched
              </h2>
              <span className="text-sm text-text-muted">Latest from Letterboxd.</span>
            </div>
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
                    aria-label={`${film.title} (${film.year}), ${formatRating(film.rating)}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={film.posterUrl}
                      alt={`${film.title} poster`}
                      className="aspect-[2/3] w-full rounded-lg object-cover shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md"
                    />
                    <span className="text-xs text-accent" aria-hidden>
                      {formatRating(film.rating)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2
              id="contact-heading"
              className="font-heading text-3xl font-semibold text-text-primary"
            >
              Say hello
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-muted">
              Questions, ideas, or just want to say hi. My inbox is open.
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-xs text-text-muted">
          <p>Built with Next.js, Tailwind, and too much Red Bull.</p>
        </div>
      </footer>
    </div>
  );
}
