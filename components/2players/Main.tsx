import React, { useState, useEffect, useRef } from "react";
// icons
import CrownIcon from "assets/icons/Crown";
// constants
import { ranks, players, GAME_STAGES } from "core/constants";
// modules
import { getCards } from "core/modules/generalHelperFunctions";
// components
import Card from "components/general/Card";
import ChooseHakem from "components/2players/ChooseHakem";
// types
import { CardType } from "core/types";
// styles
//import classes from "styles/components/2players/main.module.scss";

const Main2Players = () => {
  const [gameState, setGameState] = useState<number>(GAME_STAGES.CHOOSE_HAKEM);
  const [chooseHAKEM, setChooseHAKEM] = useState<boolean>(false);
  const [hakem, setHakem] = useState<number>(-1);

  const player1Ref = useRef(null);
  const pileOfCards = useRef(null);
  const cardsRef = useRef([]);
  const player2Ref = useRef(null);

  const GameComponent = (): JSX.Element => {
    switch (gameState) {
      case GAME_STAGES.CHOOSE_HAKEM:
        return (
          <ChooseHakem
            chooseHAKEM={chooseHAKEM}
            setChooseHAKEM={setChooseHAKEM}
            hakem={hakem}
            setHakem={setHakem}
            player1Ref={player1Ref}
            pileOfCards={pileOfCards}
            cardsRef={cardsRef}
            player2Ref={player2Ref}
          />
        );
      default:
        return <></>;
    }
  };
  return GameComponent();
};

export default Main2Players;
