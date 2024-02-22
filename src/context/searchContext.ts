import { createContext } from "react";

export const SearchContext = createContext(
  {} as { search: string; setSearch: (val: string) => void }
);
