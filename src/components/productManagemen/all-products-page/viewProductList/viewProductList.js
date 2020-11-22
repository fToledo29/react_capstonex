import React from 'react';
import { Table } from 'react-bootstrap';
import Product from './product/product';
import './viewProductList.css';

export const ProductList = (props) => {

	let productData = [];
	
	productData = props.data;

	return (
		<div className="product-list">
			{/* <h1>Product List</h1> */}
			<Table striped bordered hover className="products-table">
				<thead>
					<tr>
						<th></th>
						<th>Id</th>
						<th>Product Name</th>
						<th>Description</th>
						<th>Manufacturer</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
				{productData.products ? productData.products.map((el, index) => {
					return <Product
					key={index}
					product={el}
					></Product>

				}) : null}
				</tbody>
			</Table>
		</div>
	)
}
