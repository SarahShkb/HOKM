import React, { useState, useRef } from "react";
// constants
import { GAME_STAGES, players } from "core/constants";
// components
import ChooseHakem from "components/chooseHakem/ChooseHakem";
import ChooseHokm from "components/chooseHokm/ChooseHokm";

const Main = () => {
  const [gameState, setGameState] = useState<number>(GAME_STAGES.CHOOSE_HAKEM);
  const [chooseHAKEM, setChooseHAKEM] = useState<boolean>(false);
  const [hakem, setHakem] = useState<number>(-1);
  const [HOKM, setHOKM] = useState<number>(null);

  const player1Ref = useRef(null);
  const player2Ref = useRef(null);
  const player3Ref = useRef(null);
  const player4Ref = useRef(null);
  const pileOfCards = useRef(null);
  const cardsRef = useRef([]);

  const GameComponent = (): JSX.Element => {
    switch (gameState) {
      case GAME_STAGES.CHOOSE_HAKEM:
        return (
          <ChooseHakem
            chooseHAKEM={chooseHAKEM}
            setChooseHAKEM={setChooseHAKEM}
            hakem={hakem}
            setHakem={setHakem}
            pileOfCards={pileOfCards}
            cardsRef={cardsRef}
            player1Ref={player1Ref}
            player2Ref={player2Ref}
            player3Ref={player3Ref}
            player4Ref={player4Ref}
            setGameState={setGameState}
          />
        );
      case GAME_STAGES.CHOOSE_HOKM:
        return (
          <ChooseHokm
            HOKM={HOKM}
            setHOKM={setHOKM}
            hakem={hakem}
            player1Ref={player1Ref}
            player2Ref={player2Ref}
            setGameState={setGameState}
          />
        );
      default:
        return <></>;
    }
  };
  return GameComponent();
};

export default Main;
