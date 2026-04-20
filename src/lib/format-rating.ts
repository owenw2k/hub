/**
 * Converts a numeric Letterboxd rating to a star string.
 *
 * @param rating - Rating on a 0.5–5 scale in 0.5 increments.
 * @returns A string of ★ characters with an optional ½ suffix.
 *
 * @example
 * formatRating(4);   // "★★★★"
 * formatRating(3.5); // "★★★½"
 */
export const formatRating = (rating: number): string => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return "★".repeat(full) + (half ? "½" : "");
};
