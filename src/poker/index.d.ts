export interface PokerGame {
  addPlayer: (name: string) => PlayerInstance;
  startRound: () => RoomInstance;
}

export interface PlayerInstance {
  draw: (card: string) => void;
}

export interface RoomInstance {
  getCards: () => Promise<string>;
}

export interface PlayerList {
  [key: string]: string | null;
}
