import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook } from "@testing-library/react";
import { domAnimation, LazyMotion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";

export function makeTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
}

/** Mirrors Providers: m.* components only animate (and run exits) inside LazyMotion. */
function wrapperFor(client: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </QueryClientProvider>
    );
  };
}

export function renderWithClient(ui: ReactElement, client = makeTestQueryClient()) {
  return { client, ...render(ui, { wrapper: wrapperFor(client) }) };
}

export function renderHookWithClient<T>(hook: () => T, client = makeTestQueryClient()) {
  return { client, ...renderHook(hook, { wrapper: wrapperFor(client) }) };
}
