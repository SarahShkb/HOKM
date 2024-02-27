import React, { useState, useEffect, useRef } from "react";
// constants
import { GAME_STAGES, players, ranks } from "core/constants";
// components
import ChooseHokmSuit from "components/chooseHokm/ChooseHokmSuit";
import HokmSuit from "components/general/HokmSuit";
import PlayerCards from "components/chooseHokm/PlayerCards";
import UserCards from "components/chooseHokm/UserCards";
// types
import { ChooseHokmType } from "core/types";
// modules
import { getCards } from "core/modules/generalHelperFunctions";
// styles
import classes from "styles/components/chooseHokm/chooseHokm.module.scss";
import { CardType } from "core/types";
import Scores from "components/general/Scores";

const ChooseHokm = ({
  HOKM,
  setHOKM,
  hakem,
  setRemainingCards,
  setGameState,
  playerCardsState,
  setPlayersCardsState,
}: ChooseHokmType) => {
  const cards = getCards();
  // handlers
  const handleChooseHokmBySystem = (cards: CardType[]): number => {
    // if 3 or more cards from a suit exists, that is hokm
    // else, hokm is a suit with the most sum of ranks
    let hokmSuit: number = null;
    const suitsCounter = {};
    for (let c = 0; c < cards.length; c++) {
      suitsCounter[`${cards[c].suit}`] = Object.hasOwn(
        suitsCounter,
        `${cards[c].suit}`
      )
        ? {
            rankSum: suitsCounter[`${cards[c].suit}`].rankSum + cards[0].rank,
            count: eval(suitsCounter[`${cards[c].suit}`].count + 1),
          }
        : {
            rankSum: cards[0].rank,
            count: 1,
          };
    }
    const maxRank = 0;
    Object.values(suitsCounter).map((sc, index) => {
      if (sc.count >= 3) {
        hokmSuit = Number(Object.keys(suitsCounter)[index]);
      } else {
        if (maxRank < sc.rankSum) {
          maxRank = sc.rankSum;
          hokmSuit = Number(Object.keys(suitsCounter)[index]);
        }
      }
    });
    return hokmSuit;
  };

  useEffect(() => {
    const tempPlayerCards: {
      cards: CardType[];
      hovered: boolean[];
    }[] = [
      { cards: [], hovered: [] },
      { cards: [], hovered: [] },
      { cards: [], hovered: [] },
      { cards: [], hovered: [] },
    ];
    let tempCards = [...cards];
    for (let p = 0; p < 4; p++) {
      for (let i = 0; i < 5; i++) {
        const playerRandomCardIndex = Math.floor(
          Math.random() * tempCards.length
        );
        tempPlayerCards[p].cards.push(tempCards[playerRandomCardIndex]);
        tempPlayerCards[p].hovered.push(false);
        tempCards.splice(playerRandomCardIndex, 1);
      }
    }
    setPlayersCardsState([...tempPlayerCards]);
    setRemainingCards([...tempCards]);
  }, []);

  useEffect(() => {
    // if system has to choose hokm
    if (playerCardsState && hakem !== players.PLAYER_1) {
      const systemHokm = handleChooseHokmBySystem(
        playerCardsState[hakem].cards
      );
      setHOKM(systemHokm);
    }
  }, [playerCardsState]);

  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        <div className={classes.hokm_suit}></div>

        {playerCardsState && (
          <>
            {HOKM !== null && <HokmSuit hokm={HOKM} />}
            <PlayerCards
              player={players.PLAYER_3}
              getTop={(index) => `${70 + index * 5}px`}
              getLeft={(index) => `${index * 20}px`}
              isHakem={hakem === players.PLAYER_3}
              cards={playerCardsState[players.PLAYER_3].cards}
            />
            {!HOKM && hakem === players.PLAYER_1 && (
              <ChooseHokmSuit handleChooseHokm={setHOKM} />
            )}
            {HOKM && (
              <div className={classes.play_button_wrapper}>
                <button
                  className={classes.play_button}
                  onClick={() =>
                    setGameState(
                      hakem === players.PLAYER_1
                        ? GAME_STAGES.USER_TURN
                        : GAME_STAGES.NPC
                    )
                  }
                >
                  {"شروع بازی"}
                </button>
              </div>
            )}
            <PlayerCards
              player={players.PLAYER_2}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(38% + ${index * 20}px)`}
              isHakem={hakem === players.PLAYER_2}
              cards={playerCardsState[players.PLAYER_2].cards}
            />
            <PlayerCards
              player={players.PLAYER_4}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(-38% + ${index * 20}px)`}
              labelStyle={{ left: "3rem" }}
              isHakem={hakem === players.PLAYER_4}
              cards={playerCardsState[players.PLAYER_4].cards}
            />

            <UserCards
              randomInitialCards={playerCardsState[players.PLAYER_1]}
              setRandomInitialCards={setPlayersCardsState}
              isHakem={hakem === players.PLAYER_1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseHokm;
