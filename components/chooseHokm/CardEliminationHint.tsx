import React from "react";
// styles
import classes from "styles/components/chooseHokm/cardEliminationHint.module.scss";

const CardEliminationHint = ({
  remainingCards,
}: {
  remainingCards: number;
}) => (
  <div className={classes.eliminate_hint}>
    <p>
      با کلیک بر روی کارت‌ها{" "}
      <span className={classes.hakem_player_number}>{`${remainingCards}`}</span>{" "}
      کارت را بیرون بیندازید!
    </p>
  </div>
);

export default CardEliminationHint;
