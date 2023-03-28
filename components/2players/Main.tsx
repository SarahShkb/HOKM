import React, { useState, useRef } from "react";
// constants
import { GAME_STAGES, players } from "core/constants";
// components
import ChooseHakem from "components/2players/ChooseHakem";
import ChooseHokm from "components/2players/ChooseHokm";

const Main2Players = () => {
  const [gameState, setGameState] = useState<number>(GAME_STAGES.CHOOSE_HOKM);
  const [chooseHAKEM, setChooseHAKEM] = useState<boolean>(false);
  const [hakem, setHakem] = useState<number>(players.PLAYER_1);
  const [HOKM, setHOKM] = useState<number>(null);

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
            setGameState={setGameState}
          />
        );
      case GAME_STAGES.CHOOSE_HOKM:
        return (
          <ChooseHokm
            setHOKM={setHOKM}
            hakem={hakem}
            player1Ref={player1Ref}
            pileOfCards={pileOfCards}
            cardsRef={cardsRef}
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

export default Main2Players;
