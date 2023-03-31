import React from "react";
// icons
import CrownIcon from "assets/icons/Crown";
// styles
import classes from "styles/components/chooseHakem/startPollButton.module.scss";

const StartPollButton = ({ handleClick }: { handleClick: () => void }) => (
  <button className={classes.choose_HAKEM_button} onClick={handleClick}>
    {"بریم برای انتخاب حاکم"}
    <div className={classes.crown_icon_wrapper}>
      <CrownIcon />
    </div>
  </button>
);

export default StartPollButton;
