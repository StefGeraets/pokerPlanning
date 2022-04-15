export const createPokerGame = () => {
  const addPlayer = (name: string) => {
    const draw = (value: string) => {};
    return { draw };
  };

  const startRound = () => {
    const getCards = () => {};
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
