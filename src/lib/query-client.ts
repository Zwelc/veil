import { QueryClient } from "@tanstack/react-query";

/**
 * One QueryClient per browser session (created in <Providers>) or per server request.
 * Defaults favour few requests: player stats change slowly and the API is cached upstream.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
