import React from "react";
import { moneyUnits } from "../../data/moneyComponent";
import Coin from "./Coin";

function LoadMoney() {
  return (
    <>
      <h2>Load Money:</h2>
      <div className="money-insert" data-testid="money-insert">
        {moneyUnits.map((unit) => (
          <Coin unit={unit} key={unit} />
        ))}
      </div>
    </>
  );
}

export default LoadMoney;
