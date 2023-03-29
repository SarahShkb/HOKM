import React from "react";
// costants
import { suits } from "core/constants";
// icons
import SpadesIcon from "assets/icons/Spades";
import HeartsIcon from "assets/icons/Hearts";
import ClubsIcon from "assets/icons/Clubs";
import DiamondsIcon from "assets/icons/Diamonds";
import CrownIcon from "assets/icons/Crown";
// styles
import classes from "styles/components/general/hokmSuit.module.scss";

const HokmIcon = ({ hokm }: { hokm: number }): JSX.Element => {
  switch (hokm) {
    case suits.SPADES:
      return <SpadesIcon />;
    case suits.HEARTS:
      return <HeartsIcon />;
    case suits.CLUBS:
      return <ClubsIcon />;
    case suits.DIAMONDS:
      return <DiamondsIcon />;
    default:
      return <></>;
  }
};
const HokmSuit = ({ hokm }: { hokm: number }) => (
  <div className={classes.hokm_suit}>
    <div className={classes.crown_wrapper}>
      <CrownIcon />
    </div>
    <HokmIcon hokm={hokm} />
  </div>
);

export default HokmSuit;
