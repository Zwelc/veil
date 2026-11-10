import { describe, expect, it } from "vitest";
import { renderWithClient } from "../../../test/utils";
import LaneMap from "./lane-map";

describe("LaneMap", () => {
  it("is decorative: hidden from assistive tech", () => {
    const { container } = renderWithClient(<LaneMap />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("draws the river, three lanes, twelve towers and both ancients", () => {
    const { container } = renderWithClient(<LaneMap />);
    expect(container.querySelectorAll("path")).toHaveLength(4);
    expect(container.querySelectorAll("circle")).toHaveLength(12);
    expect(container.querySelectorAll("rect")).toHaveLength(2);
  });
});
