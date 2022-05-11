import { createPokerGame } from ".";

const game = createPokerGame();
const henk = game.addPlayer("Henk");
const piet = game.addPlayer("Piet");

const round = game.startRound();
round
  .getCards(2000)
  .then((val) => console.log(val))
  .catch((err) => console.log(err));

henk.draw("8");
piet.draw("5");

// [x] Maak van getCards() een promise, die resolved als alle kaarten bekend zijn
// [ ] definieer op create poker game met typescript generics de type van de kaart (number, of “1” | “3" | “:coffee:️“) en zorg dat dit type dan dus ook op de ‘draw’ functie gebruikt wordt
// Geef aan createPokerGame() een argument mee welke de draw functie middels generic type typed.
