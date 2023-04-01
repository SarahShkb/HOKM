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

const PlayerCards = ({
  player,
  getTop,
  getLeft,
  getRight,
  labelStyle,
}: {
  player: number;
  getTop: (i: number) => string;
  getLeft?: (i: number) => string;
  getRight?: (i: number) => string;
  labelStyle?: React.CSSProperties;
}) => {
  const cards = getCards();
  const [playerRandomInitialCards, setPlayerRandomInitialCards] = useState<{
    cards: CardType[];
    hovered: boolean[];
  }>({ cards: [], hovered: [] });
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
    setPlayerRandomInitialCards({ ...tempPlayerCards });
  }, []);
  return (
    <>
      <p
        className={`${classes.label} 
      ${player % 2 === 1 && classes.rival_label} 
      ${player === players.PLAYER_3 && classes.label3}`}
        style={labelStyle}
      >
        بازیکن شماره {player + 1}
      </p>
      <div className={classes.cards_wrapper}>
        {playerRandomInitialCards.cards.map((pCard, index) => (
          <div
            key={`${pCard.rank}-${pCard.suit}`}
            className={classes.card}
            style={{
              top: getTop(index),
              left: getLeft ? getLeft(index) : "initial",
              right: getRight ? getRight(index) : "initial",
              transform: `rotate(${20 + (index - 4) * 10}deg)`,
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
