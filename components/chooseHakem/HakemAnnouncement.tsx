import React from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// icons
import CrownIcon from "assets/icons/Crown";
// styles
import classes from "styles/components/chooseHakem/hakemAnnouncement.module.scss";

const HakemAnnouncement = ({
  handleClick,
  hakem,
}: {
  handleClick: () => void;
  hakem: number;
}) => (
  <div className={classes.hakem_announcement}>
    <p>
      <CrownIcon />
      حاکم، بازیکن شماره{" "}
      <span className={classes.hakem_player_number}>{`${digitsEnToFa(hakem + 1)}`}</span> است!
    </p>
    <button className={classes.start_game_button} onClick={handleClick}>
      {"شروع بازی"}
    </button>
  </div>
);

export default HakemAnnouncement;
