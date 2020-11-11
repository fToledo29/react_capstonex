
import React from 'react';
import * as productActions from '../../../../redux/actions/productActions';
import { withRouter } from 'react-router-dom';
import FormikAddForm from '../addForm/addForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';


class AddProductPage extends React.Component {

	constructor(props) {
		super(props);
		this.saveProduct = this.saveProduct.bind(this);
	}

	saveProduct(product) {

		this.props.actions.addProduct(product)
		.then(() => toastr.success('User added'))
		.catch(error => {
			alert(error)
		})
		this.props.history.push('/products');
	}


	render() {
		return (
			<>
				<h1>Add Product</h1>
				<FormikAddForm onSave={this.saveProduct}></FormikAddForm>
			</>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		products: state.products
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProductPage));