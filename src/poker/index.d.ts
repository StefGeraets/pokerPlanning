export interface PokerGame {
  addPlayer: (name: string) => PlayerInstance;
  startRound: () => RoomInstance;
}

export interface PlayerInstance {
  draw: (card: string) => void;
  gameState: GameState;
}

export interface RoomInstance {
  getCards: () => void | undefined;
}

export interface GameState {
  [key: string]: string | null;
}
