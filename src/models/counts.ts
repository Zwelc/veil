export interface IPatch {
  name: string;
  date: string;
  id: number;
  win: number;
  games: number;
}

export interface IPlayerSide {
  name: string;
  win: number;
  games: number;
}

export interface ICountType {
  name: string;
  win: number;
  games: number;
}
export interface ICounts {
  patch: IPatch[];
  gameMode: ICountType[];
  lobbyType: ICountType[];
}
