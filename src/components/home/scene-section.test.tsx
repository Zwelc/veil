import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { IProScene } from "@/models/scene";
import { renderWithClient } from "../../../test/utils";
import FeatureStrip from "./feature-strip";
import SceneSection from "./scene-section";

const scene: IProScene = {
  activeWeek: 2674,
  activeMonth: 3480,
  countriesMonth: 168,
  listed: 5765,
  topCountries: [
    { code: "RU", count: 1093 },
    { code: "UA", count: 260 },
    { code: "PE", count: 153 },
  ],
  updatedAt: "2026-11-10T15:58:27.000Z",
};

describe("SceneSection", () => {
  it("names countries, shows counts and says the data is self-reported", () => {
    renderWithClient(<SceneSection scene={scene} />);
    expect(
      screen.getByRole("heading", { name: "Where this month's pros play from" }),
    ).toBeInTheDocument();
    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(3);
    expect(within(rows[0]).getByText("Russia")).toBeInTheDocument();
    expect(within(rows[0]).getByText("1,093")).toBeInTheDocument();
    expect(screen.getByText(/3,480 players/)).toHaveTextContent("168 countries");
    expect(screen.getByText(/set on Steam/)).toBeInTheDocument();
  });

  it("sizes bars relative to the top country", () => {
    const { container } = renderWithClient(<SceneSection scene={scene} />);
    const bars = [...container.querySelectorAll<HTMLElement>(".bg-primary")];
    expect(bars.map((bar) => bar.style.width)).toEqual(["100%", "24%", "14%"]);
  });

  it("renders nothing without country data", () => {
    const { container } = renderWithClient(
      <SceneSection scene={{ ...scene, topCountries: [] }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("FeatureStrip", () => {
  it("numbers the five profile tabs in tab order", () => {
    renderWithClient(<FeatureStrip />);
    const rows = screen.getAllByRole("listitem");
    expect(rows.map((row) => row.textContent?.slice(0, 2))).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
    ]);
    expect(within(rows[0]).getByRole("heading", { name: "Overview" })).toBeInTheDocument();
  });
});
