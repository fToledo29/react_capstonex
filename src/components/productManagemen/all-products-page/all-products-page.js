import React from 'react';
import './all-products-page.css';
import { Link } from 'react-router-dom';
import * as productActions from '../../../redux/actions/product-actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProductList } from './viewProductList/viewProductList';

class AllProductsPage extends React.Component {

	componentDidMount() {
		this.props.actions.loadProducts()
	}

	render() {

		return (
			<div>
				{/* <h1>Product list</h1> */}

				<div className="product-list">
					
					<ProductList data={this.props.products}></ProductList>
				</div>

				<div>
					<Link 
					to={{ pathname: '/addProduct' }}
					> 
						Add Products
					</Link>
				</div>		
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
