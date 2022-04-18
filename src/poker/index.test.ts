import { PokerGame } from "./index.d";
import { createPokerGame } from "./index";

let game: PokerGame;

describe("createPokerGame", () => {
  beforeEach(() => {
    game = createPokerGame();
  });

  it("should return object with addPlayer and startRound function", () => {
    // then
    expect(game).toEqual({
      addPlayer: expect.any(Function),
      startRound: expect.any(Function),
    });
  });

  describe("addPlayer", () => {
    it("should create a player isntance", () => {
      // given
      const playerName = "henk";

      // when
      const henk = game.addPlayer(playerName);

      // then
      expect(henk).toEqual({
        draw: expect.any(Function),
        gameState: { [playerName]: null },
      });
    });

    it("should create multiple unique player instances", () => {
      // given
      const player1 = "henk";
      const player2 = "piet";

      // when
      const henk = game.addPlayer(player1);
      const piet = game.addPlayer(player2);

      // then
      expect(henk).toEqual({
        draw: expect.any(Function),
        gameState: { [player1]: null },
      });
      expect(piet).toEqual({
        draw: expect.any(Function),
        gameState: { [player1]: null, [player2]: null },
      });
    });

    describe("draw", () => {
      it("should draw a card for a player", () => {
        // given
        const henk = game.addPlayer("henk");
        const piet = game.addPlayer("piet");

        // then
        expect(piet).toEqual({
          draw: expect.any(Function),
          gameState: { henk: null, piet: null },
        });

        // when
        henk.draw("5");

        // then
        expect(piet).toEqual({
          draw: expect.any(Function),
          gameState: { henk: "5", piet: null },
        });
      });
    });
  });
});
