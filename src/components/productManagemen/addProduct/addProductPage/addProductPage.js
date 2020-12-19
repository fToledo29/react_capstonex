
import React from 'react';
import FormikAddForm from '../addForm/addForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../../../redux/actions/productActions';
import * as visitsActions from '../../../../redux/actions/visitsActions';
import './addProductPage.css';


class AddProductPage extends React.Component {

	product = {};

	productId = null;

	constructor(props) {

		super(props);

		this.state = {
			updating: true,
			product: {
				description: '',
				productName: '',
				manufacturer: '',
				quantity: 0,
				price: 0,
				id: '',
			}
		};

		this.saveProduct = this.saveProduct.bind(this);

		this.handleChange = this.handleChange.bind(this);
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
			<>
				<h1>Add Product</h1>
				<FormikAddForm 
				onSave={this.saveProduct}
				description={this.state.product.description}
				productName={this.state.product.productName}
				manufacturer={this.state.product.manufacturer}
				quantity={this.state.product.quantity}
				price={this.state.product.price}
				id={this.state.product.id}
				viewMode={false}
				updating={this.state.updating}
				handleChange={this.handleChange}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage);