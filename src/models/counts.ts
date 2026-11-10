export interface IPatch extends IBaseCount {
  date: string;
  id: number;
}

export interface IBaseCount {
  name: string;
  win: number;
  games: number;
}


export type ICountType = IBaseCount;
export interface ICounts {
  patch: IPatch[];
  gameMode: ICountType[];
  lobbyType: ICountType[];
}
