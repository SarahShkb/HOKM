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
