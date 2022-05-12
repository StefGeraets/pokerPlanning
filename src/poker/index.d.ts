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

export type Fib = "0" | "1";

export type CreatePokerGame<Deck> = () => PokerGame<Deck>;

export type Resolve = (val: string) => void;
export interface PokerGame {
  addPlayer: (name: string) => PlayerInstance;
  startRound: () => RoomInstance;
}

export interface PlayerInstance<Deck> {
  draw: (card: Deck) => void;
}

export interface RoomInstance {
  getCards: () => Promise<string>;
}

export interface PlayerList {
  [key: string]: string | null;
}
