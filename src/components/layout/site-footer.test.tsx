import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SPONSOR_URL } from "@/lib/sponsor";
import SiteFooter from "./site-footer";

describe("SiteFooter", () => {
  it("points the sponsor link at GitHub Sponsors", () => {
    expect(SPONSOR_URL).toBe("https://github.com/sponsors/Zwelc");
  });

  it("links to GitHub Sponsors in a new tab and no longer to Buy Me a Coffee", () => {
    const { container } = render(<SiteFooter />);
    const link = screen.getByRole("link", { name: /sponsor veil/i });
    expect(link).toHaveAttribute("href", "https://github.com/sponsors/Zwelc");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(container.querySelector('a[href*="buymeacoffee"]')).toBeNull();
  });
});
