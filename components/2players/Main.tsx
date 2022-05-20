import React, { useState, useEffect } from "react";
// icons
import CrownIcon from "assets/icons/Crown";
// constants
import { cards, ranks } from "core/constants";
// styles
import classes from "styles/components/2players/main.module.scss";

const Main2Players = () => {
  const [chooseHAKEM, setChooseHAKEM] = useState<boolean>(false);
  const [hakemChosen, setHakemChosen] = useState<boolean>(false);
  useEffect(() => {
    if (chooseHAKEM) {
      const chooseHakemInterval = setInterval(() => {}, 500);
    }
  }, [chooseHAKEM]);
  return (
    <div className={classes.bg_container}>
      <div className={classes.main_container}>
        {!chooseHAKEM && !hakemChosen && (
          <button
            className={classes.choose_HAKEM_button}
            onClick={() => setChooseHAKEM(true)}
          >
            {"بریم برای انتخاب حاکم"}
            <div className={classes.crown_icon_wrapper}>
              <CrownIcon />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Main2Players;
