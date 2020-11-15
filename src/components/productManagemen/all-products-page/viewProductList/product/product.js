import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { setProductToUpdate } from '../../../../../redux/actions/productActions';

class Product extends React.Component {


	constructor() {
		super();
		this.state = { viewDetails: false };
	}
	
	async handleClick() {

		await this.setState({ viewDetails: true });
	}

	async handleClickMouseLeave() {

		await this.setState({ viewDetails: false });
	}


	render() {

		const path = `/updateProduct/${this.props.product.id}`;

		setProductToUpdate(this.props.product);

		return (
			<tr>
				<td>
					{this.props.product.id}
				</td>

				<td>
					<Link
					onMouseEnter={() => this.handleClick()}
					onMouseLeave={() => this.handleClickMouseLeave()}
					to={{ pathname: path }}> 
						{this.props.product.productName} 
					</Link>
				</td>

				<td>
					{this.props.product.description}
				</td>

				<td>
					{this.props.product.manufacturer}
				</td>

				<td>
					{this.props.product.quantity}
				</td>

				<td>
					${this.props.product.price}
				</td>
			</tr>
		)
	}
	
}

export default withRouter(Product);