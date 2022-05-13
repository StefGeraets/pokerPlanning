export type Fib =
  | "0"
  | "1"
  | "2"
  | "3"
  | "5"
  | "8"
  | "13"
  | "21"
  | "34"
  | "55"
  | "89"
  | "☕️"
  | "?";
export type ModFib =
  | "0"
  | "1/2"
  | "1"
  | "2"
  | "3"
  | "5"
  | "8"
  | "13"
  | "20"
  | "40"
  | "100"
  | "☕️"
  | "?";
export type Tshirt =
  | "xxs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "xxl"
  | "☕️"
  | "?";

export type Decks = Fib | ModFib | Tshirt;
export type Resolve = (val: string) => void;
export interface PokerGame<Deck> {
  addPlayer: (name: string) => PlayerInstance<Deck>;
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
