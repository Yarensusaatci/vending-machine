import VendingMachine from "./components/machine/VendingMachine";
import SystemDashboard from "./components/dashboard/System";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./redux/reducers";
import Popup from "./components/Popup";

const store = createStore(allReducers);

function App() {
  return (
    <Provider store={store}>
      <div className="main-layout flex">
        <SystemDashboard />
        <Popup />
        <VendingMachine />
      </div>
    </Provider>
  );
}

export default App;
