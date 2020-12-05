import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import *  as userActions from '../../../../redux/actions/userActions';
import Product from './product/product';
import './viewProductList.css';

export const ProductList = (props) => {

	let productData = [];
	
	productData = props.data;

	return (
		<div className="product-list">
			<Table striped bordered hover className="products-table">
				<thead>
					<tr>
						{props.userData.loggedIn ? <th></th> : null}

						{props.fieldsData.fields ? props.fieldsData.fields.map((field, index) => {
							return field.enabled ? <th key={index}>{field.fieldName}</th> : null;
						}) :  null}
					</tr>
				</thead>
				<tbody>
					{productData.productsCopy ? productData.productsCopy.map((el, index) => {
						return <Product key={index} product={el}></Product>

					}) : null}
				</tbody>
			</Table>
		</div>
	)
}

function mapStateToProps(state, ownProps) {
	return {
		userData: state.userData,
		fieldsData: state.fieldsData,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);