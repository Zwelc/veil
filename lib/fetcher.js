export const BASEURL = "https://api.opendota.com/api";
export const PLAYERURL = BASEURL + "/players";
export const CONSTANTURL = BASEURL + "/constants";
const ENDPOINTS = [];

export const PlayerHTTP = (query) =>
  fetch(PLAYERURL + query).then((res) => res.json());

export const ConstantHTTP = (query) =>
  fetch(CONSTANTURL + query).then((res) => res.json());
