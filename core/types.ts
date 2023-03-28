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
  setGameState: (gameState: number) => void;
};

export type ChooseHokmType = {
  setHOKM: (h: number) => void;
  hakem: number;
  player1Ref: React.MutableRefObject<null>;
  pileOfCards: React.MutableRefObject<null>;
  cardsRef: React.MutableRefObject<never[]>;
  player2Ref: React.MutableRefObject<null>;
  setGameState: (gameState: number) => void;
};
