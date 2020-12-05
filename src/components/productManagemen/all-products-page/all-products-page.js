import React from 'react';
import './all-products-page.css';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, FormLabel, Spinner } from 'react-bootstrap';
import * as productActions from '../../../redux/actions/productActions';
import * as visitsActions from '../../../redux/actions/visitsActions';
import ProductList from './viewProductList/viewProductList';
import ProductsApi from '../../../api-collection/productApi';
import SearchFilter from '../searchFilter/searchFilter';
import FieldsCustomizer from '../fieldsCustomizer/fieldsCustomizer';

class AllProductsPage extends React.Component {

	constructor() {
		super()

		this.onDelete = this.onDelete.bind(this);

		this.handleClose = this.handleCloseEditColumns.bind(this)

		this.handleCloseEditColumns = this.handleCloseEditColumns.bind(this);

		this.onEditColumns = this.onEditColumns.bind(this);

		this.state = {
			spinnerOn: false,
			show: false,
			fadeOut: false,
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

	loadVisits(productId) {
		this.props.visitsActions.getVisits().then(() => {

			const visitsList = [...this.props.visitData.visits];

			const visitToDelete = visitsList.find((visit) => productId === visit.productId.toString());

			if (visitToDelete) {

				this.props.visitsActions.deleteVisits(visitToDelete.id);
			}

			this.props.actions.loadProducts();

		}).catch(error => {

			console.log('[Error retrieving visits]: ', error)
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

				const productId = itemToDelete.id;

				ProductsApi.deleteProduct(productId).then(x => {

					this.setState({spinnerOn: false});

					itemToDelete.checked = false;
					
					this.loadVisits(productId);
	
					if (itemsArray.length > 0) {
						deleteItems();
					}
	
				}).catch(error => {

					this.setState({spinnerOn: false});
					
					console.log('[Error when calling delete Action]: ', error)
				});

			}, 500);

	
		}

		if (itemsArray.length > 0) {
			deleteItems();
			this.props.actions.clearProductsToDeleteArray();
		}
		
		this.props.actions.loadProducts();

	}

	onEditColumns() {
		
		this.setState({fadeOut: false});

		this.setState({show: true});
	}

	handleCloseEditColumns() {

		this.setState({spinnerOn: true});

		this.setState({fadeOut: true});

		setTimeout(() => {
			this.setState({show: false});
			this.setState({spinnerOn: false});
		}, 500)

	}

	setViewModeProduct() {
		this.props.actions.viewModeProduct(false);
	}

	render() {

		const loggedInButtons = (<>

			{this.props.data.productsToDelete.length === 1 ? 
				<Button
				disabled={!this.props.data.productsToDelete.length === 1}
				className="product-list-button product-left"
				variant="info">
					<Link onClick={() => this.setViewModeProduct()} to={{ pathname: `/viwProduct/${this.props.data.productsToDelete[0].id}` }}> 
						Update Product 
					</Link>
				</Button> 
			: null}
			
			{!this.state.show ? <Button 
			className="product-list-button product-left"
			variant="info"
			onClick={() => this.onEditColumns()}>
					Edit Columns
			</Button> : null}

			{this.state.show ? <Button 
			className="product-list-button product-left"
			variant="info"
			onClick={() => this.handleCloseEditColumns()}>
					Save Columns
			</Button> : null}

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
					
					<div className="product-list-buttons">
						{this.props.userData.loggedIn ? loggedInButtons: null }
					</div>


					{this.props.userData.loggedIn && this.state.show ? 
					<div className={
						this.state.fadeOut ? 
						'field-customizer-container _out' : 
						'field-customizer-container _in'}> 
						<Card body>
						
							<FieldsCustomizer/>

						</Card> 
					</div> : null}


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
		visitData: state.visitData,
		fieldsData: state.fieldsData,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch),
		visitsActions: bindActionCreators(visitsActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
