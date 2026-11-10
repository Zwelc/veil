/** Steam64 IDs are the 32-bit account ID plus this offset. */
const STEAM64_OFFSET = BigInt("76561197960265728");
const MAX_ACCOUNT_ID = BigInt(0xffffffff);

/** Stats sites whose player URLs end in /players/<account id>. */
const PLAYER_SITES = /(?:^|\.)(?:opendota\.com|dotabuff\.com|stratz\.com)$/i;

function toAccountId(digits: string, steam64 = false): string | null {
  if (!/^\d{1,20}$/.test(digits)) return null;
  let id = BigInt(digits);
  if (steam64 || id > MAX_ACCOUNT_ID) id -= STEAM64_OFFSET;
  return id > BigInt(0) && id <= MAX_ACCOUNT_ID ? id.toString() : null;
}

function parseUrl(input: string): URL | null {
  try {
    return new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    return null;
  }
}

/**
 * Turns a pasted account ID, Steam64 ID or profile link into an account ID,
 * so search can go straight to the player without a name lookup.
 * Steam vanity URLs (/id/<name>) need the Steam API, so they return null.
 */
export function parsePlayerId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^\d+$/.test(value)) return toAccountId(value);
  if (!value.includes("/") || !value.includes(".")) return null;

  const url = parseUrl(value);
  if (!url) return null;
  const [section, id] = url.pathname.split("/").filter(Boolean);
  const host = url.hostname.replace(/^www\./i, "");

  if (PLAYER_SITES.test(host) && section === "players" && id) {
    return toAccountId(id);
  }
  if (/^steamcommunity\.com$/i.test(host) && section === "profiles" && id) {
    return toAccountId(id, true);
  }
  return null;
}
