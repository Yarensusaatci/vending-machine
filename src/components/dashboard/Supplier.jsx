import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectMoney, resetMachine, showPopup } from "../../redux/actions";
import { logout, lightsOff } from "../../redux/actions";
import { isMachineAlreadyFull } from "../../util/vendingMachineUtils";

function Supplier() {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.machine);

  function handleCollectMoneyClick() {
    if (machineState.machineBalance <= 0) {
      dispatch(showPopup("There is no money in the machine."));
    } else {
      dispatch(
        showPopup(
          `You got ${machineState.machineBalance}  lira.`
        )
      );
      dispatch(collectMoney());
    }
  }

  function handleResetProductsClick() {
    const currentProducts = machineState.products;
    if (isMachineAlreadyFull(currentProducts)) {
      dispatch(showPopup("Machine is already full of products!"));
    } else {
      dispatch(showPopup("All product slots are filled."));
      dispatch(resetMachine());
    }
  }

  function handleLogoutClick() {
    dispatch(logout());
    dispatch(lightsOff());
  }

  return (
    <div
      className="supplier-dashboard bg-soft-gray rounded-small grid"
      data-testid="supplier-dashboard"
    >
      Machine Balance = {machineState.machineBalance}
      <button
        className="rounded-small text-white"
        onClick={handleCollectMoneyClick}
        data-testid="collect-money"
      >
        Get All Money
      </button>
      <button
        className="rounded-small text-white"
        onClick={handleResetProductsClick}
        data-testid="reset-products"
      >
        Reset Products
      </button>
      <button
        className="rounded-small text-white"
        onClick={handleLogoutClick}
        data-testid="logout"
      >
        Logout
      </button>
    </div>
  );
}

export default Supplier;
