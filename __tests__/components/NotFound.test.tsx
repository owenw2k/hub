import { render, screen } from "@testing-library/react";

import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("renders the 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: "Nothing here." })).toBeInTheDocument();
  });

  it("renders a link back to the homepage", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: /back home/i })).toHaveAttribute("href", "/");
  });
});
