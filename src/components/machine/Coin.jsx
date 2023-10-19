import React from "react";
import { useDispatch } from "react-redux";
import { insertMoney } from "../../redux/actions";
import PropTypes from "prop-types";

function Coin({ unit }) {
  const dispatch = useDispatch();

  function handleCoinClick() {
    dispatch(insertMoney(unit));
  }

  return (
    <button
      className="coin rounded-full"
      data-testid="coin"
      onClick={handleCoinClick}
    >
      {unit} Lira
    </button>
  );
}

export default Coin;

Coin.propTypes = {
  component: PropTypes.number,
};
