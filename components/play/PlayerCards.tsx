import React, { useEffect, useState, useRef } from "react";
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
  playerCards,
  player,
  playerRef,
  getTop,
  getLeft,
  getRight,
  labelStyle,
  isHakem,
  isCurrentPlayer,
  centerRef,
}: {
  playerCards: CardType[];
  player: number;
  playerRef: React.MutableRefObject<null>;
  centerRef: React.MutableRefObject<null>;
  getTop: (i: number) => string;
  getLeft?: (i: number) => string;
  getRight?: (i: number) => string;
  labelStyle?: React.CSSProperties;
  isHakem?: boolean;
  isCurrentPlayer: boolean;
}) => {
  const cardRef = useRef(null);
  // states
  const [randomCardIndex, setRandomCardIndex] = useState<number>(null);

  useEffect(() => {
    if (isCurrentPlayer) {
      setTimeout(() => {
        setRandomCardIndex(Math.floor(Math.random() * playerCards.length));
      }, 300);
    }
  }, [isCurrentPlayer]);
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
      <div className={classes.cards_wrapper} ref={playerRef}>
        {playerCards?.map((pCard, index) => (
          <div
            key={`${pCard.rank}-${pCard.suit}`}
            className={classes.card}
            ref={index === randomCardIndex ? cardRef : null}
            style={
              isCurrentPlayer && index === randomCardIndex
                ? {
                    top:
                      centerRef?.current?.offsetTop *
                      (cardRef?.current?.offsetTop < 50 ? 0.6 : 1),
                    left:
                      centerRef?.current?.offsetLeft / 2 -
                      (cardRef?.current?.offsetTop < 50 ? 0 : player * 60),

                    transition: "all 0.3s ease-in-out",
                  }
                : {
                    top: getTop(index),
                    left: getLeft ? getLeft(index) : "initial",
                    right: getRight ? getRight(index) : "initial",
                    transform: `rotate(${60 + (index - 12) * 10}deg)`,
                  }
            }
          >
            <Card
              suit={pCard?.suit}
              rank={pCard?.rank}
              back={!(isCurrentPlayer && index === randomCardIndex)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayerCards;
