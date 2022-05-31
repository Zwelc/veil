import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import router from "next/router";
import { SearchContext } from "../context/searchContext";

export default function Search() {
  const { search, setSearch } = useContext(SearchContext);
  const handleChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };
  const handleKeyUp = (e) => {
    if (e.code === "Enter") {
      router.push(`/players?q=${search}`);
    }
  };
  const handleSubmit = (e) => {
    router.push(`/players?q=${search}`);
  };

  return (
    <>
      <InputBase
        id="search"
        sx={{ ml: 1 }}
        placeholder="Search players"
        inputProps={{ "aria-label": "search players" }}
        value={search}
        autoComplete="off"
        onKeyUp={handleKeyUp}
        onChange={handleChange}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </>
  );
}
