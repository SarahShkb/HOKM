import React, { useState, useEffect, useRef } from "react";
// constants
import { GAME_STAGES, players, ranks } from "core/constants";
// components
import HokmSuit from "components/general/HokmSuit";
import PlayerCards from "components/play/PlayerCards";
import UserCards from "components/play/UserCards";
// types
import { PlayHokmType, PlayerCardsStateType } from "core/types";
// styles
import classes from "styles/components/chooseHokm/chooseHokm.module.scss";

const Play = ({
  HOKM,
  hakem,
  remainingCards,
  gameState,
  setGameState,
  playerCardsState,
  setPlayersCardsState,
}: PlayHokmType) => {
  // states
  const [starter, setStarter] = useState<number>(hakem);

  //refs
  const player1Ref = useRef(null);
  const player2Ref = useRef(null);
  const player3Ref = useRef(null);
  const player4Ref = useRef(null);
  const centerRef = useRef(null);

  // when choosing hokm, each user has 5 initial cards.
  // now we have to pass remaining 8 cards to each user.
  const passRemainingCards = () => {
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
  };

  useEffect(() => {
    passRemainingCards();
    if (gameState === GAME_STAGES.NPC) {
      let playerRef = null;
      switch (starter) {
        case players.PLAYER_2:
          playerRef = player2Ref;
          break;
        case players.PLAYER_3:
          playerRef = player3Ref;
          break;
        case players.PLAYER_4:
          playerRef = player4Ref;
          break;
        default:
          break;
      }
    }
  }, []);
  useState(() => {});

  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        <div className={classes.hokm_suit}></div>
        {playerCardsState && (
          <>
            {HOKM !== null && <HokmSuit hokm={HOKM} />}
            <PlayerCards
              playerRandomInitialCards={playerCardsState[2]?.cards}
              player={players.PLAYER_3}
              playerRef={player3Ref}
              getTop={(index) => `${70 + index * 5}px`}
              getLeft={(index) => `${index * 10}px`}
              isHakem={hakem === players.PLAYER_3}
            />
            <PlayerCards
              playerRandomInitialCards={playerCardsState[1]?.cards}
              player={players.PLAYER_2}
              playerRef={player2Ref}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(38% + ${index * 10}px)`}
              isHakem={hakem === players.PLAYER_2}
            />
            <div
              className={classes.center_div}
              ref={centerRef}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                background: "gold",
                margin: "auto",
              }}
            ></div>
            <PlayerCards
              playerRandomInitialCards={playerCardsState[3]?.cards}
              player={players.PLAYER_4}
              playerRef={player4Ref}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(-38% + ${index * 10}px)`}
              labelStyle={{ left: "3rem" }}
              isHakem={hakem === players.PLAYER_4}
            />
            <UserCards
              randomInitialCards={playerCardsState[0]}
              setRandomInitialCards={setPlayersCardsState}
              isHakem={hakem === players.PLAYER_1}
              playerRef={player1Ref}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Play;
