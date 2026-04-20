import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: jest.fn() }),
}));

jest.mock("@/components/DarkModeToggle", () => ({
  DarkModeToggle: () => null,
}));

jest.mock("@/data/letterboxd.json", () => ({
  films: [
    {
      title: "Inception",
      year: 2010,
      rating: 4.5,
      letterboxdUrl: "https://letterboxd.com/film/inception",
      posterUrl: "https://example.com/poster.jpg",
    },
  ],
}));

jest.mock("@/data/projects", () => ({
  projects: [],
  infraProjects: [
    {
      name: "Scraper",
      description: "Fetches Letterboxd data.",
      githubUrl: "https://github.com/owenw2k/scraper",
      techStack: ["Node.js"],
    },
  ],
}));

describe("HomePage with film and infra data", () => {
  it("renders a film poster when films are present", () => {
    render(<HomePage />);
    expect(screen.getByAltText("Inception poster")).toBeInTheDocument();
  });

  it("renders an infra project card when infra projects are present", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Scraper", level: 3 })).toBeInTheDocument();
  });
});
