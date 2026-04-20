import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: jest.fn() }),
}));

jest.mock("@/data/letterboxd.json", () => ({ films: [] }), { virtual: false });
jest.mock("@/data/projects", () => ({
  projects: [
    {
      name: "Blog",
      description: "Personal blog.",
      githubUrl: "https://github.com/owenw2k/blog",
      techStack: ["Next.js"],
    },
    {
      name: "Travel Buddy",
      description: "Interactive travel map.",
      githubUrl: "https://github.com/owenw2k/travel-buddy",
      techStack: ["Next.js"],
    },
  ],
  infraProjects: [],
}));

describe("HomePage", () => {
  it("renders the hero heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the about section", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "About", level: 2 })).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "Projects", level: 2 })).toBeInTheDocument();
  });

  it("renders a card for each project", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Blog", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Travel Buddy", level: 3 })).toBeInTheDocument();
  });

  it("renders the contact section", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Say hello", level: 2 })).toBeInTheDocument();
  });

  it("renders GitHub and email links in the hero", () => {
    render(<HomePage />);
    const githubLinks = screen.getAllByRole("link", { name: /github/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(githubLinks[0]).toHaveAttribute("href", "https://github.com/owenw2k");
  });

  it("renders the recently watched empty state when no films are present", () => {
    render(<HomePage />);
    expect(screen.getByText("Waiting on the scraper…")).toBeInTheDocument();
  });

  it("renders the behind the scenes empty state when no infra projects are present", () => {
    render(<HomePage />);
    expect(screen.getByText(/nothing to show yet/i)).toBeInTheDocument();
  });
});
