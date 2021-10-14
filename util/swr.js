import useSWR from 'swr';

const baseUrl = 'https://api.opendota.com/api';
const fetcher = query => fetch(baseUrl + query).then(res => res.json());

export function useRecentMatches(id) {
	const { data, error } = useSWR(`/players/${id}/recentMatches`, fetcher)

  return {
    matches: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useHeroes() {
	const { data, error } = useSWR(`/constants/heroes`, fetcher,{
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})

  return {
    heroes: data,
    findingHeroes: !error && !data,
    isError: error
  }
}

export function usePlayerHeroes(id) {
	
	const { data, error } = useSWR(`/players/${id}/heroes`, fetcher,{
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})

  return {
    heroes: data,
    isLoading: !error && !data,
    isError: error
  }
}
export function useGameModes() {
	const { data, error } = useSWR(`/constants/game_mode`, fetcher,{
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})

  return {
    modes: data,
    isLoading: !error && !data,
    isError: error
  }
}