import React from "react";
// types
import { CardType } from "core/types";
// costants
import { suits } from "core/constants";
// modules
import { getSpecialCardRanksString } from "core/modules/generalHelperFunctions";
// icons
import SpadesIcon from "assets/icons/Spades";
import HeartsIcon from "assets/icons/Hearts";
import ClubsIcon from "assets/icons/Clubs";
import DiamondsIcon from "assets/icons/Diamonds";
// styles
import classes from "styles/components/general/card.module.scss";

const Card = ({ suit, rank, back }: CardType): JSX.Element => {
  const IconComponent = (): JSX.Element => {
    switch (suit) {
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
  const getSuitColorClass = (): string => {
    if (suit === suits.HEARTS || suit === suits.DIAMONDS) return classes.red;
    return classes.black;
  };
  return (
    <div
      className={`${classes.card} ${back ? classes.back : getSuitColorClass()}`}
    >
      {!back && (
        <>
          <div className={`${classes.rank} ${classes.top}`}>
            {getSpecialCardRanksString(rank)}
          </div>
          <div className={classes.suit}>
            <IconComponent />
          </div>
          <div className={`${classes.rank} ${classes.bottom}`}>
            {getSpecialCardRanksString(rank)}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
