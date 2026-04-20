import { render, screen } from "@testing-library/react";

import { ProjectCard } from "@/components/ProjectCard";

import { createProjectCard } from "../factories/createProjectCard";

describe("ProjectCard", () => {
  it("renders the project name and description", () => {
    const card = createProjectCard({ name: "Blog", description: "My personal blog." });
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByText("My personal blog.")).toBeInTheDocument();
  });

  it("renders all tech stack tags", () => {
    const card = createProjectCard({ techStack: ["Next.js", "DynamoDB", "Lambda"] });
    render(<ProjectCard {...card} />);

    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("DynamoDB")).toBeInTheDocument();
    expect(screen.getByText("Lambda")).toBeInTheDocument();
  });

  it("renders the GitHub link", () => {
    const card = createProjectCard({ githubUrl: "https://github.com/owenw2k/blog" });
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/owenw2k/blog"
    );
  });

  it("renders the live demo link when liveUrl is provided", () => {
    const card = createProjectCard({ liveUrl: "https://example.com" });
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("does not render live demo link when liveUrl is absent", () => {
    const card = createProjectCard({ liveUrl: undefined });
    render(<ProjectCard {...card} />);

    expect(screen.queryByRole("link", { name: /live demo/i })).not.toBeInTheDocument();
  });

  it("renders the case study link when caseStudyUrl is provided", () => {
    const card = createProjectCard({ caseStudyUrl: "https://blog.example.com/case-study" });
    render(<ProjectCard {...card} />);

    expect(screen.getByRole("link", { name: /case study/i })).toHaveAttribute(
      "href",
      "https://blog.example.com/case-study"
    );
  });

  it("does not render case study link when caseStudyUrl is absent", () => {
    const card = createProjectCard({ caseStudyUrl: undefined });
    render(<ProjectCard {...card} />);

    expect(screen.queryByRole("link", { name: /case study/i })).not.toBeInTheDocument();
  });
});
