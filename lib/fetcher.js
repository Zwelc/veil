export const BASEURL = "https://api.opendota.com/api";
export const PLAYERURL = BASEURL + "/players";
export const CONSTANTURL = BASEURL + "/constants";
export const SEARCHURL = BASEURL + "/search?q=";
export const fetcher = (query) => fetch(query).then((res) => res.json());
const ENDPOINTS = [];

export const PlayerHTTP = (query) =>
  fetch(PLAYERURL + query).then((res) => res.json());

export const ConstantHTTP = (query) =>
  fetch(CONSTANTURL + query).then((res) => res.json());

export const SearchHTTP = (query) =>
  fetch(SEARCHURL + query).then((res) => res.json());
