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
// modules
import { getCards } from "core/modules/generalHelperFunctions";

const PlayerCards = ({
  playerRandomInitialCards,
  player,
  getTop,
  getLeft,
  getRight,
  labelStyle,
  isHakem,
}: {
  playerRandomInitialCards: CardType[];
  player: number;
  getTop: (i: number) => string;
  getLeft?: (i: number) => string;
  getRight?: (i: number) => string;
  labelStyle?: React.CSSProperties;
  isHakem?: boolean;
}) => {
  return (
    <>
      <p
        className={`${classes.label} 
      ${player % 2 === 1 && classes.rival_label} 
      ${player === players.PLAYER_3 && classes.label3}`}
        style={labelStyle}
      >
        بازیکن شماره {player + 1} {isHakem && <CrownIcon />}
      </p>
      <div className={classes.cards_wrapper}>
        {playerRandomInitialCards?.map((pCard, index) => (
          <div
            key={`${pCard.rank}-${pCard.suit}`}
            className={classes.card}
            style={{
              top: getTop(index),
              left: getLeft ? getLeft(index) : "initial",
              right: getRight ? getRight(index) : "initial",
              transform: `rotate(${60 + (index - 12) * 10}deg)`,
            }}
          >
            <Card suit={pCard?.suit} rank={pCard?.rank} back />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayerCards;
