import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DarkModeToggle } from "@/components/DarkModeToggle";

const mockSetTheme = jest.fn();
let mockTheme = "light";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
}));

describe("DarkModeToggle", () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    mockTheme = "light";
  });

  it("renders the toggle button", () => {
    render(<DarkModeToggle />);
    expect(screen.getByRole("button", { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it("calls setTheme with 'dark' when currently light", async () => {
    render(<DarkModeToggle />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("shows 'switch to light mode' label when dark", () => {
    mockTheme = "dark";
    render(<DarkModeToggle />);
    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it("calls setTheme with 'light' when currently dark", async () => {
    mockTheme = "dark";
    render(<DarkModeToggle />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
