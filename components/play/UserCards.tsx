import React, { useEffect, useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// components
import Card from "components/general/Card";
// icons
import CrownIcon from "assets/icons/Crown";
// styles
import classes from "styles/components/chooseHokm/playerCards.module.scss";
// types
import { CardType } from "core/types";

const UserCards = ({
  cards,
  playerRef,
  centerRef,
  setRandomInitialCards,
  isHakem,
  isCurrentPlayer,
}: {
  cards: {
    cards: CardType[];
    hovered: boolean[];
  };
  playerRef: React.MutableRefObject<null>;
  centerRef: React.MutableRefObject<null>;
  setRandomInitialCards: (
    rc: {
      cards: CardType[];
      hovered: boolean[];
    }[]
  ) => void;
  isHakem?: boolean;
  isCurrentPlayer: boolean;
}) => {
  // handler
  const handlePlayer1CardHover = (index: number, hovered: boolean) => {
    setRandomInitialCards((prevState) => {
      let tempPlayer1CardsState = [...prevState];
      tempPlayer1CardsState[0].hovered[index] = hovered;
      return tempPlayer1CardsState;
    });
  };
  return (
    <>
      <div className={classes.cards_wrapper} ref={playerRef}>
        {cards.cards.map((p1card, index) => (
          <div
            key={`${p1card.rank}-${p1card.suit}`}
            className={classes.card}
            style={{
              bottom: `${
                90 - Math.abs(6 - index) * 6 + (cards.hovered[index] ? 50 : 0)
              }px`,
              cursor: cards.hovered[index] ? "pointer" : "initial",
              left: `${index * 15}px`,
              transform: `rotate(${60 + (index - 13) * 10}deg)`,
            }}
            onMouseEnter={() => handlePlayer1CardHover(index, true)}
            onMouseLeave={() => handlePlayer1CardHover(index, false)}
          >
            <Card suit={p1card?.suit} rank={p1card?.rank} />
          </div>
        ))}
      </div>
      <p className={`${classes.label} ${classes.label1}`}>
        بازیکن شماره {digitsEnToFa(1)} {isHakem && <CrownIcon />}
      </p>
    </>
  );
};

export default UserCards;
