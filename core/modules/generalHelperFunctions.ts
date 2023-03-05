import { CardType } from "core/types";
import { ranks, suits } from "core/constants";

export const getCards = (): CardType[] => {
  const cards: CardType[] = [];
  Object.values(suits).map((suit) => {
    Object.values(ranks).map((rank) => {
      cards.push({ suit, rank });
    });
  });
  return cards;
};

export const getSpecialCardRanksString = (rank: number): string => {
  if (rank < ranks.J) {
    return String(rank);
  }
  switch (rank) {
    case ranks.J:
      return "J";
    case ranks.Q:
      return "Q";
    case ranks.K:
      return "K";
    case ranks.ACE:
      return "A";
    default:
      return "";
  }
};
