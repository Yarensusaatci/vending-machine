import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, showPopup } from "../../redux/actions";
import PropTypes from "prop-types";

function Product({ product }) {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.machine);

  function handleSelectItemClick() {
    if (machineState.userBalance < product.price) {
      // Checks user balance
      dispatch(showPopup("Not enough money."));
    } else if (product.quantity <= 0) {
      // Checks product quantity
      dispatch(showPopup(`There is no ${product.name} left.`));
    } else {
      dispatch(selectProduct(product));
    }
  }

  return (
    <div
      className="product rounded-medium grid text-white"
      data-testid="product"
    >
      <img src={product.imageUrl} alt={product.name + " logo"} width={100} />
      <div>{product.name}</div>
      <div>{product.price} Lira</div>
      <div>LAST {product.quantity} </div>
      <button
        className="btn-select rounded-medium"
        onClick={handleSelectItemClick}
        data-testid="select-item-button"
      >
        BUY
      </button>
    </div>
  );
}

export default Product;

Product.propTypes = {
  component: PropTypes.object,
};
