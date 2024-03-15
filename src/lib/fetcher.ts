import { BASE_URL, API_URL, PLAYER_URL, SEARCH_URL } from "@/lib/constants";

export const fetcher = (query: string) =>
  fetch(query).then((res) => res.json());

export const BaseHTTP = (query: string) =>
  fetch(BASE_URL + query).then((res) => res.json());
export const PlayerHTTP = (query: string) =>
  fetch(PLAYER_URL + query).then((res) => res.json());

export const SearchHTTP = (query: string) =>
  fetch(SEARCH_URL + query).then((res) => res.json());

export const HTTP = (query: string) =>
  fetch(API_URL + query).then((res) => res.json());
