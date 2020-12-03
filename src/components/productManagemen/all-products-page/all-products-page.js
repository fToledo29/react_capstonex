import React from 'react';
import './all-products-page.css';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import * as productActions from '../../../redux/actions/productActions';
import ProductList from './viewProductList/viewProductList';
import ProductsApi from '../../../api-collection/productApi';
import SearchFilter from '../searchFilter/searchFilter';

class AllProductsPage extends React.Component {

	constructor() {
		super()

		this.onDelete = this.onDelete.bind(this);

		this.state = {
			spinnerOn: false
		}

	}

	componentDidMount() {

		this.props.actions.loadProducts()
		.then((res) => {

			console.log('Loading Products..');

			// TODO: Add toastr

		})
		.catch(error => {
			alert(error);
		});
	}

	onDelete() {

		if (this.props.data.productsToDelete.length <= 0) {
			return;
		}

		let itemsArray = [...this.props.data.productsToDelete];		

		const deleteItems = async () => {

			this.setState({spinnerOn: true});
			
			const itemToDelete = itemsArray.pop();

			setTimeout(() => {

				ProductsApi.deleteProduct(itemToDelete.id).then(x => {

					this.setState({spinnerOn: false});

					itemToDelete.checked = false;
	
					this.props.actions.loadProducts();
	
					if (itemsArray.length > 0) {
						deleteItems();
					}
	
				}).catch(error => {

					this.setState({spinnerOn: false});
					
					console.log('[Error when calling delete Action]: ', error)
				});

			}, 1000);

	
		}

		if (itemsArray.length > 0) {
			deleteItems();
			this.props.actions.clearProductsToDeleteArray();
		}
		
		this.props.actions.loadProducts();

	}

	render() {

		const loggedInButtons = (<>

			{this.props.data.productsToDelete.length === 1 ? 
				<Button
				disabled={!this.props.data.productsToDelete.length === 1}
				className="product-list-button update-product"
				variant="info">
					<Link to={{ pathname: `/viwProduct/${this.props.data.productsToDelete[0].id}` }}> 
						Update Product 
					</Link>
				</Button> 
			: null}
			
			<Button 
			className="product-list-button add"
			variant="info">
				<Link to={{ pathname: '/addProduct' }}> 
					Add Products
				</Link>
			</Button>

			<Button
			disabled={this.props.data.productsToDelete.length <= 0}
			className="product-list-button"
			onClick={() => this.onDelete()} 
			variant="info">
				Delete Product
			</Button>
		</>);

		return (
			<div>
				<h1 className="all-products-title">Product List</h1>

				<div className="product-list">
					
					{this.props.userData.loggedIn ? loggedInButtons: null }

					<SearchFilter />
					
					<ProductList data={this.props.data}>
					</ProductList>

				</div>

				
				{this.state.spinnerOn ? <div className="spinner-container" >
					<Spinner animation="border" variant="info"/>
				</div> : null}	
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		data: state.data,
		userData: state.userData,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
