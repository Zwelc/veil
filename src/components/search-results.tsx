import PlayerGrid from "./players/grid";
import { RESULT_LIMIT } from "@/constants";
import useSearchResults from "@/hooks/useSearchResults";

const SearchHeader = () => {
  const { search, isLoading } = useSearchResults();
  return (
    <h1 className="w-full py-1.5  text-left text-xl">
      {isLoading
        ? "Searching..."
        : `Displaying the first ${RESULT_LIMIT} ${
            search === "" ? "pro" : ""
          } players`}
    </h1>
  );
};
const SearchResults = () => {
  const { data, isLoading } = useSearchResults();

  return (
    <>
      <SearchHeader />
      <PlayerGrid limit={RESULT_LIMIT} loading={isLoading} data={data || []} />
    </>
  );
};

export default SearchResults;
