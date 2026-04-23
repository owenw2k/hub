import type { LetterboxdFilm } from "@/types/letterboxd";

/**
 * Creates a LetterboxdFilm fixture with sensible defaults.
 *
 * @param overrides - Fields to override on the default fixture.
 * @returns A complete LetterboxdFilm object.
 *
 * @example
 * const film = createLetterboxdFilm({ title: "Dune", year: 2021, rating: 4.5 });
 */
export const createLetterboxdFilm = (overrides: Partial<LetterboxdFilm> = {}): LetterboxdFilm => ({
  title: "Test Film",
  year: 2024,
  rating: 4.0,
  letterboxdUrl: "https://letterboxd.com/film/test-film",
  posterUrl: "https://example.com/poster.jpg",
  ...overrides,
});
