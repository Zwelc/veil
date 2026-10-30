"use client";

import SearchResults from "@/components/search-results";

export default function Home() {
  return (
    <div className="container mx-auto w-full flex-1 space-y-4 px-4 py-5 sm:px-6 sm:py-8">
      <SearchResults />
    </div>
  );
}
