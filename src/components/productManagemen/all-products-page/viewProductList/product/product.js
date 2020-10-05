import React from 'react'
import { Link, withRouter } from 'react-router-dom';

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

		const path = `/product/${this.props.productName}`;

		return (
			<tr>
				<td>
					{this.props.id}
				</td>

				<td>
					<Link
					onMouseEnter={() => this.handleClick()}
					onMouseLeave={() => this.handleClickMouseLeave()}
					to={{ pathname: path }}> 
						{this.props.productName} 
					</Link>
				</td>

				<td>
					{this.props.description}
				</td>

				<td>
					{this.props.manufacturer}
				</td>

				<td>
					{this.props.quantity}
				</td>

				<td>
					{this.props.price}
				</td>
			</tr>
		)
	}
	
}

export default withRouter(Product);