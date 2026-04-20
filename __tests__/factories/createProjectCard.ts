import type { ProjectCard } from "@/data/projects";

/**
 * Creates a ProjectCard fixture with sensible defaults.
 *
 * @param overrides - Fields to override on the default fixture.
 * @returns A complete ProjectCard object.
 *
 * @example
 * const card = createProjectCard({ name: "My App", liveUrl: "https://example.com" });
 */
export const createProjectCard = (overrides: Partial<ProjectCard> = {}): ProjectCard => ({
  name: "Test Project",
  description: "A test project description.",
  githubUrl: "https://github.com/owenw2k/test",
  techStack: ["Next.js", "Tailwind"],
  ...overrides,
});
