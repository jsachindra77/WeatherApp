import React, { Component } from "react";
import { Row, Col, Card, Space } from "antd";
import WeatherBarGraph from "./WeatherBarGraph";

class BodyBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      cityForecast: this.props.cityForecast,
      placesToVisit: "Places to",
      days: "5 Days",
      forecast: "Forecast",
      humidity: "Humidity",
      visit: "Visit",
    };
    this.weatherLabel = this.weatherLabel.bind(this);
    this.windSpeed = this.windSpeed.bind(this);
    this.date = this.date.bind(this);
    this.countryName = this.countryName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { cityForecast } = nextProps;
    if (cityForecast !== this.state.cityForecast) {
      this.setState({ cityForecast });
    }
  }

  weatherLabel = (main) => {
    if (main === "Rain") {
      return (
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="logo" />
      );
    } else if (main === "Thunderstorm") {
      return (
        <img src="http://openweathermap.org/img/wn/11d@2x.png" alt="logo" />
      );
    } else if (main === "Snow") {
      return (
        <img src="http://openweathermap.org/img/wn/13d@2x.png" alt="logo" />
      );
    } else if (main === "Atmosphere") {
      return (
        <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="logo" />
      );
    } else if (main === "Clear") {
      return (
        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="logo" />
      );
    } else if (main === "Clouds") {
      return (
        <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="logo" />
      );
    } else {
      return "";
    }
  };

  date = (timeStampValue) => {
    const theDate = new Date(timeStampValue * 1000);
    const dateString = theDate.getDay();
    if (dateString === 0) {
      return "Sunday";
    } else if (dateString === 1) {
      return "Monday";
    } else if (dateString === 2) {
      return "Tuesday";
    } else if (dateString === 3) {
      return "Wednesday";
    } else if (dateString === 4) {
      return "Thursday";
    } else if (dateString === 5) {
      return "Friday";
    } else if (dateString === 6) {
      return "Saturday";
    } else {
      return "";
    }
  };

  countryName = (country) => {
    if (country === "DE") {
      return "Germany";
    } else if (country === "US") {
      return "USA";
    } else if (country === "GB") {
      return "UK";
    } else if (country === "CA") {
      return "Canada";
    } else if (country === "FR") {
      return "France";
    } else {
      return "";
    }
  };

  windSpeed = (meter) => {
    return (meter * 0.001).toFixed(1) + "Km";
  };

  render() {
    const { data } = this.props;
    const { width } = this.state;
    const isMobile = width <= 500;
    if (!isMobile) {
      return (
        <div>
          <Row className="bodyTitleFont">
            <Col span={8}>
              {this.state.days}
              <span className="bodyTitle"> {this.state.forecast}</span>
            </Col>
            <Col span={8} style={{ paddingLeft: 70 }}>
              {this.state.humidity}
            </Col>
            <Col span={8} style={{ paddingLeft: 100 }}>
              <span>{this.state.placesToVisit}</span>
              <span className="bodyTitle"> {this.state.visit}</span>
            </Col>
          </Row>
          <Row style={{ paddingLeft: 50 }}>
            <Col span={8}>
              <Space direction="vertical">
                {data.slice(1, 6).map((i, index) => (
                  <Card key={index} className="weatherForecast">
                    <div className="cardWeatherIcon">
                      {this.weatherLabel(i.weather[0].main)}
                    </div>
                    <div className="cardFontColor">
                      {i.temp.max} / {i.temp.min}
                    </div>
                    <div className="cardFontColor">{i.weather[0].main}</div>
                    <div className="cardFontColor">{this.date(i.dt)}</div>
                  </Card>
                ))}
              </Space>
            </Col>
            <Col span={8}>
              <WeatherBarGraph daily={this.state.cityForecast} />
            </Col>
            <Col span={8}>
              <Space direction="vertical">
                {this.state.cityForecast.map((i, index) => (
                  <Card
                    key={index}
                    className="weatherForecast"
                    style={{ marginLeft: 70 }}
                  >
                    <div className="cardWeatherIcon">
                      {this.weatherLabel(i.weather[0].main)}
                    </div>
                    <div className="cardFontColor">
                      {i.main.temp} <sup>o</sup>C
                    </div>
                    <div className="cardFontColor">
                      {i.name},{this.countryName(i.sys.country)}
                    </div>
                    <div className="cardFontColor">
                      Visibility {this.windSpeed(i.visibility)} Humidity
                      {" " + i.main.humidity}%
                    </div>
                  </Card>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row className="bodyTitleFont">
            <Col>
              5 Days <span className="bodyTitle">Forecast</span>
            </Col>
          </Row>
          <Row>
            <Col className="cardMarginMobileView">
              <Space direction="vertical">
                {data.slice(1, 6).map((i, index) => (
                  <Card key={index} className="weatherForecast">
                    <div className="cardWeatherIcon">
                      {this.weatherLabel(i.weather[0].main)}
                    </div>
                    <div className="cardFontColor">
                      {i.temp.max} / {i.temp.min}
                    </div>
                    <div className="cardFontColor">{i.weather[0].main}</div>
                    <div className="cardFontColor">{this.date(i.dt)}</div>
                  </Card>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default BodyBar;
