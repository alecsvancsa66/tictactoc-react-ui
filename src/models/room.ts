export interface ISquare {
  value: "x" | "o" | "";
}

export type TBoard = ISquare[];

export interface IStartGame {
  start: boolean;
  symbol: "x" | "o";
}

export interface IRoomState {
  playerSymbol: "x" | "o" | undefined;
  isMyTurn: boolean;
  isGameStarted: boolean;
}
