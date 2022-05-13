import {
  CreatePokerGame,
  Fib,
  PlayerList,
  PokerGame,
  Resolve,
  Tshirt,
} from "./index.d";

export const createPokerGame: CreatePokerGame<
  Tshirt
> = (): PokerGame<Tshirt> => {
  let players: string[] = [];
  let currentRound: PlayerList = {};
  let outsideResolve: Resolve[] = [];

  const printRoundResult = (): string =>
    `${Object.entries(currentRound)
      .map((p) => p.join(": "))
      .join(", ")}`;

  const checkDone = (): void => {
    if (isDrawingComplete()) {
      outsideResolve.forEach((func) => {
        func(printRoundResult());
      });
      outsideResolve = [];
    }
  };

  const isDrawingComplete = (): boolean => {
    return Object.keys(currentRound).every((key) => currentRound[key] !== null);
  };

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
      checkDone();
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

    const getCards = (): Promise<string> => {
      if (isDrawingComplete()) {
        return Promise.resolve(printRoundResult());
      }

      return new Promise<string>((resolve) => {
        outsideResolve.push(resolve);
      });
    };

    return { getCards };
  };

  return { addPlayer, startRound };
};
