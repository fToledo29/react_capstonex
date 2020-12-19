import React from 'react';
import { withFormik, Form, Field } from 'formik';
import './addForm.css';
import * as Yup from 'yup';
import { 
	Button,
	Card,
} from 'react-bootstrap';
import { Prompt } from 'react-router-dom';

export const AddForm = ({ values, errors, touched, isSubmitting }) => {

	return (
		<div className="product-form-container">	

			<Prompt
			when={values.updating}
			message={() => 'Are you sure you want to leave this page?'}
			/>				

			<Form 
			className="product-form"
			>
				<Card className="text-center product-details-card" bg="Info">

					<Card.Body>

						<div className="product-form-field-container">
							<label className="product-form-title">Product Name:</label>
							
							<Field
							className="form-field form-control"
							type="text"
							value={values.productName}
							name="productName"
							placeholder="Product Name"/>
							{touched.productName && errors.productName && <span style={{color: "red"}}>{errors.productName}</span> }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Manufacturer:</label>

							<Field
							className="form-field form-control"
							type="text"
							value={values.manufacturer}
							name="manufacturer"
							placeholder="Manufacturer"/>
							{touched.manufacturer && errors.manufacturer && <span style={{color: "red"}}>{errors.manufacturer}</span> }
							
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Quantity:</label>

							<Field 
							className="form-field form-control"
							type="number"
							value={values.quantity}
							name="quantity"
							placeholder="Quantity"/>
							{touched.quantity && errors.quantity && <span style={{color: "red"}}>{errors.quantity}</span> }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Price:</label>

							<Field
							className="form-field form-control"
							type="number"
							value={values.price}
							name="price" 
							placeholder="Price"/>
							{touched.price && errors.price && <span style={{color: "red"}}>{errors.price}</span> }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Description:</label>

							<Field
							className="form-field form-control"
							as="textarea"
							value={values.description}
							name="description" 
							placeholder="Description"/>
						</div>

					</Card.Body>

					<Card.Footer className="add-buttons">

						<Button 
						className="add-button"
						type="submit"
						disabled={isSubmitting}>Submit</Button>
					
					</Card.Footer>

				</Card>
			</Form>
		</div>
	)
}

const FormikAddForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues({
		description,
		productName,
		manufacturer,
		quantity,
		price,
		id,
		viewMode,
		updating,
		handleChange,
	}){

		return {
			description: description || '',
			productName: productName || '',
			manufacturer: manufacturer || '',
			quantity: quantity || 0,
			price: price || 0,
			id: id,
			viewMode: viewMode,
			updating,
			handleChange,
		};
	},
	validationSchema: Yup.object().shape({
		description: Yup.string().required('Description is required!'),
		manufacturer: Yup.string().required('Manufacturer is required!'),
		productName: Yup.string().required('Product Name is required!'),
		quantity: Yup.number().moreThan(0).required('Quantity is required!'),
		price: Yup.number().moreThan(0).required('Price is required!'),
	}),
	handleSubmit(values, { props }) {

		values.handleChange(false);

		const product = {
			description: values.description,
			productName: values.productName,
			manufacturer: values.manufacturer,
			quantity: values.quantity,
			price: values.price,
			id: values.id,
		}

		props.onSave(product);
	}
})(AddForm);

export default FormikAddForm;

