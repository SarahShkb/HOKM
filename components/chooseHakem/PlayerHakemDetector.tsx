import React from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// components
import Card from "components/general/Card";
// styles
import classes from "styles/components/chooseHakem/playerHakemDetector.module.scss";
// types
import { CardType } from "core/types";
// constants
import { players } from "core/constants";

const HakemPlayerDetector = ({
  player,
  playerRef,
  cardState,
  style,
  labelStyle,
}: {
  player: number;
  playerRef: any;
  cardState: CardType;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}) => (
  <>
    <p
      className={`${classes.label} 
      ${player % 2 === 1 && classes.rival_label} 
      ${player === players.PLAYER_3 && classes.label3}`}
      style={labelStyle}
    >
      بازیکن شماره {digitsEnToFa(player + 1)}
    </p>
    <div
      className={`${classes.hakem_detector_card} ${
        player % 2 === 1 && classes.rival
      }`}
      style={style}
      ref={playerRef}
    >
      {cardState && (
        <>
          <Card suit={cardState.suit} rank={cardState.rank} />
        </>
      )}
    </div>
  </>
);

export default HakemPlayerDetector;
