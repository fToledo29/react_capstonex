
import React from 'react';
import * as productActions from '../../../../redux/actions/productActions';
import * as visitsActions from '../../../../redux/actions/visitsActions';
import { withRouter } from 'react-router-dom';
import FormikAddForm from '../addForm/addForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import toastr from 'toastr';


class AddProductPage extends React.Component {

	product = {};

	productId = null;

	constructor(props) {

		super(props);

		this.saveProduct = this.saveProduct.bind(this);

		this.updateVisits = this.updateVisits.bind(this);
	}

	componentDidMount() {

		this.productId = this.props.match.params.id;

		if (this.productId) {

			this.getProduct(this.productId);
		}
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
				};
				this.props.vistActions.addVisit(newVisit)
				.then((res) => {
		
					// TODO: Add toastr

					console.log('Visit saved!: ', res);
		
				})
				.catch(error => {
					alert(error);
				});
			} else {

				const visitsUpdate = visit.visits + 1

				this.props.vistActions.updateVisits({id: visit.id, visits: visitsUpdate})
				.then((res) => {
		
					// TODO: Add toastr

					console.log('Visit saved!: ', res);
		
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


	render() {
		return (
			<>
				<h1>Add Product</h1>
				<FormikAddForm 
				onSave={this.saveProduct}
				updateVisits={this.updateVisits}
				description={this.props.product.description}
				productName={this.props.product.productName}
				manufacturer={this.props.product.manufacturer}
				quantity={this.props.product.quantity}
				price={this.props.product.price}
				id={this.props.product.id}
				updating={false}

				></FormikAddForm>
			</>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		product: state.data.productToUpdate,
		visitData: state.visitData.visits
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch),
		vistActions: bindActionCreators(visitsActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProductPage));