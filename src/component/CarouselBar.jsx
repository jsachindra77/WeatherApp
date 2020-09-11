import React, { Component } from "react";
import { Carousel } from "antd";

class CarouselBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latLongCityName: "Bangalore -  Karnatka",
      currentData: this.props.currentData,
      label1: "We Deliver Weather Forecast Per Day",
      label2: "Climate is what we expect, weather is what we get",
    };
    this.date = this.date.bind(this);
    this.windSpeed = this.windSpeed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentData } = nextProps;
    if (currentData !== this.state.currentData) {
      this.setState({ currentData });
    }
  }

  date = (timeStampValue) => {
    const theDate = new Date(timeStampValue * 1000);
    const time = theDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const fetchDays = days[theDate.getDay()];

    return fetchDays + "," + time;
  };

  windSpeed = (meter) => {
    return (meter * 0.001).toFixed(1) + "Km";
  };

  render() {
    return (
      <div className="divStyle">
        <Carousel autoplay>
          <div>
            <div
              className="carouselContentStyle"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              {this.state.latLongCityName}
              <div className="carouselTextMargin">
                {this.date(this.state.currentData.dt)}
              </div>
              <div className="carouselTextMargin">
                Humidity : {this.state.currentData.humidity} %
              </div>
              <div className="carouselTextMargin">
                Visibility : {this.windSpeed(this.state.currentData.visibility)}
              </div>
            </div>
          </div>
          <div>
            <h3 className="carouselContentStyle labelFont">
              {this.state.label1}
              <div className="carouselTextMargin labelFont">
                {this.state.label2}
              </div>
            </h3>
          </div>
        </Carousel>
        <div className="p4pSliderBar">
          <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="logo" />
          {this.state.currentData.temp}
          <sup>o</sup>C
        </div>
      </div>
    );
  }
}

export default CarouselBar;
