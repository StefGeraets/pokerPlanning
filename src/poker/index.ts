import { PlayerList, PokerGame } from "./index.d";

export const createPokerGame = (): PokerGame => {
  let players: string[] = [];
  let currentRound: PlayerList = {};

  const addPlayer = (name: string) => {
    players = [...players, name];

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
    if (players.length === 0) {
      throw new Error("No players in current game");
    }

    currentRound = {};
    currentRound = players.reduce(
      (obj, name) => ({ ...obj, [name]: null }),
      {}
    );

    const isDrawingComplete = (): boolean => {
      return Object.keys(currentRound).every(
        (key) => currentRound[key] !== null
      );
    };

    const getCards = (timeout?: number) => {
      return new Promise<string>((resolve, reject) => {
        const waitUntillAllCardsDrawn = () => {
          if (timeout)
            setTimeout(() => {
              return reject("Drawing cards was not finished");
            }, timeout);

          if (isDrawingComplete())
            return resolve(
              `${Object.entries(currentRound)
                .map((p) => p.join(": "))
                .join(", ")}`
            );
          setTimeout(waitUntillAllCardsDrawn, 30);
        };

        waitUntillAllCardsDrawn();
      });
    };

    return { getCards };
  };

  return { addPlayer, startRound };
};
