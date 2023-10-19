import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import popUpReducer from "./popUpReducer";
import vendingMachineReducer from "./vendingMachineReducer";

const allReducers = combineReducers({
  login: loginReducer,
  popUp: popUpReducer,
  machine: vendingMachineReducer,
});

export default allReducers;
