import React from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as productActions from '../../../../../redux/actions/productActions';
import { setProductToUpdate } from '../../../../../redux/actions/productActions';

class Product extends React.Component {




	constructor(props) {
		super(props);
		this.state = { 
			viewDetails: false,
			selectedItems: [],
			someData: '',
		};

		this.selectedItems = [];

		// this.onSelectItem = this.onSelectItem.bind(this);
	}
	
	async handleClick() {
		await this.setState({ viewDetails: true });
	}

	async handleClickMouseLeave() {

		await this.setState({ viewDetails: false });
	}

	onSelectItem(e) {
		if (e.target.checked) {
			this.props.actions.addProductToDelete(e.target);
		} else {

			const list = [...this.props.data.productsToDelete]

			const index = list.findIndex(x => x.id === e.target.id);

			list.splice(index, 1);

			this.props.actions.removeProductFromListToDelete(list);
		}
	}

	setViewModeProduct() {
		this.props.actions.viewModeProduct(true);
	}

	render() {

		const path = `/viewProduct/${this.props.product.id}`;

		setProductToUpdate(this.props.product);

		return (
			<tr>
				{this.props.userData.loggedIn ? 
					<td>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check
							id={this.props.product.id}
							value={this.props.product.id}
							onChange={e => this.onSelectItem(e)}
							type="checkbox"/>
						</Form.Group>
					</td>
				:  null}

				{this.props.fieldsData.fields ? this.props.fieldsData.fields.map((field, index) => {

					return field.id === 'productName' ?

						field.enabled ? <td key={index}>
							<Link
							onClick={() => this.setViewModeProduct()}
							onMouseEnter={() => this.handleClick()}
							onMouseLeave={() => this.handleClickMouseLeave()}
							to={{ pathname: path }}> 
								{this.props.product.productName} 
							</Link> 
						</td> : null

					: field.enabled ? 
						<td key={index}> 
							{(field.id === 'price' ? '$' : '') + this.props.product[field.id].toString()}
						</td> : null;
				}) :  null}

			</tr>
		)
	}
	
}

function mapStateToProps(state, ownProps) {
	return {
		data: state.data,
		userData: state.userData,
		fieldsData: state.fieldsData,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(productActions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));