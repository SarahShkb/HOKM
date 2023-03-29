import React from "react";
// costants
import { suits } from "core/constants";
// icons
import SpadesIcon from "assets/icons/Spades";
import HeartsIcon from "assets/icons/Hearts";
import ClubsIcon from "assets/icons/Clubs";
import DiamondsIcon from "assets/icons/Diamonds";
// styles
import classes from "styles/components/general/chooseHokmSuit.module.scss";

const ChooseHokmSuit = ({
  handleChooseHokm,
}: {
  handleChooseHokm: (hokm: number) => void;
}) => (
  <div className={classes.main}>
    <p>حکم را انتخاب کنید!</p>
    <div className={classes.suits}>
      <div
        className={classes.suit_wrapper}
        onClick={() => handleChooseHokm(suits.SPADES)}
      >
        <SpadesIcon />
      </div>
      <div
        className={`${classes.suit_wrapper} ${classes.red}`}
        onClick={() => handleChooseHokm(suits.HEARTS)}
      >
        <HeartsIcon />
      </div>
      <div
        className={classes.suit_wrapper}
        onClick={() => handleChooseHokm(suits.CLUBS)}
      >
        <ClubsIcon />
      </div>
      <div
        className={`${classes.suit_wrapper} ${classes.red}`}
        onClick={() => handleChooseHokm(suits.DIAMONDS)}
      >
        <DiamondsIcon />
      </div>
    </div>
  </div>
);

export default ChooseHokmSuit;
