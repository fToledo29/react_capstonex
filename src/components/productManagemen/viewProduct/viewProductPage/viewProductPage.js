
import React from 'react';
import { withRouter } from 'react-router-dom';
import FormikAddForm from '../viewForm/viewForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../../../redux/actions/productActions';
import * as visitsActions from '../../../../redux/actions/visitsActions';
import './viewProductPage.css';


class ViewProductPage extends React.Component {

	product = {};

	productId = null;

	constructor(props) {

		super(props);

		this.state = {
			viewMode: false,
			updating: false,
		};

		this.saveProduct = this.saveProduct.bind(this);

		this.updateVisits = this.updateVisits.bind(this);

		this.onChangeViewMode = this.onChangeViewMode.bind(this);

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {

		this.productId = this.props.match.params.id;

		if (this.productId) {

			const productViewMode = this.props.productViewMode;

			this.setState({viewMode: productViewMode});

			this.getProduct(this.productId);
		} else {
			this.setState({viewMode: false});
		}
	}

	onChangeViewMode(viewMode) {

		this.setState({viewMode: viewMode});
		this.setState({updating: viewMode});
	}

	getProduct(productId) {

		this.props.actions.getProduct(productId)
		.then((product) => {
			// TODO: Add toastr
		})
		.catch(error => {
			alert(error);
		});

		this.props.vistActions.getVisits();
	}

	updateVisits() {
		if (this.productId) {

			const productId = parseInt(this.productId, 10);

			const visits = [...this.props.visitData];

			const visit = visits.find((i) => i.productId === productId);

			if(!visit) {
				const newVisit = {
					visits: 1,
					productId: productId,
					productName: this.props.product.productName,
				};
				this.props.vistActions.addVisit(newVisit)
				.then((res) => {
		
					// TODO: Add toastr
		
				})
				.catch(error => {
					alert(error);
				});
			} else {

				const visitsUpdate = visit.visits + 1

				this.props.vistActions.updateVisits({id: visit.id, visits: visitsUpdate})
				.then((res) => {
		
					// TODO: Add toastr

		
				})
				.catch(error => {
					alert(error);
				});
			}
		}
	}

	saveProduct(product) {

		if (this.productId) {
			this.props.actions.updateProduct(product)
			.then((res) => {
	
				// TODO: Add toastr
				this.props.history.push('/products');

				console.log('Success adding product!: ', res);
	
			})
			.catch(error => {
				alert(error);
			})
		} else {
			this.props.actions.addProduct(product)
			.then((res) => {
	
				// TODO: Add toastr

				
				this.props.history.push('/products');
	
				console.log('Success adding product!: ', res);
	
			})
			.catch(error => {
				alert(error);
			})
		}
	}

	handleChange(updating) {
		this.setState({updating: updating});
	}

	render() {
		return (
			<div className="view-product">
				<div className="view-product-title">
					<h1>{ this.state.viewMode ? 'View Product' : 'Update Product'}</h1>
				</div>
				<FormikAddForm 
				onSave={this.saveProduct}
				updateVisits={this.updateVisits}
				description={this.props.product.description}
				productName={this.props.product.productName}
				manufacturer={this.props.product.manufacturer}
				quantity={this.props.product.quantity}
				price={this.props.product.price}
				id={this.props.product.id}
				viewMode={this.state.viewMode}
				changeViewMode={this.onChangeViewMode}
				loggedIn={this.props.userData.loggedIn}
				updating={this.state.updating}
				handleChange={this.handleChange}

				></FormikAddForm>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		productViewMode: state.data.productViewMode,
		product: state.data.productToUpdate,
		visitData: state.visitData.visits,
		userData: state.userData,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch),
		vistActions: bindActionCreators(visitsActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewProductPage));