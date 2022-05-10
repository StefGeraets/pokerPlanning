import {
  CreatePokerGame,
  Fib,
  PlayerList,
  PokerGame,
  VotingSystem,
} from "./index.d";

export const votingSystem: VotingSystem = {
  fib: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "☕️", "?"],
  modFib: [
    "0",
    "1/2",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "20",
    "40",
    "100",
    "☕️",
    "?",
  ],
  shirt: ["xxs", "xs", "s", "m", "l", "xl", "xxl", "☕️", "?"],
};

export const createPokerGame: CreatePokerGame<Deck> = (): PokerGame => {
  let players: string[] = [];
  let currentRound: PlayerList = {};

  let outsideResolve: (val: any) => void, outsideReject: (val: any) => void;

  const checkDone = (): void => {
    if (isDrawingComplete()) {
      outsideResolve(
        `${Object.entries(currentRound)
          .map((p) => p.join(": "))
          .join(", ")}`
      );
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
      return new Promise<string>((resolve, reject) => {
        outsideResolve = resolve;
        outsideReject = reject;
      });
    };

    return { getCards };
  };

  return { addPlayer, startRound };
};
