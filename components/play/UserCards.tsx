import React, { useEffect, useState } from "react";
// components
import Card from "components/general/Card";
// icons
import CrownIcon from "assets/icons/Crown";
// styles
import classes from "styles/components/chooseHokm/playerCards.module.scss";
// types
import { CardType } from "core/types";
// constants
import { players } from "core/constants";

const UserCards = ({
  randomInitialCards,
  setRandomInitialCards,
  isHakem,
}: {
  randomInitialCards: {
    cards: CardType[];
    hovered: boolean[];
  };
  setRandomInitialCards: (
    rc: {
      cards: CardType[];
      hovered: boolean[];
    }[]
  ) => void;
  isHakem?: boolean;
}) => {
  // handler
  console.log("aaaaaaaaa", randomInitialCards);
  const handlePlayer1CardHover = (index: number, hovered: boolean) => {
    setRandomInitialCards((prevState) => {
      let tempPlayer1CardsState = [...prevState];
      tempPlayer1CardsState[0].hovered[index] = hovered;
      return tempPlayer1CardsState;
    });
  };
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
              transform: `rotate(${20 + (index - 12) * 10}deg)`,
            }}
            onMouseEnter={() => handlePlayer1CardHover(index, true)}
            onMouseLeave={() => handlePlayer1CardHover(index, false)}
          >
            <Card suit={p1card?.suit} rank={p1card?.rank} />
          </div>
        ))}
      </div>
      <p className={`${classes.label} ${classes.label1}`}>
        بازیکن شماره۱ {isHakem && <CrownIcon />}
      </p>
    </>
  );
};

export default UserCards;