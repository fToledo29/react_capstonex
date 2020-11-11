import React from 'react';
import './all-products-page.css';
import { Link } from 'react-router-dom';
import * as productActions from '../../../redux/actions/productActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProductList } from './viewProductList/viewProductList';
import { Button } from 'react-bootstrap';

class AllProductsPage extends React.Component {

	componentDidMount() {
		this.props.actions.loadProducts()
	}

	render() {

		return (
			<div>
				<h1>Product List</h1>

				<div className="product-list">
					
					<Button className="add-button" variant="info">
						<Link 
						to={{ pathname: '/addProduct' }}
						> 
							Add Products
						</Link>
					</Button>
					
					<ProductList data={this.props.products}></ProductList>

				</div>

				<div>
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
