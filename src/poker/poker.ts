import { createPokerGame } from ".";
import { Fib, ModFib, Tshirt } from "./index.d";

const game = createPokerGame<Fib>();
const henk = game.addPlayer("Henk");
const piet = game.addPlayer("Piet");

const round = game.startRound();
round
  .getCards()
  .then((val: string) => console.log(val))
  .catch((err: string) => console.log(err));

henk.draw("3");
piet.draw("8");

// [x] Maak van getCards() een promise, die resolved als alle kaarten bekend zijn
// [x] definieer op create poker game met typescript generics de type van de kaart (number, of “1” | “3" | “:coffee:️“) en zorg dat dit type dan dus ook op de ‘draw’ functie gebruikt wordt
