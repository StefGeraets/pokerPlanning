export interface PokerGame {
  addPlayer: PlayerInstance;
  startRound: RoomInstance;
}

export interface PlayerInstance {
  draw: void;
}

export interface RoomInstance {
  getCards: void;
}
