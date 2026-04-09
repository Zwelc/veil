export interface IPatch extends IBaseCount {
  date: string;
  id: number;
}

export interface IBaseCount {
  name: string;
  win: number;
  games: number;
}

export interface IPlayerSide extends IBaseCount {}

export interface ICountType extends IBaseCount {}
export interface ICounts {
  patch: IPatch[];
  gameMode: ICountType[];
  lobbyType: ICountType[];
}
