import React from "react";

const Scores = ({
  team1_3 = 0,
  team2_4 = 0,
}: {
  team1_3: number;
  team2_4: number;
}) => (
  <div>
    <p>تیم ۱ و ۳ :‌ {team1_3}</p>
    <p>تیم ۲ و ۴ : {team2_4}</p>
  </div>
);

export default Scores;
