import { Fib, PokerGame } from "./index.d";
import { createPokerGame } from "./index";

let game: PokerGame<Fib>;

describe("createPokerGame", () => {
  beforeEach(() => {
    game = createPokerGame<Fib>();
  });

  describe("addPlayer", () => {
    it("should create multiple unique players", () => {
      const henk = game.addPlayer("henk");
      const piet = game.addPlayer("piet");

      expect(henk).not.toEqual(piet);
    });
  });

  describe("draw", () => {
    it("should give an error when no round has started", () => {
      const henk = game.addPlayer("henk");

      expect(() => {
        henk.draw("5");
      }).toThrowError("No round started");
    });

    it("does throws error when player is not in current round", () => {
      const henk = game.addPlayer("henk");
      const round = game.startRound();

      const piet = game.addPlayer("piet");

      expect(() => {
        henk.draw("3");
      }).not.toThrowError();

      expect(() => {
        piet.draw("5");
      }).toThrowError("Player is not in current round");
    });
  });

  describe("startRound", () => {
    it("should throw Error when there are no players in the game", () => {
      expect(() => {
        game.startRound();
      }).toThrowError("No players in current game");
    });

    it("should start a new round with current players in game", async () => {
      const henk = game.addPlayer("henk");
      const round = game.startRound();
      henk.draw("3");

      const resultRound1 = await round.getCards();
      expect(resultRound1).toEqual("henk: 3");

      const piet = game.addPlayer("piet");
      const round2 = game.startRound();

      henk.draw("3");
      piet.draw("5");

      const resultRound2 = await round2.getCards();
      expect(resultRound2).toEqual("henk: 3, piet: 5");
    });
  });

  describe("getCards", () => {
    it("should return all players and their drawn cards", async () => {
      const henk = game.addPlayer("henk");
      const piet = game.addPlayer("piet");
      const round = game.startRound();

      henk.draw("3");

      const result = round.getCards();

      piet.draw("5");

      await expect(result).resolves.toBe("henk: 3, piet: 5");
    });

    it("should resolve multiple promises", async () => {
      const henk = game.addPlayer("henk");
      const piet = game.addPlayer("piet");
      const round = game.startRound();

      henk.draw("3");

      const result1 = round.getCards(); // Client
      const result2 = round.getCards(); // Client

      piet.draw("5");

      await expect(Promise.all([result1, result2])).resolves.toStrictEqual([
        "henk: 3, piet: 5",
        "henk: 3, piet: 5",
      ]);
    });

    it("Should reject after set time has passed when not all cards are drawn", async () => {
      jest.useFakeTimers();
      const newGame = createPokerGame(60);

      const henk = newGame.addPlayer("henk");
      const piet = newGame.addPlayer("piet");
      const round = newGame.startRound();

      henk.draw("13");

      const result = round.getCards();

      jest.runAllTimers();

      await expect(result).rejects.toBe(
        "Not everyone has drawn a card. Current drawn cards: henk: 13, piet: "
      );
    });

    it("After 1h test that the promise is still not resolved. Check then pending state", () => {
      jest.useFakeTimers();
      let isPending = true;

      const henk = game.addPlayer("henk");
      const piet = game.addPlayer("piet");
      const round = game.startRound();

      henk.draw("13");

      const result = round.getCards();
      result.then(() => (isPending = false));

      jest.advanceTimersByTime(60 * 60 * 1000); // 1 hour

      expect(isPending).toBe(true);
    });
  });
});
