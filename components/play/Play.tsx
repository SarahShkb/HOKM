import React, { useState, useEffect, useRef } from "react";
// constants
import { GAME_STAGES, players, ranks } from "core/constants";
// components
import ChooseHokmSuit from "components/chooseHokm/ChooseHokmSuit";
import HokmSuit from "components/general/HokmSuit";
import PlayerCards from "components/play/PlayerCards";
import UserCards from "components/play/UserCards";
// types
import { PlayHokmType, PlayerCardsStateType } from "core/types";
// styles
import classes from "styles/components/chooseHokm/chooseHokm.module.scss";
import { CardType } from "core/types";

const Play = ({
  HOKM,
  hakem,
  remainingCards,
  setGameState,
  playerCardsState,
  setPlayersCardsState,
}: PlayHokmType) => {
  // *handlers
  console.log(remainingCards);
  //* pass other cards to players
  useEffect(() => {
    const tempPlayerCards: PlayerCardsStateType[] = playerCardsState;
    let tempCards = [...remainingCards];
    if (tempPlayerCards[0]?.cards.length < 13) {
      for (let p = 0; p < 4; p++) {
        for (let i = 0; i < (52 - 4 * 5) / 4; i++) {
          const playerRandomCardIndex = Math.floor(
            Math.random() * tempCards.length
          );
          tempPlayerCards[p].cards.push(tempCards[playerRandomCardIndex]);
          tempPlayerCards[p].hovered.push(false);
          tempCards.splice(playerRandomCardIndex, 1);
        }
      }
    }
    setPlayersCardsState([...tempPlayerCards]);
  }, []);

  console.log("wwww", playerCardsState);

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
            />
            <PlayerCards
              player={players.PLAYER_2}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(38% + ${index * 20}px)`}
              isHakem={hakem === players.PLAYER_2}
            />
            <PlayerCards
              player={players.PLAYER_4}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(-38% + ${index * 20}px)`}
              labelStyle={{ left: "3rem" }}
              isHakem={hakem === players.PLAYER_4}
            />

            <UserCards
              randomInitialCards={playerCardsState[0]}
              setRandomInitialCards={setPlayersCardsState}
              isHakem={hakem === players.PLAYER_1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Play;
