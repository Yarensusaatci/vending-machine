import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../redux/actions";

// Reusable popup component for displaying text on an overlay to inform the customer or the supplier
const Popup = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.popUp);

  function handleClosePopUp() {
    dispatch(closePopup());
  }

  return state.isPopupOpen ? (
    <div className="popup-overlay">
      <div className="popup rounded-small shadow-small">
        <button className="close-button" onClick={handleClosePopUp}>
          X
        </button>
        <div className="popup-content">{state.popUpContent}</div>
      </div>
    </div>
  ) : null;
};

export default Popup;
