import { formatRating } from "@/lib/format-rating";

describe("formatRating", () => {
  it("returns full stars for whole numbers", () => {
    expect(formatRating(5)).toBe("★★★★★");
    expect(formatRating(4)).toBe("★★★★");
    expect(formatRating(1)).toBe("★");
  });

  it("appends ½ for half-star ratings", () => {
    expect(formatRating(4.5)).toBe("★★★★½");
    expect(formatRating(3.5)).toBe("★★★½");
    expect(formatRating(0.5)).toBe("½");
  });

  it("returns empty string for 0", () => {
    expect(formatRating(0)).toBe("");
  });
});
