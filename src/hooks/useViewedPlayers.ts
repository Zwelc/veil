import { useCallback, useSyncExternalStore } from "react";

export const VIEWED_PLAYERS_KEY = "veil:viewed-players";
export const VIEWED_PLAYERS_LIMIT = 6;

export interface IViewedPlayer {
  account_id: number;
  personaname: string;
  avatarfull: string | null;
}

const EMPTY: IViewedPlayer[] = [];
const listeners = new Set<() => void>();
let cache: { raw: string | null; players: IViewedPlayer[] } = {
  raw: null,
  players: EMPTY,
};

function isViewedPlayer(value: unknown): value is IViewedPlayer {
  const p = value as IViewedPlayer;
  return (
    typeof p?.account_id === "number" &&
    typeof p.personaname === "string" &&
    (p.avatarfull === null || typeof p.avatarfull === "string")
  );
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(VIEWED_PLAYERS_KEY);
  } catch {
    return null; // storage blocked (privacy mode)
  }
}

/** Parsed list, cached by the raw string so useSyncExternalStore sees a stable reference. */
function getSnapshot(): IViewedPlayer[] {
  const raw = readRaw();
  if (raw === cache.raw) return cache.players;
  let players = EMPTY;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      players = parsed.filter(isViewedPlayer).slice(0, VIEWED_PLAYERS_LIMIT);
    }
  } catch {
    // corrupt entry: treat as empty
  }
  cache = { raw, players };
  return players;
}

const getServerSnapshot = () => EMPTY;

function write(players: IViewedPlayer[]) {
  try {
    if (players.length) {
      window.localStorage.setItem(VIEWED_PLAYERS_KEY, JSON.stringify(players));
    } else {
      window.localStorage.removeItem(VIEWED_PLAYERS_KEY);
    }
  } catch {
    return;
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === VIEWED_PLAYERS_KEY) notify();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Players this browser opened recently, newest first. Stored in localStorage only:
 * no server state and no requests. Empty during SSR, so the static page hydrates cleanly.
 */
export function useViewedPlayers() {
  const players = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const record = useCallback((player: IViewedPlayer) => {
    const current = getSnapshot();
    const head = current[0];
    if (
      head?.account_id === player.account_id &&
      head.personaname === player.personaname &&
      head.avatarfull === player.avatarfull
    ) {
      return; // already the latest entry: skip the write
    }
    write(
      [
        player,
        ...current.filter((p) => p.account_id !== player.account_id),
      ].slice(0, VIEWED_PLAYERS_LIMIT),
    );
  }, []);

  const clear = useCallback(() => write([]), []);

  return { players, record, clear };
}
