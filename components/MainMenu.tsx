import React from "react";
// next
import Link from "next/link";

const MainMenu = (): JSX.Element => (
  <div>
    <Link href={`/2players`}>
      <button>دو نفره</button>
    </Link>
    <Link href={`/4players`}>
      <button>چهار نفره</button>
    </Link>
  </div>
);

export default MainMenu;
