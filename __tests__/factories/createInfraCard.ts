import { Camera } from "lucide-react";

import type { InfraCard } from "@/data/projects";

/**
 * Creates an InfraCard fixture with sensible defaults.
 *
 * @param overrides - Fields to override on the default fixture.
 * @returns A complete InfraCard object.
 *
 * @example
 * const card = createInfraCard({ name: "My Tool", githubUrl: "https://github.com/owenw2k/my-tool" });
 */
export const createInfraCard = (overrides: Partial<InfraCard> = {}): InfraCard => ({
  name: "Test Tool",
  description: "A test infrastructure tool.",
  githubUrl: "https://github.com/owenw2k/test-tool",
  techStack: ["Node.js", "TypeScript"],
  icon: Camera,
  ...overrides,
});
