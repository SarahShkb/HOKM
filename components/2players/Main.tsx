import React, { useState, useEffect, useRef } from "react";
// icons
import CrownIcon from "assets/icons/Crown";
// constants
import { ranks, players } from "core/constants";
// modules
import { getCards } from "core/modules/generalHelperFunctions";
// components
import Card from "components/general/Card";
// styles
import classes from "styles/components/2players/main.module.scss";
import { CardType } from "core/types";

const Main2Players = () => {
  const cards = getCards();
  let hakemCounter = 0;
  const [chooseHAKEM, setChooseHAKEM] = useState<boolean>(false);
  const [hakem, setHakem] = useState<number>(-1);
  const [currentHakemCardsState, setCurrentHakemCardsState] = useState<
    CardType[]
  >([]);
  const [movingCardTops, setMovingCardTops] = useState<number[]>([null]);

  const player1Ref = useRef(null);
  const pileOfCards = useRef(null);
  const cardsRef = useRef([]);
  const player2Ref = useRef(null);

  useEffect(() => {
    if (pileOfCards?.current) {
      cards.map(() => {
        movingCardTops.push(pileOfCards?.current?.offsetTop - 80);
      });
    }
  }, [chooseHAKEM]);

  useEffect(() => {
    if (chooseHAKEM) {
      let tempCards = [...cards];

      const chooseHakemInterval = setInterval(() => {
        const randomCardIndex = Math.floor(Math.random() * tempCards.length);
        const pulledCard = tempCards[randomCardIndex];

        setMovingCardTops((prevArray) => {
          let tempArr = [...prevArray];
          tempArr[hakemCounter] = (
            hakemCounter % 2 === 0 ? player1Ref : player2Ref
          )?.current?.offsetTop;
          return tempArr;
        });
        setCurrentHakemCardsState((prevState) => {
          let currentHakemCards = [...prevState];
          currentHakemCards[hakemCounter % 2] = pulledCard;
          return currentHakemCards;
        });

        // if (pulledCard.rank === ranks.ACE) {
        //   // setHakem(hakemCounter % 2);
        //   // clearInterval(chooseHakemInterval);
        // }
        if (hakemCounter === 10) {
          //setHakem(hakemCounter % 2);
          clearInterval(chooseHakemInterval);
        }
        tempCards.splice(randomCardIndex, 1);
        cardsRef.current.pop();
        hakemCounter++;
        setTimeout(() => {}, 100);
      }, 1000);
    }
  }, [chooseHAKEM]);
  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        {!chooseHAKEM && hakem < 0 && (
          <button
            className={classes.choose_HAKEM_button}
            onClick={() => setChooseHAKEM(true)}
          >
            {"بریم برای انتخاب حاکم"}
            <div className={classes.crown_icon_wrapper}>
              <CrownIcon />
            </div>
          </button>
        )}
        {hakem >= 0 && (
          <div className={classes.hakem_announcement}>
            <p>
              <CrownIcon />
              حاکم، بازیکن شماره{" "}
              <span className={classes.hakem_player_number}>{`${
                hakem + 1
              }`}</span>{" "}
              است!
            </p>
            <button className={classes.start_game_button} onClick={() => {}}>
              {"شروع بازی"}
            </button>
          </div>
        )}
        {chooseHAKEM && (
          <>
            <div
              className={classes.hakem_detector_card}
              style={{ top: "100px" }}
              ref={player2Ref}
            >
              {currentHakemCardsState[0] && (
                <Card
                  suit={currentHakemCardsState[0]?.suit}
                  rank={currentHakemCardsState[0]?.rank}
                />
              )}
            </div>
            {hakem < 0 && (
              <div className={classes.pile_of_cards} ref={pileOfCards}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={classes.in_pile_card}
                    style={{
                      top: movingCardTops[index],
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
            <div
              className={classes.hakem_detector_card}
              style={{ bottom: "100px" }}
              ref={player1Ref}
            >
              {currentHakemCardsState[1] && (
                <Card
                  suit={currentHakemCardsState[1]?.suit}
                  rank={currentHakemCardsState[1]?.rank}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Main2Players;
