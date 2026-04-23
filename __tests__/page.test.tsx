import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

import { createProjectCard } from "./factories/createProjectCard";

const mockProjects = [createProjectCard(), createProjectCard({ name: "Second Project" })];

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: jest.fn() }),
}));

jest.mock("@/data/letterboxd.json", () => ({ films: [] }), { virtual: false });

jest.mock("@/data/projects", () => ({
  get projects() {
    return mockProjects;
  },
  infraProjects: [],
}));

describe("HomePage", () => {
  it("renders a level-1 heading in the hero", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the about section", () => {
    render(<HomePage />);
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
  });

  it("renders the resume download link", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/resume.pdf"
    );
  });

  it("renders the projects section", () => {
    render(<HomePage />);
    expect(screen.getByRole("region", { name: /projects/i })).toBeInTheDocument();
  });

  it("renders a card for each project", () => {
    render(<HomePage />);
    for (const project of mockProjects) {
      expect(screen.getByRole("heading", { name: project.name, level: 3 })).toBeInTheDocument();
    }
  });

  it("renders the contact section", () => {
    render(<HomePage />);
    expect(screen.getByRole("region", { name: /say hello/i })).toBeInTheDocument();
  });

  it("renders GitHub and email links in the hero", () => {
    render(<HomePage />);
    const githubLinks = screen.getAllByRole("link", { name: /github/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(githubLinks[0]).toHaveAttribute("href", "https://github.com/owenw2k");
  });

  it("renders the recently watched empty state when no films are present", () => {
    render(<HomePage />);
    expect(screen.getByRole("region", { name: /recently watched/i })).toBeInTheDocument();
    expect(screen.getByText(/waiting on the scraper/i)).toBeInTheDocument();
  });

  it("renders the behind the scenes empty state when no infra projects are present", () => {
    render(<HomePage />);
    expect(screen.getByText(/nothing to show yet/i)).toBeInTheDocument();
  });
});
