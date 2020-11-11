import React from 'react';
import { withFormik, Form, Field } from 'formik';
import './addForm.css';
import * as Yup from 'yup';
import { 
	Button,
	Card,
	// FormControl
} from 'react-bootstrap';

export const AddForm = ({ values, errors, touched, isSubmitting }) => {

	return (
		<div>
			<Form className="product-form">
				<Card className="text-center sign-in-card" bg="Info">

					<Card.Body>

						<div className="product-form-container">
							<label>Product Name:</label>
							<Field
							className="form-field"
							type="text"
							value={values.productName}
							name="productName"
							placeholder="Product Name"/>
							{touched.productName && errors.productName && <span style={{color: "red"}}>{errors.productName}</span> }
						</div>

						<div className="product-form-container">
							<label>Quantity:</label>
							<Field 
							className="form-field"
							type="number"
							value={values.quantity}
							name="quantity"
							placeholder="Quantity"/>
							{touched.quantity && errors.quantity && <span style={{color: "red"}}>{errors.quantity}</span> }
						</div>

						<div className="product-form-container">
							<label>Price:</label>
							<Field
							className="form-field"
							type="number"
							value={values.price}
							name="price" 
							placeholder="Price"/>
							{touched.price && errors.price && <span style={{color: "red"}}>{errors.price}</span> }
						</div>

						<div className="product-form-container">
							<label>Description:</label>
							<Field
							className="form-field"
							as="textarea"
							name="description" 
							placeholder="Description"/>
						</div>

					</Card.Body>

					<Card.Footer className="add-buttons">

						<Button className="add-button" type="submit" disabled={isSubmitting}>Submit</Button>
					
					</Card.Footer>

				</Card>
			</Form>
		</div>
	)
}

const FormikAddForm = withFormik({
	mapPropsToValues({description, productName, quantity, price}){
		return {
			description: description || '',
			productName: productName || '',
			quantity: quantity || 0,
			price: price || 0,
			id: null,
		};
	},
	validationSchema: Yup.object().shape({
		productName: Yup.string().required('Product Name is required!'),
		quantity: Yup.number().required('Quantity is required!'),
		price: Yup.number().required('Price is required!'),
	}),
	handleSubmit(values, { props }) {
		props.onSave(values);
	}
})(AddForm);

export default FormikAddForm;

