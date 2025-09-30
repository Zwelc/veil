"use client";

import SearchResults from "@/components/search-results";

export default function Home() {
  return (
    <div className="w-full h-full px-6 py-4 container mx-auto space-y-4">
      <SearchResults />
    </div>
  );
}
