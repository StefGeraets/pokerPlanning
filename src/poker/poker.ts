import { createPokerGame } from ".";

const game = createPokerGame();
const henk = game.addPlayer("Henk");
const piet = game.addPlayer("Piet");

const round = game.startRound();
round.getCards(); // Drawing cards was not finished
console.log(round.getCards()); // For file output

henk.draw("8");
round.getCards(); // Drawing cards was not finished
console.log(round.getCards()); // For file output

piet.draw("5");
round.getCards(); // Piet: 5, Henk: 8
console.log(round.getCards()); // For file output
