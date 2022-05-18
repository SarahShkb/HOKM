import React from "react";
// next
import Link from "next/link";
// styles
import classes from "styles/components/mainMenu.module.scss";

const MainMenu = (): JSX.Element => (
  <div className={classes.main_container}>
    <h1>حکم</h1>
    <div className={classes.links_wrapper}>
      <Link href={`/2players`}>
        <button>دو نفره</button>
      </Link>
      <Link href={`/4players`}>
        <button>چهار نفره</button>
      </Link>
    </div>
  </div>
);

export default MainMenu;
