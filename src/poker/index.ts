import { GameState, PlayerInstance, PokerGame } from "./index.d";

export const createPokerGame = (): PokerGame => {
  let gameState: GameState = {};
  const addPlayer = (name: string) => {
    gameState = { ...gameState, [name]: null };

    return {
      draw(card: string): void {
        gameState[name] = card;
      },
      gameState,
    };
  };

  const startRound = () => {
    return {
      getCards() {},
    };
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
