import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

// jsdom has no IntersectionObserver; report every observed element as in view,
// so framer-motion's whileInView reveals run in tests.
class InViewObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [{ target, isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver ??= InViewObserver as unknown as typeof IntersectionObserver;

// next/image validates remote hosts against next.config at runtime; render a plain <img> in tests.
const NEXT_IMAGE_ONLY_PROPS = new Set(["fill", "sizes", "loading", "priority", "unoptimized"]);
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) =>
    createElement(
      "img",
      Object.fromEntries(
        Object.entries(props).filter(([key]) => !NEXT_IMAGE_ONLY_PROPS.has(key)),
      ),
    ),
}));

// next/font/google is compiled by Next at build time; in tests every font is a stub.
vi.mock("next/font/google", () => {
  const font = () => ({ className: "font-stub", variable: "font-stub", style: {} });
  // Explicit exports: a catch-all Proxy also answers `then`, which makes the module
  // look like a promise and hangs the import.
  return { Inter: font, Big_Shoulders: font };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
}));
