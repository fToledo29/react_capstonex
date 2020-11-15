import React from 'react';
import { withFormik, Form, Field } from 'formik';
import './addForm.css';
import * as Yup from 'yup';
import { 
	Button,
	Card,
} from 'react-bootstrap';

export const AddForm = ({ values, errors, touched, isSubmitting }) => {

	const updating = values.updating;

	return (
		<div>
			<Form className="product-form">
				<Card className="text-center sign-in-card" bg="Info">

					<Card.Body>

						<div className="product-form-container">
							<label className="product-form-title">Product Name:</label>
							
							{updating ? <label>{values.productName}</label> : (() => {
								return <div>
									<Field
									disabled={updating}
									className="form-field form-control"
									type="text"
									value={values.productName}
									name="productName"
									placeholder="Product Name"/>
									{touched.productName && errors.productName && <span style={{color: "red"}}>{errors.productName}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Quantity:</label>

							{updating ? <label>{values.quantity}</label> : (() => {
								return <div>
										<Field 
										disabled={updating}
										className="form-field form-control"
										type="number"
										value={values.quantity}
										name="quantity"
										placeholder="Quantity"/>
										{touched.quantity && errors.quantity && <span style={{color: "red"}}>{errors.quantity}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Price:</label>

							{updating ? <label>{values.price}</label> : (() => {
								return <div>
										<Field
										disabled={updating}
										className="form-field form-control"
										type="number"
										value={values.price}
										name="price" 
										placeholder="Price"/>
										{touched.price && errors.price && <span style={{color: "red"}}>{errors.price}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Description:</label>

							{updating ? <label className="product-form-desc">{values.description}</label> : (() => {
								return <div>
										<Field
										disabled={updating}
										className="form-field form-control"
										as="textarea"
										value={values.description}
										name="description" 
										placeholder="Description"/>
									</div>
							})() }
						</div>

					</Card.Body>

					<Card.Footer className="add-buttons">

						<Button 
						className="add-button"
						type="submit"
						disabled={isSubmitting || updating}>Submit</Button>
					
					</Card.Footer>

				</Card>
			</Form>
		</div>
	)
}

const FormikAddForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues({description, productName, quantity, price, id, updating}){
		return {
			description: description || '',
			productName: productName || '',
			quantity: quantity || 0,
			price: price || 0,
			id: id,
			updating: updating,
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

