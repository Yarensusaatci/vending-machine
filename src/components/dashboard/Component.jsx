import React from "react";
import PropTypes from "prop-types";

const Component = ({ component }) => {
  const componentStyle = {
    borderRadius: "5px",
    backgroundColor: component.status ? "#3949AB" : "#E53935",
    padding: "10px",
    border: "1px solid #000",
  };

  return (
    <div className="component" style={componentStyle} data-testid="component-div">
      {component.logo} {component.name}
    </div>
  );
};

Component.propTypes = {
  component: PropTypes.shape({
    logo: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.bool,
  }),
};

export default Component;
