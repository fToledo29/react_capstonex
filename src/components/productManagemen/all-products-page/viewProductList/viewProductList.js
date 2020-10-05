import React from 'react';
import { Table } from 'react-bootstrap';
import Product from './product/product';
import './viewProductList.css';

export const ProductList = (props) => {

	let productData = [];
	
	productData = props.data;

	return (
		<div className="product-list">
			<h1>Product List</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Product Name</th>
						<th>Description</th>
						<th>Manufacturer</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
				{productData.map((el, index) => {
					return <Product
					key={index}
					id={el.id}
					productName={el.productName}
					description={el.description}
					manufacturer={el.manufacturer}
					quantity={el.quantity}
					price={el.price}
					></Product>

				})}
				</tbody>
			</Table>
		</div>
	)
}
