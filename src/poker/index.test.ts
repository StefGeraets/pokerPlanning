import { PokerGame } from "./index.d";
import { createPokerGame } from "./index";

let game: PokerGame;

describe("createPokerGame", () => {
  beforeEach(() => {
    game = createPokerGame();
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
    it("should return a message when not all players have drawn a card", async () => {
      const henk = game.addPlayer("henk");
      const piet = game.addPlayer("piet");
      const round = game.startRound();

      henk.draw("5");

      await expect(round.getCards(2000)).rejects.toEqual(
        "Drawing cards was not finished"
      );
    });

    it("should return all players and their drawn cards", async () => {
      const henk = game.addPlayer("henk");
      const piet = game.addPlayer("piet");
      const round = game.startRound();

      henk.draw("3");
      piet.draw("5");

      const result = await round.getCards();
      expect(result).toEqual("henk: 3, piet: 5");
    });
  });
});
