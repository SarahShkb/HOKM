export type CardType = {
  suit: number;
  rank: number;
  back?: boolean;
  owner?: number;
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

export type PlayerCardsStateType = {
  cards: CardType[];
  hovered: boolean[];
};

export type ChooseHokmType = {
  HOKM: number;
  setHOKM: (h: number) => void;
  hakem: number;
  setGameState: (gameState: number) => void;
  setRemainingCards: (cards: CardType[]) => void;
  playerCardsState: PlayerCardsStateType[];
  setPlayersCardsState: (pcs: PlayerCardsStateType[]) => void;
};

export type PlayHokmType = {
  HOKM: number;
  hakem: number;
  gameState: number;
  setGameState: (gameState: number) => void;
  remainingCards: CardType[];
  playerCardsState: PlayerCardsStateType[];
  setPlayersCardsState: (pcs: PlayerCardsStateType[]) => void;
  hand: number;
  setHand: (h: number) => void;
};
