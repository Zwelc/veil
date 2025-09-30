/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoIosSearch } from "react-icons/io";
import { useSearch } from "@/hooks/useSearch";

export default function Search() {
  const router = useRouter();
  const { search, setSearch } = useSearch();
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
    <form className="flex items-center" onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={search}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Search players"
          type="search"
        />
        <Button type="submit" size="sm" variant="outline">
          <IoIosSearch className="h-[1.2rem] w-[1.2rem] " />
        </Button>
      </div>
    </form>
  );
}
