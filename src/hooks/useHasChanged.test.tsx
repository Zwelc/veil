import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useHasChanged } from "./useHasChanged";

describe("useHasChanged", () => {
  it("is false until the value changes, then stays true", () => {
    const { result, rerender } = renderHook(({ value }) => useHasChanged(value), {
      initialProps: { value: "showcase" },
    });
    expect(result.current).toBe(false);

    rerender({ value: "showcase" });
    expect(result.current).toBe(false);

    rerender({ value: "results" });
    expect(result.current).toBe(true);

    // Returning to the first value still counts as changed (the view re-enters).
    rerender({ value: "showcase" });
    expect(result.current).toBe(true);
  });
});
