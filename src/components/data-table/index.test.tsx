import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";
import { DataTable } from "./index";

type Row = { name: string; games: number };
const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "games", header: "Games" },
];
const rows: Row[] = Array.from({ length: 25 }, (_, i) => ({
  name: i % 2 ? `Axe ${i}` : `Pudge ${i}`,
  games: i,
}));

describe("DataTable", () => {
  it("paginates rows", () => {
    render(<DataTable columns={columns} data={rows} pageSize={10} />);
    expect(screen.getByText("Showing 1–10 of 25 results")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });

  it("moves between pages", async () => {
    render(<DataTable columns={columns} data={rows} pageSize={10} />);
    await userEvent.click(screen.getByRole("button", { name: "Go to next page" }));
    expect(screen.getByText("Showing 11–20 of 25 results")).toBeInTheDocument();
  });

  it("filters by the name column", async () => {
    render(
      <DataTable columns={columns} data={rows} filterPlaceholder="Search heroes" />,
    );
    await userEvent.type(screen.getByLabelText("Search heroes"), "Axe");
    expect(screen.getByText("Showing 1–10 of 12 results")).toBeInTheDocument();
    expect(screen.queryByText("Pudge 0")).not.toBeInTheDocument();
  });

  it("shows an empty message when nothing matches", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("shows skeleton rows, not 'No results', while loading", () => {
    render(<DataTable columns={columns} data={[]} loading />);
    expect(screen.queryByText("No results.")).not.toBeInTheDocument();
  });
});
