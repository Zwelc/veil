export const BASEURL = "https://api.opendota.com/api";
export const PLAYERURL = BASEURL + "/players";
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}` + "/api/players/";
export const CONSTANTURL = BASEURL + "/constants";
export const SEARCHURL = BASEURL + "/search?q=";

export const fetcher = (query: string) =>
  fetch(query).then((res) => res.json());

export const BaseHTTP = (query: string) =>
  fetch(BASEURL + query).then((res) => res.json());
export const PlayerHTTP = (query: string) =>
  fetch(PLAYERURL + query).then((res) => res.json());

export const ConstantHTTP = (query: string) =>
  fetch(CONSTANTURL + query).then((res) => res.json());

export const SearchHTTP = (query: string) =>
  fetch(SEARCHURL + query).then((res) => res.json());

export const HTTP = (query: string) =>
  fetch(API_URL + query).then((res) => res.json());
