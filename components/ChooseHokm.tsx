import React, { useState, useEffect, useRef } from "react";
// icons
import CrownIcon from "assets/icons/Crown";
// constants
import { ranks, players } from "core/constants";
// modules
import { getCards } from "core/modules/generalHelperFunctions";
// components
import Card from "components/general/Card";
import ChooseHokmSuit from "components/general/ChooseHokmSuit";
import HokmSuit from "components/general/HokmSuit";
// types
import { ChooseHokmType } from "core/types";
// styles
import classes from "styles/components/chooseHokm.module.scss";
import { CardType } from "core/types";

const ChooseHokm = ({
  HOKM,
  setHOKM,
  hakem,
  player1Ref,
  player2Ref,
}: ChooseHokmType) => {
  const cards = getCards();
  const [player1RandomInitialCards, setPlayer1RandomInitialCards] = useState<{
    cards: CardType[];
    hovered: boolean[];
  }>({ cards: [], hovered: [] });
  const [player2RandomInitialCards, setPlayer2RandomInitialCards] = useState<{
    cards: CardType[];
    hovered: boolean[];
  }>({ cards: [], hovered: [] });

  // handlers
  const handlePlayer1CardHover = (index: number, hovered: boolean) => {
    setPlayer1RandomInitialCards((prevState) => {
      let tempPlayer1CardsState = { ...prevState };
      tempPlayer1CardsState.hovered[index] = hovered;
      return tempPlayer1CardsState;
    });
  };
  const handleEliminateCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (player1RandomInitialCards.cards.length <= 3) return false;
    setPlayer1RandomInitialCards((prevState) => {
      let tempPlayer1CardsState = [...prevState.cards];
      let tempPlayerHoverState = [...prevState.hovered];
      tempPlayer1CardsState.splice(index, 1);
      tempPlayerHoverState.splice(index, 1);
      return { cards: tempPlayer1CardsState, hovered: tempPlayerHoverState };
    });
    return;
  };

  useEffect(() => {
    const tempPlayer1Cards: {
      cards: CardType[];
      hovered: boolean[];
    } = { cards: [], hovered: [] };
    const tempPlayer2Cards: {
      cards: CardType[];
      hovered: boolean[];
    } = { cards: [], hovered: [] };
    let tempCards = [...cards];
    for (let i = 0; i < 5; i++) {
      const player1RandomCardIndex = Math.floor(Math.random() * cards.length);
      tempPlayer1Cards.cards.push(cards[player1RandomCardIndex]);
      tempPlayer1Cards.hovered.push(false);
      tempCards.splice(player1RandomCardIndex, 1);

      const player2RandomCardIndex = Math.floor(Math.random() * cards.length);
      tempPlayer2Cards.cards.push(cards[player2RandomCardIndex]);
      tempPlayer2Cards.hovered.push(false);
      tempCards.splice(player2RandomCardIndex, 1);
    }
    setPlayer1RandomInitialCards({ ...tempPlayer1Cards });
    setPlayer2RandomInitialCards({ ...tempPlayer2Cards });
  }, []);

  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        <div className={classes.hokm_suit}></div>
        <>
          {HOKM !== null && <HokmSuit hokm={HOKM} />}
          <p className={classes.player_2_label}>بازیکن شماره ۲</p>
          {player2RandomInitialCards.cards.map((p2card, index) => (
            <div
              key={`${p2card.rank}-${p2card.suit}`}
              className={classes.hakem_detector_card}
              style={{
                top: `${70 + index * 5}px`,
                left: `${index * 20}px`,
                transform: `rotate(${20 + (index - 4) * 10}deg)`,
              }}
              ref={player2Ref}
            >
              <Card suit={p2card?.suit} rank={p2card?.rank} back />
            </div>
          ))}
          {!HOKM && (
            <div className={classes.hakem_announcement}>
              <ChooseHokmSuit handleChooseHokm={setHOKM} />
            </div>
          )}
          {(HOKM !== null || hakem !== players.PLAYER_1) &&
            player1RandomInitialCards.cards.length - 3 > 0 && (
              <div className={classes.hakem_announcement}>
                <p>
                  با کلیک بر روی کارت‌ها{" "}
                  <span className={classes.hakem_player_number}>{`${
                    player1RandomInitialCards.cards.length - 3
                  }`}</span>{" "}
                  کارت را بیرون بیندازید!
                </p>
              </div>
            )}
          {player1RandomInitialCards.cards.map((p1card, index) => (
            <div
              key={`${p1card.rank}-${p1card.suit}`}
              className={classes.hakem_detector_card}
              style={{
                bottom: `${
                  70 -
                  index * 5 +
                  (player1RandomInitialCards.hovered[index] ? 50 : 0)
                }px`,
                cursor: player1RandomInitialCards.hovered[index]
                  ? "pointer"
                  : "initial",
                left: `${index * 20}px`,
                transform: `rotate(${20 + (index - 4) * 10}deg)`,
              }}
              ref={player1Ref}
              onMouseEnter={() => handlePlayer1CardHover(index, true)}
              onMouseLeave={() => handlePlayer1CardHover(index, false)}
              onClick={(e) => handleEliminateCard(e, index)}
            >
              <Card suit={p1card?.suit} rank={p1card?.rank} />
            </div>
          ))}
          <p className={classes.player_1_label}>بازیکن شماره۱</p>
        </>
      </div>
    </div>
  );
};

export default ChooseHokm;
