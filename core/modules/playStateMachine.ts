// constants
import { players } from "core/constants";
// types
import { CardType } from "core/types";

// npc: none player character
export const npcSelectCard = (
  cards: CardType[],
  currentSuit: number,
  hokm: number
): CardType => {
  let hokmCardIndex = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].suit === currentSuit) {
      return cards[i];
    }
    if (cards[i].suit === hokm) {
      hokmCardIndex = i;
    }
  }
  return cards[hokmCardIndex];
};

export const allowedAction = (
  cards: CardType[],
  card: CardType,
  currentSuit: number,
  hokm: number
): boolean => {
  if (card.suit === currentSuit) return true;
  // check if user has a card with current suit
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].suit === currentSuit) {
      return false;
    }
  }
  return true;
};

const getCardValue = (
  currnetCard: CardType,
  currentSuit: number,
  hokm: number
): number => {
  let amplifier = 1;
  if (currnetCard.suit === hokm) {
    amplifier = 1000;
  } else if (currnetCard.suit === currentSuit) {
    amplifier = 50;
  }
  return currnetCard.rank * amplifier;
};

// caution!!: always give currentCards ordered by playeys index enum
// return the winner player's index
export const currentRoundWinner = (
  currnetCards: CardType[],
  currentSuit: number,
  hokm: number
): number => {
  let winnerIndex = players.PLAYER_1;
  let maxValuableCard = getCardValue(currnetCards[0], currentSuit, hokm);
  currnetCards.map((card, index) => {
    const cardValue = getCardValue(card, currentSuit, hokm);
    if (cardValue > maxValuableCard) {
      maxValuableCard = cardValue;
      winnerIndex = index;
    }
  });
  return winnerIndex;
};
