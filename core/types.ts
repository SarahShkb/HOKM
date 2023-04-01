export type CardType = {
  suit: number;
  rank: number;
  back?: boolean;
};

export type ChooseHakemType = {
  chooseHAKEM: boolean;
  setChooseHAKEM: (h: boolean) => void;
  hakem: number;
  setHakem: (h: number) => void;
  player1Ref: React.MutableRefObject<null>;
  pileOfCards: React.MutableRefObject<null>;
  cardsRef: React.MutableRefObject<never[]>;
  player2Ref: React.MutableRefObject<null>;
  player3Ref: React.MutableRefObject<null>;
  player4Ref: React.MutableRefObject<null>;
  setGameState: (gameState: number) => void;
};

export type ChooseHokmType = {
  HOKM: number;
  setHOKM: (h: number) => void;
  hakem: number;
  setGameState: (gameState: number) => void;
};
