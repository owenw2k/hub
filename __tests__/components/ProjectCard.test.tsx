import { render, screen } from "@testing-library/react";

import { ProjectCard } from "@/components/ProjectCard";

import { createProjectCard } from "../factories/createProjectCard";

describe("ProjectCard", () => {
  it("renders the project name and description", () => {
    const card = createProjectCard();
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("heading", { name: card.name })).toBeInTheDocument();
    expect(screen.getByText(card.description)).toBeInTheDocument();
  });

  it("renders all tech stack tags", () => {
    const card = createProjectCard({ techStack: ["Next.js", "DynamoDB", "Lambda"] });
    render(<ProjectCard {...card} />);

    for (const tag of card.techStack) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("renders the GitHub link", () => {
    const card = createProjectCard();
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", card.githubUrl);
  });

  it("renders a stretched card link to liveUrl when provided", () => {
    const card = createProjectCard({ liveUrl: "https://example.com" });
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("link", { name: /open test project/i })).toHaveAttribute(
      "href",
      card.liveUrl
    );
  });

  it("does not render a card link when liveUrl is absent", () => {
    const card = createProjectCard({ liveUrl: undefined });
    render(<ProjectCard {...card} />);

    expect(screen.queryByRole("link", { name: /open test project/i })).not.toBeInTheDocument();
  });

  it("renders the case study link when caseStudyUrl is provided", () => {
    const card = createProjectCard({ caseStudyUrl: "https://blog.example.com/case-study" });
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("link", { name: /case study/i })).toHaveAttribute(
      "href",
      card.caseStudyUrl
    );
  });

  it("does not render case study link when caseStudyUrl is absent", () => {
    const card = createProjectCard({ caseStudyUrl: undefined });
    render(<ProjectCard {...card} />);

    expect(screen.queryByRole("link", { name: /case study/i })).not.toBeInTheDocument();
  });
});
