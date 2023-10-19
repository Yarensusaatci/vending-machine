import React from "react";
import { useCountdown } from "../dashboard/countDown";
import { useDispatch } from "react-redux";
import { expireUserSession, lightsOff } from "../../redux/actions";
import PropTypes from "prop-types";

const TimeExpire = ({ targetDate }) => {
  const [minutes, seconds] = useCountdown(targetDate);
  const dispatch = useDispatch();

  // If there is no user activity for 5 mins, expire the session.
  if (minutes + seconds <= 0) {
    dispatch(expireUserSession());
    dispatch(lightsOff());
  }

  // Displays a countdown with a more appealing design
  return (
    <div className="session-expire" data-testid="session-expire">
      <div className="countdown">
        <p><span className="countdown-number">{minutes}</span> minutes</p>
        <p><span className="countdown-number">{seconds}</span> seconds</p>
      </div>
    </div>
  );
};

export default TimeExpire;

TimeExpire.propTypes = {
  targetDate: PropTypes.instanceOf(Date),
};
