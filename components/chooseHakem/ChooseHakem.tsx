import React, { useState, useEffect } from "react";
// constants
import { GAME_STAGES, players, ranks } from "core/constants";
// modules
import { getCards } from "core/modules/generalHelperFunctions";
// components
import Card from "components/general/Card";
import StartPollButton from "components/chooseHakem/StartPollButton";
import HakemAnnouncement from "components/chooseHakem/HakemAnnouncement";
import HakemPlayerDetector from "components/chooseHakem/PlayerHakemDetector";
// types
import { ChooseHakemType } from "core/types";
// styles
import classes from "styles/components/chooseHakem/chooseHakem.module.scss";
import { CardType } from "core/types";

const ChooseHakem = ({
  chooseHAKEM,
  setChooseHAKEM,
  hakem,
  setHakem,
  player1Ref,
  pileOfCards,
  cardsRef,
  player2Ref,
  player3Ref,
  player4Ref,
  setGameState,
}: ChooseHakemType) => {
  const cards = getCards();
  let hakemCounter = 0;
  const [currentHakemCardsState, setCurrentHakemCardsState] = useState<
    CardType[]
  >([]);
  const [movingCardCoordination, setMovingCardCoordination] = useState<
    { top: number; left: number }[]
  >([null]);

  // set intial position for every card in pile
  useEffect(() => {
    if (pileOfCards?.current) {
      setMovingCardCoordination((prevArray) => {
        let tempArr: { top: number; left: number }[] = [];
        cards.map(() => {
          tempArr.push({
            top: pileOfCards?.current?.offsetTop - 80,
            left: player1Ref?.current?.offsetLeft,
          });
        });
        return tempArr;
      });
    }
  }, [chooseHAKEM]);

  useEffect(() => {
    if (chooseHAKEM) {
      let tempCards = [...cards];

      const chooseHakemInterval = setInterval(() => {
        const randomCardIndex = Math.floor(Math.random() * tempCards.length);
        const pulledCard = tempCards[randomCardIndex];

        setMovingCardCoordination((prevArray) => {
          let tempCoordsArr = [...prevArray];
          let playerRef = null;
          // detect players turn for recieving card
          switch (hakemCounter % 4) {
            case players.PLAYER_1:
              playerRef = player1Ref;
              break;
            case players.PLAYER_2:
              playerRef = player2Ref;
              break;
            case players.PLAYER_3:
              playerRef = player3Ref;
              break;
            case players.PLAYER_4:
              playerRef = player4Ref;
              break;
          }
          tempCoordsArr[hakemCounter] = {
            top:
              playerRef?.current?.offsetTop -
              (window.innerHeight - playerRef?.current?.offsetTop < 100
                ? 160
                : 0),
            left:
              playerRef?.current?.offsetLeft -
              (window.innerWidth - playerRef?.current?.offsetLeft < 50
                ? 112
                : 0),
          };
          return tempCoordsArr;
        });
        setTimeout(() => {}, 100);
        setCurrentHakemCardsState((prevState) => {
          let currentHakemCards = [...prevState];
          currentHakemCards[hakemCounter % 4] = pulledCard;
          return currentHakemCards;
        });

        if (pulledCard.rank === ranks.ACE) {
          setHakem((hakemCounter + 1) % 4);
          clearInterval(chooseHakemInterval);
        }
        tempCards.splice(randomCardIndex, 1);
        cardsRef.current.splice(randomCardIndex, 1);
        hakemCounter++;
      }, 300);
    }
  }, [chooseHAKEM]);
  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        {!chooseHAKEM && hakem < 0 && (
          <StartPollButton handleClick={() => setChooseHAKEM(true)} />
        )}
        {hakem >= 0 && (
          <HakemAnnouncement
            hakem={hakem}
            handleClick={() => setGameState(GAME_STAGES.CHOOSE_HOKM)}
          />
        )}
        {chooseHAKEM && (
          <>
            <HakemPlayerDetector
              playerRef={player3Ref}
              player={players.PLAYER_3}
              cardState={currentHakemCardsState[2]}
              style={{ top: "70px" }}
              labelStyle={{ top: "10px" }}
            />
            <HakemPlayerDetector
              playerRef={player2Ref}
              player={players.PLAYER_2}
              cardState={currentHakemCardsState[1]}
            />
            {hakem < 0 && (
              <div className={classes.pile_of_cards} ref={pileOfCards}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={classes.in_pile_card}
                    style={{
                      top: movingCardCoordination[index]?.top,
                      left: movingCardCoordination[index]?.left,
                      zIndex:
                        cardsRef.current[index]?.offsetTop ===
                        pileOfCards?.current?.offsetTop - 80
                          ? 10000 - index
                          : 1000 + index,
                      display: index === 0 ? "none" : "initial",
                    }}
                  >
                    <Card rank={null} suit={null} back />
                  </div>
                ))}
              </div>
            )}
            <HakemPlayerDetector
              playerRef={player4Ref}
              player={players.PLAYER_4}
              cardState={currentHakemCardsState[3]}
              style={{ left: "3rem" }}
              labelStyle={{ left: "3rem" }}
            />
            <HakemPlayerDetector
              playerRef={player1Ref}
              player={players.PLAYER_1}
              cardState={currentHakemCardsState[0]}
              style={{ bottom: "70px" }}
              labelStyle={{
                bottom: "10px",
                width: "calc(100% - 6rem)",
                textAlign: "center",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseHakem;
