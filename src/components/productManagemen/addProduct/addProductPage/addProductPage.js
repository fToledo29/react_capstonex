
import React from 'react';
import * as productActions from '../../../../redux/actions/productActions';
import { withRouter } from 'react-router-dom';
import FormikAddForm from '../addForm/addForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import toastr from 'toastr';


class AddProductPage extends React.Component {

	product = {};

	constructor(props) {
		super(props);

		this.saveProduct = this.saveProduct.bind(this);
	}

	componentDidMount() {

		const productId = this.props.match.params.id;

		console.log('productName: ', productId);

		if (productId) {

			this.getProduct(productId);
		}
	}

	getProduct(productId) {

		this.props.actions.getProduct(productId)
		.then((product) => {
			// TODO: Add toastr
		})
		.catch(error => {
			alert(error);
		})
	}

	saveProduct(product) {

		this.props.actions.addProduct(product)
		.then((res) => {

			// TODO: Add toastr

			console.log('Success adding product!: ', res);

		})
		.catch(error => {
			alert(error);
		})
		this.props.history.push('/products');
	}


	render() {
		return (
			<>
				<h1>Add Product</h1>
				<FormikAddForm 
				onSave={this.saveProduct}
				description={this.props.product.description}
				productName={this.props.product.productName}
				quantity={this.props.product.quantity}
				price={this.props.product.price}
				></FormikAddForm>
			</>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		product: state.data.productToUpdate
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProductPage));