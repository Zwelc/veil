"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context/searchContext";

export default function Search() {
  const router = useRouter();
  const { search, setSearch } = useContext(SearchContext);
  const handleChange = (e: any) => {
    const { value } = e.target;

    setSearch(value);
  };
  const handleKeyUp = (e: any) => {
    if (e.code === "Enter") {
      setSearch(search);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/`);
  };

  return (
    <>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            value={search}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            placeholder="Search players"
            type="text"
            className="bg-static border border-static text-text text-sm rounded-lg focus:ring-primary-500 focus:border-secondary-500 focus:outline-none block w-full pl-10 p-2.5  "
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium  bg-secondary-300 rounded-lg border border-secondary-700 hover:bg-secondary-800 focus:ring-4 focus:outline-none focus:ring-secondary-300 "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </>
  );
}
