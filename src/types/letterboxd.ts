/** A single film entry from the Letterboxd scraper. */
export type LetterboxdFilm = {
  /** Display title of the film. */
  title: string;
  /** Release year. */
  year: number;
  /** Star rating on a 0.5–5 scale in 0.5 increments. */
  rating: number;
  /** URL to the film's page on Letterboxd (not the personal review). */
  letterboxdUrl: string;
  /** TMDB poster image URL. */
  posterUrl: string;
};
