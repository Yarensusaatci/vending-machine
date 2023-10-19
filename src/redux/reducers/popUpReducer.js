const initialPopUpState = {
  isPopupOpen: false,
  popUpContent: "",
};

const popUpReducer = (state = initialPopUpState, action) => {
  switch (action.type) {
    case "SHOW_POPUP":
      const content = action.payload;
      return {
        ...state,
        isPopupOpen: true,
        popUpContent: content,
      };
    case "CLOSE_POPUP":
      return {
        ...state,
        isPopupOpen: false,
        popUpContent: "",
      };
    default:
      return state;
  }
};

export default popUpReducer;
