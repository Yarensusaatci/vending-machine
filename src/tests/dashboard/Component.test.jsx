import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Component from "../../components/dashboard/Component";

describe("Component", () => {
  it("should render with the provided logo and name", () => {
    // Arrange
    const component = {
      logo: "Logo",
      name: "Name",
      status: 1,
    };

    // Act
    render(<Component component={component} />);

    // Assert
    expect(screen.getByTestId("component-div")).toHaveTextContent("Logo Name");
  });

  it("should render with a green background when status is 1", () => {
    // Arrange
    const component = {
      logo: "Logo",
      name: "Name",
      status: 1,
    };

    // Act
    render(<Component component={component} />);

    // Assert
    expect(screen.getByTestId("component-div")).toHaveStyle({
      backgroundColor: "green",
    });
  });

  it("should render with a red background when status is 0", () => {
    // Arrange
    const component = {
      logo: "Logo",
      name: "Name",
      status: 0,
    };

    // Act
    render(<Component component={component} />);

    // Assert
    expect(screen.getByTestId("component-div")).toHaveStyle({
      backgroundColor: "red",
    });
  });
});
