import { CreatePokerGame, PlayerList, PokerGame, Resolve } from "./index.d";

export const createPokerGame: CreatePokerGame = <T>(
  roundLength?: number
): PokerGame<T> => {
  const toMinutes: number = 60 * 1000;
  const waitMinutes: number = roundLength
    ? roundLength * toMinutes
    : 10 * toMinutes;
  let players: string[] = [];
  let currentRound: PlayerList<T> = {};
  let outsideResolve: Resolve[] = [];
  let outsideReject: Resolve;

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

    const draw = (card: T) => {
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

    // startTimer(setTime in CreateGame);
    setTimeout(() => {
      outsideReject(
        `Not everyone has drawn a card. Current drawn cards: ${printRoundResult()}`
      );
    }, waitMinutes);

    const getCards = (): Promise<string> => {
      if (isDrawingComplete()) {
        return Promise.resolve(printRoundResult());
      }

      return new Promise<string>((resolve, reject) => {
        outsideResolve.push(resolve);
        outsideReject = reject;
      });
    };

    return { getCards };
  };

  return { addPlayer, startRound };
};
