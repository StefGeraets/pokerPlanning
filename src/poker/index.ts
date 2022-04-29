import { PlayerList, PokerGame } from "./index.d";

export const createPokerGame = (): PokerGame => {
  let players: PlayerList = {};
  let currentRound: PlayerList = {};

  const addPlayer = (name: string) => {
    players = { ...players, [name]: null };

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
    if (Object.keys(players).length === 0) {
      throw new Error("No players in current game");
    }

    currentRound = {};
    currentRound = { ...players };

    const getCards = () => {
      let done: Boolean = true;

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

const game = createPokerGame();
const henk = game.addPlayer("Henk");
const piet = game.addPlayer("Piet");

const round = game.startRound();
round.getCards(); // "Drawing cards was not finished"

henk.draw("8");
round.getCards(); // "Drawing cards was not finished"

piet.draw("5");
round.getCards(); // "Piet: 5, Henk: 8"
