import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import SystemDashboard from "../../components/dashboard/SystemDashboard";
import configureStore from "redux-mock-store";
import {
  shouldTriggerHeaterOrCooler,
  getCurrentEnergyConsumption,
} from "../../util/vendingMachineUtils";
import { components } from "../../data/components";

const mockStore = configureStore([]);

// Util fonksiyonlarını mocklayalım
jest.mock("../../util/machineUtils", () => ({
  shouldTriggerHeaterOrCooler: jest.fn(),
  getCurrentEnergyConsumption: jest.fn(),
}));

// shouldTriggerHeaterOrCooler işlevini her zaman true döndürecek şekilde sarmalayalım.
shouldTriggerHeaterOrCooler.mockImplementation(() => true);

describe("SystemDashboard", () => {
  it("renders the correct energy consumption.", () => {
    const store = mockStore({
      machine: {
        components: components,
      },
    });

    // getCurrentEnergyConsumption işlevini 2 olarak sarmalayalım.
    getCurrentEnergyConsumption.mockImplementation(() => 2);

    render(
      <Provider store={store}>
        <SystemDashboard />
      </Provider>
    );

    // Enerji tüketimi bileşenini doğru şekilde renderladığını doğrula.
    expect(screen.getByTestId("energy-consumption-div")).toBeInTheDocument();

    // Enerji tüketimi bileşeninin içeriğini doğrula.
    expect(screen.getByTestId("energy-consumption-div")).toHaveTextContent("2");
  });
});
