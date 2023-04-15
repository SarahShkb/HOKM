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

const ChooseHokm = ({
  HOKM,
  setHOKM,
  hakem,
  setRemainingCards,
  setGameState,
}: ChooseHokmType) => {
  const [randomInitialCards, setRandomInitialCards] = useState<
    {
      cards: CardType[];
      hovered: boolean[];
    }[]
  >(null);

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
        const playerRandomCardIndex = Math.floor(Math.random() * cards.length);
        tempPlayerCards[p].cards.push(cards[playerRandomCardIndex]);
        tempPlayerCards[p].hovered.push(false);
        tempCards.splice(playerRandomCardIndex, 1);
      }
    }
    setRandomInitialCards([...tempPlayerCards]);
    setRemainingCards([...tempCards]);
  }, []);

  useEffect(() => {
    // if system has to choose hokm
    if (randomInitialCards && hakem !== players.PLAYER_1) {
      const systemHokm = handleChooseHokmBySystem(
        randomInitialCards[hakem].cards
      );
      setHOKM(systemHokm);
    }
  }, [randomInitialCards]);

  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        <div className={classes.hokm_suit}></div>
        <>
          {HOKM !== null && <HokmSuit hokm={HOKM} />}
          <PlayerCards
            player={players.PLAYER_3}
            getTop={(index) => `${70 + index * 5}px`}
            getLeft={(index) => `${index * 20}px`}
            isHakem={hakem === players.PLAYER_3}
          />
          {!HOKM && hakem === players.PLAYER_1 && (
            <div>
              <ChooseHokmSuit handleChooseHokm={setHOKM} />
            </div>
          )}
          {HOKM && (
            <div className={classes.play_button_wrapper}>
              <button
                className={classes.play_button}
                onClick={() => setGameState(GAME_STAGES.PLAY)}
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
          />
          <PlayerCards
            player={players.PLAYER_4}
            getTop={(index) => `calc(40% + ${index} * 5px)`}
            getLeft={(index) => `calc(-38% + ${index * 20}px)`}
            labelStyle={{ left: "3rem" }}
            isHakem={hakem === players.PLAYER_4}
          />
          {randomInitialCards && (
            <UserCards
              randomInitialCards={randomInitialCards[0]}
              setRandomInitialCards={setRandomInitialCards}
              isHakem={hakem === players.PLAYER_1}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default ChooseHokm;
