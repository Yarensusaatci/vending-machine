import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SupplierDashboard from "../../components/dashboard/SupplierDashboard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { isMachineAlreadyFull } from "../../util/vendingMachineUtils";

const mockStore = configureStore([]);

jest.mock("../../util/machineUtils", () => ({
  isMachineAlreadyFull: jest.fn(),
}));

describe("SupplierDashboard", () => {
  it("dispatches correct actions when 'Collect Money' button is clicked.", () => {
    isMachineAlreadyFull.mockImplementation(() => true);
    const store = mockStore({
      machine: {
        data: "Mocked data",
      },
    });

    render(
      <Provider store={store}>
        <SupplierDashboard />
      </Provider>
    );

    const collectMoneyButton = screen.getByTestId("collect-money");
    fireEvent.click(collectMoneyButton);

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain("SHOW_POPUP");
    expect(actions).toContain("COLLECT_MONEY");
  });

  it("dispatches correct actions when 'Reset Products' button is clicked.", () => {
    isMachineAlreadyFull.mockImplementation(() => true);
    const store = mockStore({
      machine: {
        data: "Mock data",
      },
    });

    render(
      <Provider store={store}>
        <SupplierDashboard />
      </Provider>
    );

    const resetProductsButton = screen.getByTestId("reset-products");
    fireEvent.click(resetProductsButton);

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain("SHOW_POPUP");
    expect(actions).toContain("RESET_MACHINE");
  });

  it("dispatches correct actions when 'Logout' button is clicked.", () => {
    isMachineAlreadyFull.mockImplementation(() => true);
    const store = mockStore({
      machine: {
        data: "Mock data",
      },
    });

    render(
      <Provider store={store}>
        <SupplierDashboard />
      </Provider>
    );

    const logoutButton = screen.getByTestId("logout");
    fireEvent.click(logoutButton);

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toContain("LOGOUT");
    expect(actions).toContain("LIGHTS_OFF");
  });
});
