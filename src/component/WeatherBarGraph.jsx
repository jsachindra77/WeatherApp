import React, { Component } from "react";
import Chart from "react-apexcharts";

class WeatherBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        labels: ["Berlin", "New York", "London", "Ottawa", "Paris"],
      },
      description:
        "The above Donut chart shows the percentage value based on the summation of the humidity of all the countries.",
    };
  }
  render() {
    const { daily } = this.props;
    const humidity = [];
    for (const data of daily) {
      humidity.push(data.main.humidity);
    }
    return (
      <div className="ApexCharts">
        <div className="row">
          <div className="donut">
            <Chart
              options={this.state.options}
              series={humidity}
              type="donut"
              width="380"
            />
            <h2 className="donutChart">{this.state.description}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherBarGraph;
