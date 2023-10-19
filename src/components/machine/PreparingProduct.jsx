import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCountdown } from "../dashboard/countDown";
import { useDispatch, useSelector } from "react-redux";
import { faHourglass } from "@fortawesome/free-solid-svg-icons"; // Correctly import the icon

import {
  giveSelectedProduct,
  cancelRequest,
  showPopup,
} from "../../redux/actions";
import PropTypes from "prop-types";

function RobotArmSpinner({ targetDate }) {
  const dispatch = useDispatch();
  const machineState = useSelector((state) => state.machine);
  const [minutes, seconds] = useCountdown(targetDate);

  // If there is no cancel request for 10 seconds, give the product to the customer.
  useEffect(() => {
    if (minutes + seconds <= 0) {
      dispatch(giveSelectedProduct());
      dispatch(
        showPopup(`You can get your ${machineState.selectedProduct.name}. `)
      );
    }
  }, [seconds, minutes, dispatch, machineState.selectedProduct.name]);

  function handleCancelRequestClick() {
    dispatch(cancelRequest());
  }

  return (
    <div className="robot-arm-spinner" data-testid="robot-arm-spinner">
      <div className="spinner-container">
        <FontAwesomeIcon icon={faHourglass} spin size="2x" color="#E53935" />
      </div>
      <h4 className="spinner-label">Almost ready...</h4>
      <button
        className="cancel-button"
        onClick={handleCancelRequestClick}
        data-testid="cancel-request"
      >
        Cancel Request
      </button>
    </div>
  );
}

export default RobotArmSpinner;

RobotArmSpinner.propTypes = {
  targetDate: PropTypes.instanceOf(Date),
};
