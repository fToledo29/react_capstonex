import React, { Component } from "react";
import Chart from "react-apexcharts";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../../redux/actions/productActions';
import * as visitsActions from '../../../redux/actions/visitsActions';
import './chart.css';

class ChartsPage extends Component {

	constructor(props) {
		super(props);

		 this.categories = [];

		 this.seriesData = [];

		 this.state = {
			series: [],
			options: {},
		};
	}

	setProperties() {

		this.colors = ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#4Ff8f4'];

		if (this.props.visitData && this.props.visitData.length > 0 ) {

			const products = this.props.visitData.sort((a,b) => b.visits - a.visits).slice(0, 10);

			this.categories = products.map(x => [x.productName]);

			this.seriesData = products.map(x => x.visits);

			this.setData();

		} else {

			this.props.vistActions.getVisits().then((x) => {
				
				const products = this.props.visitData.sort((a,b) => b.visits - a.visits).slice(0, 10);
	
				this.categories = products.map(x => [x.productName]);

				this.seriesData = products.map(x => x.visits);

				this.setData();
	
			});
		}
	}



	setData() {
		this.setState({
			
			series: [
				{
					data: this.seriesData
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
					categories: this.categories,
					labels: {
						style: {
							colors: this.colors,
							fontSize: "12px",
						},
					},
				},
			},
		});
	}

	componentDidMount() {
		this.setProperties();
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

function mapStateToProps(state, ownProps) {
	return {
		products: state.data.products,
		visitData: state.visitData.visits
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch),
		vistActions: bindActionCreators(visitsActions, dispatch),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChartsPage));
