import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "@/components/ThemeProvider";

jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("ThemeProvider", () => {
  it("renders its children", () => {
    render(
      <ThemeProvider>
        <span>hello</span>
      </ThemeProvider>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
