import Product from "./Product";
import MoneyInsert from "./LoadMoney";
import { useSelector, useDispatch } from "react-redux";
import LoginContainer from "../dashboard/LoginButtons";
import SessionExpire from "./TimeExpire";
import { giveRefund, logout, showPopup } from "../../redux/actions";
import RobotArmSpinner from "./PreparingProduct";
import SupplierDashboard from "../dashboard/Supplier";

function VendingMachine() {
  const machineState = useSelector((state) => state.machine);
  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const FIVE_MINS_IN_MS = 5 * 60 * 1000;
  const TEN_SECS_IN_MS = 10 * 1000;
  const dateTimeAfterFiveMins = new Date().getTime() + FIVE_MINS_IN_MS;
  const dateTimeAfterTenSecs = new Date().getTime() + TEN_SECS_IN_MS;

  function handleGiveRefundClick() {
    dispatch(
      showPopup(
        `${
          machineState.userBalance > 0
            ? `Refund: ${machineState.userBalance}  Lira.`
            : ""
        } `
      )
    );

    dispatch(giveRefund());
    dispatch(logout());
  }

  if (!loginState.isLoggedIn) {
    return <LoginContainer />;
  }

  if (machineState.robotArmSpinning) {
    return <RobotArmSpinner targetDate={dateTimeAfterTenSecs} />;
  }

  if (loginState.session === "supplier") {
    return <SupplierDashboard />;
  } else {
    return (
      <div
        className="vending-machine bg-soft-gray rounded-small"
        data-testid="vending-machine"
      ><h1 className="d">
        <SessionExpire targetDate={dateTimeAfterFiveMins} />
        {machineState.products.map((product) => (
          <Product product={product} key={product.id} />
        ))}</h1>
        <MoneyInsert />
        <h2>Credit: {machineState.userBalance} Lira</h2>
        <button
          className="btn-negative rounded-small text-white"
          onClick={handleGiveRefundClick}
          data-testid="give-refund"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default VendingMachine;
