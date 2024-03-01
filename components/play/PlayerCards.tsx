import React, { useEffect, useState, useRef } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// components
import Card from "components/general/Card";
// icons
import CrownIcon from "assets/icons/Crown";
// styles
import classes from "styles/components/chooseHokm/playerCards.module.scss";
// types
import { CardType } from "core/types";
// constants
import { GAME_STAGES, players } from "core/constants";
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
  gameState,
  centerRef,
  cardsInPlay,
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
  gameState?: number;
  cardsInPlay: CardType[];
}) => {
  const cardsInPlayPositions = [
    { top: 80, left: 55 },
    { top: 30, left: 152 },
    { top: -65, left: 55 },
    { top: 30, left: -43 },
  ];
  const cardRef = useRef(null);
  // states
  const [randomCardIndex, setRandomCardIndex] = useState<number>(null);

  useEffect(() => {
    if (isCurrentPlayer && gameState === GAME_STAGES.NPC) {
      setTimeout(() => {
        setRandomCardIndex(Math.floor(Math.random() * playerCards.length));
      }, 1990);
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
        بازیکن شماره {digitsEnToFa(player + 1)} {isHakem && <CrownIcon />}
      </p>
      <div className={classes.cards_wrapper} ref={playerRef}>
        {playerCards?.map((pCard, index) => {
          return (
            <div
              key={`${pCard.rank}-${pCard.suit}`}
              className={classes.card}
              ref={index === randomCardIndex ? cardRef : null}
              style={
                isCurrentPlayer && index === randomCardIndex
                  ? {
                      top: `${cardsInPlayPositions[player]}px`,
                      left: `${cardsInPlayPositions[player]}px`,
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
                suit={
                  isCurrentPlayer && index === randomCardIndex
                    ? cardsInPlay[cardsInPlay?.length - 1]?.suit
                    : pCard?.suit
                }
                rank={
                  isCurrentPlayer && index === randomCardIndex
                    ? cardsInPlay[cardsInPlay?.length - 1]?.rank
                    : pCard?.rank
                }
                back={
                  !(isCurrentPlayer && index === randomCardIndex) ||
                  gameState === GAME_STAGES.CALCULATION
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlayerCards;
