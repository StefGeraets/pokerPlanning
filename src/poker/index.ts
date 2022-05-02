import { PlayerList, PokerGame } from "./index.d";

export const createPokerGame = (): PokerGame => {
  let players: string[] = [];
  let currentRound: PlayerList = {};

  const addPlayer = (name: string) => {
    players = [...players, name];

    const draw = (card: string) => {
      if (Object.keys(currentRound).length === 0) {
        throw new Error("No round started");
      }

      if (!(name in currentRound)) {
        throw new Error("Player is not in current round");
      }

      currentRound[name] = card;
    };

    return { draw };
  };

  const startRound = () => {
    if (players.length === 0) {
      throw new Error("No players in current game");
    }

    currentRound = {};
    currentRound = players.reduce(
      (obj, name) => ({ ...obj, [name]: null }),
      {}
    );

    const getCards = () => {
      let done: boolean = true;

      for (let player in currentRound) {
        if (currentRound[player] === null) {
          done = false;
        }
      }

      if (done) {
        return `${Object.entries(currentRound)
          .map((p) => p.join(": "))
          .join(", ")}`;
      } else {
        return "Drawing cards is not done";
      }
    };

    return { getCards };
  };

  return { addPlayer, startRound };
};

// run from command line.
// [ ] split functionality from execution
// [x] refactor any optimasations I can pick up.
