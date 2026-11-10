import { render, screen } from "@testing-library/react";
import { m, motion } from "framer-motion";
import { beforeEach, describe, expect, it, vi } from "vitest";

const motionConfigProps = vi.hoisted(() => ({ current: {} as Record<string, unknown> }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    MotionConfig: (props: Record<string, unknown> & { children: React.ReactNode }) => {
      motionConfigProps.current = props;
      return <actual.MotionConfig {...props} />;
    },
  };
});

const { Providers } = await import("./providers");

describe("Providers", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    );
  });

  it("renders children and honours the OS reduced-motion setting", () => {
    render(
      <Providers>
        <p>child</p>
      </Providers>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
    expect(motionConfigProps.current.reducedMotion).toBe("user");
  });

  it("loads motion features lazily, so m.* components render", () => {
    render(
      <Providers>
        <m.div>animated</m.div>
      </Providers>,
    );
    expect(screen.getByText("animated")).toBeInTheDocument();
  });

  it("rejects full motion.* components (strict LazyMotion)", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Providers>
          <motion.div>heavy</motion.div>
        </Providers>,
      ),
    ).toThrow();
  });
});
