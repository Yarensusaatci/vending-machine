const initialLoginState = {
  isLoggedIn: false,
  remainingAttempt: 3,
  session: null,
};

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        session: action.payload,
      };
    case "FAIL_LOGIN_ATTEMPT":
      return {
        ...state,
        remainingAttempt: state.remainingAttempt - 1,
        session: null,
      };
    case "EXPIRE_USER_SESSION":
      return {
        ...state,
        isLoggedIn: false,
        session: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        session: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
