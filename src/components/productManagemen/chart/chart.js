import React, { Component } from "react";
import Chart from "react-apexcharts";
import './chart.css';

class ChartsPage extends Component {
	constructor(props) {
		super(props);
		this.colors = ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#4Ff8f4'];
		this.state = {
			
			series: [
				{
					data: [21, 22, 10, 28, 16, 21, 13, 30, 50],
				},
			],
			options: {
				chart: {
					height: 350,
					type: "bar",
					events: {
						click: function (chart, w, e) {
						// console.log(chart, w, e)
						},
					},
				},
				colors: this.colors,
				plotOptions: {
					bar: {
						columnWidth: "85%",
						distributed: true,
					},
				},
				dataLabels: {
					enabled: false,
				},
				legend: {
					show: true,
				},
				xaxis: {
					categories: [
						["John", "Doe"],
						["Joe", "Smith"],
						["Jake", "Williams"],
						"Amber",
						["Peter", "Brown"],
						["Mary", "Evans"],
						["David", "Wilson"],
						["Lily", "Roberts"],
					],
					labels: {
						style: {
							colors: this.colors,
							fontSize: "12px",
						},
					},
				},
			},
		};
  	}

  render() {
    return (
      <div className="app-chart">
        <div className="row-chart">
          <div className="mixed-chart">
            <Chart
		className="chart-component"
		options={this.state.options}
		series={this.state.series}
		type="bar"
		width="750"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartsPage;
