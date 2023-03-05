import React, { useState, useEffect } from "react";
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
  const [hakem, setChosen] = useState<number>(0);
  const [currentHakemCardsState, setCurrentHakemCardsState] = useState<
    CardType[]
  >([]);

  useEffect(() => {
    if (chooseHAKEM) {
      let tempCards = [...cards];
      const chooseHakemInterval = setInterval(() => {
        const randomCardIndex = Math.round(Math.random() * tempCards.length);
        const pulledCard = tempCards[randomCardIndex];
        let currentHakemCards = { ...currentHakemCardsState };

        currentHakemCards[hakemCounter % 2] = pulledCard;
        setCurrentHakemCardsState(currentHakemCards);

        if (pulledCard.rank === ranks.ACE) {
          setChosen(hakemCounter % 2);
          clearInterval(chooseHakemInterval);
        }
        tempCards.splice(randomCardIndex, 1);
        hakemCounter++;
      }, 1000);
    }
  }, [chooseHAKEM]);
  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        {!chooseHAKEM && !hakem && (
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
        {chooseHAKEM && (
          <>
            <div
              className={classes.hakem_detector_card}
              style={{ top: "100px" }}
            >
              {currentHakemCardsState[0] && (
                <Card
                  suit={currentHakemCardsState[0]?.suit}
                  rank={currentHakemCardsState[0]?.rank}
                />
              )}
            </div>
            <div
              className={classes.hakem_detector_card}
              style={{ bottom: "100px" }}
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
