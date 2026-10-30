import { BASE_URL, API_URL, SEARCH_URL } from "@/lib/constants";

export const fetcher = (query: string) =>
  fetch(query).then((res) => res.json());

export const BaseHTTP = (query: string) =>
  fetch(BASE_URL + query).then((res) => res.json());

export const SearchHTTP = (query: string) =>
  fetch(SEARCH_URL + query).then((res) => res.json());

export const PlayerHTTP = async (query: string) => {
  const response = await fetch(API_URL + "/players/" + query);
  if (!response.ok) {
    throw new Error(`Player request failed (${response.status}).`);
  }
  return response.json();
};

export const HTTP = (query: string) =>
  fetch(API_URL + query).then((res) => res.json());
