Using just [Jest](https://jestjs.io/) to prove the implementation works,
build an application for planning poker in TypeScript (you can use a CRA base for instance).

```
const game = createPokerGame();
const henk = game.addPlayer("Henk")
const piet = game.addPlayer("Piet")

const round = game.startRound();
round.getCards() # "Drawing cards was not finished"

henk.draw("8");
round.getCards() # "Drawing cards was not finished"

piet.draw("5");
round.getCards() # "Piet: 5, Henk: 8"
```

split the functionality up, write tests, write implementation.

When done, notify me on slack 🙂
