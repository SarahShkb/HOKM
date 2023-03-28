import React, { useState, useEffect, useRef } from "react";
// icons
import CrownIcon from "assets/icons/Crown";
// constants
import { ranks, players } from "core/constants";
// modules
import { getCards } from "core/modules/generalHelperFunctions";
// components
import Card from "components/general/Card";
// types
import { ChooseHokmType } from "core/types";
// styles
import classes from "styles/components/2players/chooseHokm.module.scss";
import { CardType } from "core/types";

const ChooseHokm = ({
  setHOKM,
  hakem,
  player1Ref,
  pileOfCards,
  cardsRef,
  player2Ref,
}: ChooseHokmType) => {
  const cards = getCards();
  let hakemCounter = 0;
  const [currentHakemCardsState, setCurrentHakemCardsState] = useState<
    CardType[]
  >([]);
  const [movingCardTops, setMovingCardTops] = useState<number[]>([null]);
  const [player1RandomInitialCards, setPlayer1RandomInitialCards] = useState<
    CardType[]
  >([]);
  const [player2RandomInitialCards, setPlayer2RandomInitialCards] = useState<
    CardType[]
  >([]);

  useEffect(() => {
    const tempPlayer1Cards: CardType[] = [];
    const tempPlayer2Cards: CardType[] = [];
    for (let i = 0; i < 5; i++) {
      const player1RandomCardIndex = Math.floor(Math.random() * cards.length);
      const player2RandomCardIndex = Math.floor(Math.random() * cards.length);
      tempPlayer1Cards.push(cards[player1RandomCardIndex]);
      tempPlayer2Cards.push(cards[player2RandomCardIndex]);
    }
    setPlayer1RandomInitialCards([...tempPlayer1Cards]);
    setPlayer2RandomInitialCards([...tempPlayer2Cards]);
  }, []);

  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        <>
          <p className={classes.player_2_label}>بازیکن شماره ۲</p>
          {player2RandomInitialCards.map((p2card, index) => (
            <div
              className={classes.hakem_detector_card}
              style={{
                top: `${70 + index * 5}px`,
                left: `${index * 20}px`,
                transform: `rotate(${20 + (index - 4) * 10}deg)`,
              }}
              ref={player2Ref}
            >
              <Card
                suit={p2card?.suit}
                rank={p2card?.rank}
                back={hakem === players.PLAYER_2}
              />
            </div>
          ))}
          {player1RandomInitialCards.map((p1card, index) => (
            <div
              className={classes.hakem_detector_card}
              style={{
                bottom: `${70 - index * 5}px`,
                left: `${index * 20}px`,
                transform: `rotate(${20 + (index - 4) * 10}deg)`,
              }}
              ref={player1Ref}
            >
              <Card
                suit={p1card?.suit}
                rank={p1card?.rank}
                back={hakem === players.PLAYER_1}
              />
            </div>
          ))}
          <p className={classes.player_1_label}>بازیکن شماره۱</p>
        </>
      </div>
    </div>
  );
};

export default ChooseHokm;
