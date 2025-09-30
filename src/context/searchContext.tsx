import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ISearchContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export const SearchContext = createContext<ISearchContext | null>(null);

type ProviderProps = {
  children: ReactNode;
};
export const SearchProvider = ({ children }: ProviderProps) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
