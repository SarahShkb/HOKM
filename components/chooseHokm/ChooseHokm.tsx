import React, { useState, useEffect, useRef } from "react";
// constants
import { players } from "core/constants";
// components
import ChooseHokmSuit from "components/chooseHokm/ChooseHokmSuit";
import HokmSuit from "components/general/HokmSuit";
import PlayerCards from "components/chooseHokm/PlayerCards";
import UserCards from "components/chooseHokm/UserCards";
// types
import { ChooseHokmType } from "core/types";
// styles
import classes from "styles/components/chooseHokm/chooseHokm.module.scss";
import { CardType } from "core/types";

const ChooseHokm = ({ HOKM, setHOKM, hakem }: ChooseHokmType) => {
  const [player1RandomInitialCards, setPlayer1RandomInitialCards] = useState<{
    cards: CardType[];
    hovered: boolean[];
  }>({ cards: [], hovered: [] });

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
          />
          {!HOKM && hakem === players.PLAYER_1 && (
            <div className={classes.hakem_announcement}>
              <ChooseHokmSuit handleChooseHokm={setHOKM} />
            </div>
          )}
          <PlayerCards
            player={players.PLAYER_2}
            getTop={(index) => `calc(40% + ${index} * 5px)`}
            getLeft={(index) => `calc(38% + ${index * 20}px)`}
          />
          <PlayerCards
            player={players.PLAYER_4}
            getTop={(index) => `calc(40% + ${index} * 5px)`}
            getLeft={(index) => `calc(-38% + ${index * 20}px)`}
            labelStyle={{ left: "3rem" }}
          />
          <UserCards
            randomInitialCards={player1RandomInitialCards}
            setRandomInitialCards={setPlayer1RandomInitialCards}
          />
        </>
      </div>
    </div>
  );
};

export default ChooseHokm;
