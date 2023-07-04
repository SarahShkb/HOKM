import React, { useState, useEffect, useRef } from "react";
// constants
import { GAME_STAGES, players, ranks } from "core/constants";
// components
import HokmSuit from "components/general/HokmSuit";
import PlayerCards from "components/play/PlayerCards";
import UserCards from "components/play/UserCards";
// types
import { PlayHokmType, PlayerCardsStateType, CardType } from "core/types";
// helpers
import { npcSelectCard } from "core/modules/playStateMachine";
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
  hand,
  setHand,
}: PlayHokmType) => {
  let initialized = false;
  // states
  const [roundStarter, setRoundStarter] = useState<number>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number>(hakem);
  const [currentSuit, setCurrentSuit] = useState<number>(HOKM);
  //const [current];
  // 4 cards in the center

  const [cardsInPlay, setCardsInPlay] = useState<CardType[]>([]);

  //refs
  const player1Ref = useRef(null);
  const player2Ref = useRef(null);
  const player3Ref = useRef(null);
  const player4Ref = useRef(null);
  const centerRef = useRef(null);

  // methods
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
  // handlers
  const handleNPCThrowCard = (player: number): CardType => {
    const selectedCard = npcSelectCard(
      playerCardsState[player].cards,
      currentSuit,
      HOKM
    );
    //setCurrentSuit(selectedCard.suit);
    setPlayersCardsState((prevState: PlayerCardsStateType[]) => {
      let tempPlayerCardsState: PlayerCardsStateType[] = { ...prevState };
      const selectedCardIndex = tempPlayerCardsState[player].cards.findIndex(
        (card) =>
          card.suit === selectedCard.suit && card.rank === selectedCard.rank
      );
      tempPlayerCardsState[player].cards.splice(selectedCardIndex, 1);
      return tempPlayerCardsState;
    });
    return selectedCard;
  };

  useEffect(() => {
    passRemainingCards();
    if (gameState === GAME_STAGES.NPC) {
      setRoundStarter(hakem);
      setCurrentPlayer(hakem);
      // if ((hakem + 1) % 4 === players.PLAYER_1) {
      //   setGameState(GAME_STAGES.USER_TURN);
      // }
      // if (hand < 1) {
      //   handleNPCThrowCard(hakem);
      // }
      const throwedCard = handleNPCThrowCard(hakem);
      setCardsInPlay((prevArray) => [...prevArray, throwedCard]);
      //setHand(10);
    }
  }, []);
  useEffect(() => {
    //if (hand > 5) {
    if (gameState === GAME_STAGES.NPC) {
      console.log(currentPlayer);
      setTimeout(() => {
        console.log("pc");
        const throwedCard = handleNPCThrowCard(currentPlayer);
        setCardsInPlay((prevArray) => [...prevArray, throwedCard]);
        setCurrentPlayer((c) => (c + 1) % 4);
        if ((currentPlayer + 1) % 4 === players.PLAYER_1) {
          setGameState(GAME_STAGES.USER_TURN);
        }
        // if ((currentPlayer + 1) % 4 === roundStarter) {
        //   setGameState(GAME_STAGES.CALCULATION);
        // }
        //setHand(2);
      }, 1000);
    } else {
      if (gameState === GAME_STAGES.USER_TURN) {
        console.log("user");
      }
    }
  }, [currentPlayer]);

  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        <div className={classes.hokm_suit}></div>
        {playerCardsState && (
          <>
            {HOKM !== null && <HokmSuit hokm={HOKM} />}
            <PlayerCards
              playerCards={playerCardsState[2]?.cards}
              player={players.PLAYER_3}
              playerRef={player3Ref}
              centerRef={centerRef}
              getTop={(index) => `${70 + index * 5}px`}
              getLeft={(index) => `${index * 10}px`}
              isHakem={hakem === players.PLAYER_3}
              isCurrentPlayer={currentPlayer === players.PLAYER_3}
              cardsInPlay={cardsInPlay}
            />
            <PlayerCards
              playerCards={playerCardsState[1]?.cards}
              player={players.PLAYER_2}
              playerRef={player2Ref}
              centerRef={centerRef}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(38% + ${index * 10}px)`}
              isHakem={hakem === players.PLAYER_2}
              isCurrentPlayer={currentPlayer === players.PLAYER_2}
              cardsInPlay={cardsInPlay}
            />
            {gameState === GAME_STAGES.USER_TURN && (
              <p style={{ margin: "auto" }}>نوبت شماست!</p>
            )}
            <div
              className={classes.center_div}
              ref={centerRef}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                margin: "auto",
              }}
            ></div>
            <PlayerCards
              playerCards={playerCardsState[3]?.cards}
              player={players.PLAYER_4}
              playerRef={player4Ref}
              centerRef={centerRef}
              getTop={(index) => `calc(40% + ${index} * 5px)`}
              getLeft={(index) => `calc(-38% + ${index * 10}px)`}
              labelStyle={{ left: "3rem" }}
              isHakem={hakem === players.PLAYER_4}
              isCurrentPlayer={currentPlayer === players.PLAYER_4}
              cardsInPlay={cardsInPlay}
            />
            <UserCards
              cards={playerCardsState}
              setRandomInitialCards={setPlayersCardsState}
              isHakem={hakem === players.PLAYER_1}
              playerRef={player1Ref}
              centerRef={centerRef}
              isCurrentPlayer={currentPlayer === players.PLAYER_1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Play;
