// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import React from "react";
import PropTypes from "prop-types";
import { isCompositeComponent } from "react-dom/test-utils";

class OutsideAlerter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  setWrapperRef = (node) => {
    // console.log("setWrapperRef", node);
    // console.log("this", this);
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // for some reason, need setTimeout to work, even if 0 delay
      setTimeout(() => {
        this.props.focusInputBox();
      }, 0);
    }
  };

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
