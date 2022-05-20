import { cardType } from "core/types";

export const suits = {
  SPADES: 1,
  CLUBS: 2,
  HEARTS: 3,
  DIAMONDS: 4,
};

export const ranks = {
  N2: 2,
  N3: 3,
  N4: 4,
  N5: 5,
  N6: 6,
  N7: 7,
  N8: 8,
  N9: 9,
  N10: 10,
  J: 11,
  Q: 12,
  K: 13,
  ACE: 14,
};

export const cards: cardType[] = Object(suits).keys.map(
  (suit: number) =>
    Object(ranks).map((rank: number) => ({
      suit,
      rank,
    }))
);
