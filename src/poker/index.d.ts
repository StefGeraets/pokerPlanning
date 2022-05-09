export type VotingSystem = {
  fib: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "☕️", "?"];
  modFib: [
    "0",
    "1/2",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "20",
    "40",
    "100",
    "☕️",
    "?"
  ];
  shirt: ["xxs", "xs", "s", "m", "l", "xl", "xxl", "☕️", "?"];
};

export type CreatePokerGame = <K extends keyof VotingSystem>(
  system: K
) => PokerGame;

export interface PokerGame {
  addPlayer: (name: string) => PlayerInstance<T>;
  startRound: () => RoomInstance;
}

export interface PlayerInstance {
  draw: (card: string) => void;
}

export interface RoomInstance {
  getCards: (timeout?: number) => Promise<string>;
}

export interface PlayerList {
  [key: string]: string | null;
}
