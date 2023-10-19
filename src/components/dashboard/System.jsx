import React from "react";
import Component from "./Component";
import { useSelector } from "react-redux";
import Weather from "./API";
import { getCurrentEnergyConsumption } from "../../util/vendingMachineUtils";


const VENDING_MACHINE_LOCATION = "Gölbaşı";
function System() {
  const machineState = useSelector((state) => state.machine);

  return (
    <div
      className="system-dashboard bg-soft-gray rounded-small"
      data-testid="system-dashboard"
    >
      <Weather cityName={VENDING_MACHINE_LOCATION} />
      {machineState.components.map((component) => (
        <Component component={component} key={component.id} />
      ))}
      <div data-testid="energy-consumption-div">
        Energy consumption is{" "}
        {getCurrentEnergyConsumption(machineState.components)} units/hour
      </div>
    </div>
  );
}

export default System;
