import { render, screen } from "@testing-library/react";

import { Button, ButtonLink } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders with explicit variant and size", () => {
    render(
      <Button variant="outline" size="sm">
        Outline
      </Button>
    );
    expect(screen.getByRole("button", { name: "Outline" })).toBeInTheDocument();
  });
});

describe("ButtonLink", () => {
  it("renders with default variant and size", () => {
    render(<ButtonLink href="/test">Link</ButtonLink>);
    expect(screen.getByRole("link", { name: "Link" })).toHaveAttribute("href", "/test");
  });

  it("renders with explicit variant and size", () => {
    render(
      <ButtonLink href="/test" variant="ghost" size="sm">
        Ghost link
      </ButtonLink>
    );
    expect(screen.getByRole("link", { name: "Ghost link" })).toBeInTheDocument();
  });
});
