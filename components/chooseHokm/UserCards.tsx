import React, { useEffect, useState } from "react";
// components
import Card from "components/general/Card";
// styles
import classes from "styles/components/chooseHokm/playerCards.module.scss";
// types
import { CardType } from "core/types";
// constants
import { players } from "core/constants";
// modules
import { getCards } from "core/modules/generalHelperFunctions";

const UserCards = ({
  randomInitialCards,
  setRandomInitialCards,
}: {
  randomInitialCards: {
    cards: CardType[];
    hovered: boolean[];
  };
  setRandomInitialCards: (rc: {
    cards: CardType[];
    hovered: boolean[];
  }) => void;
}) => {
  const cards = getCards();

  // handlers
  const handlePlayer1CardHover = (index: number, hovered: boolean) => {
    setRandomInitialCards((prevState) => {
      let tempPlayer1CardsState = { ...prevState };
      tempPlayer1CardsState.hovered[index] = hovered;
      return tempPlayer1CardsState;
    });
  };
  const handleEliminateCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (randomInitialCards.cards.length <= 3) return false;
    setRandomInitialCards((prevState) => {
      let tempPlayer1CardsState = [...prevState.cards];
      let tempPlayerHoverState = [...prevState.hovered];
      tempPlayer1CardsState.splice(index, 1);
      tempPlayerHoverState.splice(index, 1);
      return { cards: tempPlayer1CardsState, hovered: tempPlayerHoverState };
    });
    return;
  };
  useEffect(() => {
    const tempPlayerCards: {
      cards: CardType[];
      hovered: boolean[];
    } = { cards: [], hovered: [] };
    let tempCards = [...cards];
    for (let i = 0; i < 5; i++) {
      const playerRandomCardIndex = Math.floor(Math.random() * cards.length);
      tempPlayerCards.cards.push(cards[playerRandomCardIndex]);
      tempPlayerCards.hovered.push(false);
      tempCards.splice(playerRandomCardIndex, 1);
    }
    setRandomInitialCards({ ...tempPlayerCards });
  }, []);
  return (
    <>
      <div className={classes.cards_wrapper}>
        {randomInitialCards.cards.map((p1card, index) => (
          <div
            key={`${p1card.rank}-${p1card.suit}`}
            className={classes.card}
            style={{
              bottom: `${
                70 - index * 5 + (randomInitialCards.hovered[index] ? 50 : 0)
              }px`,
              cursor: randomInitialCards.hovered[index] ? "pointer" : "initial",
              left: `${index * 20}px`,
              transform: `rotate(${20 + (index - 4) * 10}deg)`,
            }}
            onMouseEnter={() => handlePlayer1CardHover(index, true)}
            onMouseLeave={() => handlePlayer1CardHover(index, false)}
            onClick={(e) => handleEliminateCard(e, index)}
          >
            <Card suit={p1card?.suit} rank={p1card?.rank} />
          </div>
        ))}
      </div>
      <p className={`${classes.label} ${classes.label1}`}>بازیکن شماره۱</p>
    </>
  );
};

export default UserCards;
