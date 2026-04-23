import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

import { createInfraCard } from "./factories/createInfraCard";

import type { LetterboxdFilm } from "@/types/letterboxd";

// letterboxd.json is read at module level in page.tsx, so the mock must return a plain value —
// a getter closure would reference module-level variables before they are initialized due to
// Jest's mock hoisting. Assertions derive the title from jest.requireMock to avoid repeating
// the literal string.
jest.mock("@/data/letterboxd.json", () => ({
  films: [
    {
      title: "Test Film",
      year: 2024,
      rating: 4.0,
      letterboxdUrl: "https://letterboxd.com/film/test-film",
      posterUrl: "https://example.com/poster.jpg",
    },
  ],
}));

const mockInfraCard = createInfraCard();

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: jest.fn() }),
}));

jest.mock("@/components/DarkModeToggle", () => ({
  DarkModeToggle: () => null,
}));

jest.mock("@/data/projects", () => ({
  projects: [],
  get infraProjects() {
    return [mockInfraCard];
  },
}));

describe("HomePage with film and infra data", () => {
  it("renders a film poster when films are present", () => {
    render(<HomePage />);
    const { films } = jest.requireMock("@/data/letterboxd.json") as { films: LetterboxdFilm[] };
    expect(screen.getByAltText(`${films[0].title} poster`)).toBeInTheDocument();
  });

  it("renders an infra project card when infra projects are present", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: mockInfraCard.name, level: 3 })).toBeInTheDocument();
  });
});
