import React, { Component } from "react";
import { Row } from "antd";

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "WeatherInfo",
    };
  }

  render() {
    return (
      <div>
        <Row className="logo">{this.state.appName}</Row>
      </div>
    );
  }
}

export default HeaderBar;
