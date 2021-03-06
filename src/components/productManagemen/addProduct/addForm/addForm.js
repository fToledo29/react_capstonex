import React, { useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import { LoremIpsum } from 'lorem-ipsum';
import './addForm.css';
import * as Yup from 'yup';
import { 
	Button,
	Card,
} from 'react-bootstrap';

export const AddForm = ({ values, errors, touched, isSubmitting }) => {

	const updateVisits = values.updateVisits;

	useEffect(() => {
		if(values.id) {
			updateVisits();
		}
	}, [updateVisits, values.id]);

	return (
		<div>					

			<Form className="product-form">
				<Card className="text-center product-details-card" bg="Info">

					<Card.Body>

						<div className="product-form-container">
							<label className="product-form-title">Product Name:</label>
							
							<Field
							className="form-field form-control"
							type="text"
							value={values.productName}
							name="productName"
							placeholder="Product Name"/>
							{touched.productName && errors.productName && <span style={{color: "red"}}>{errors.productName}</span> }
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Manufacturer:</label>

							<Field
							className="form-field form-control"
							type="text"
							value={values.manufacturer}
							name="manufacturer"
							placeholder="Manufacturer"/>
							{touched.manufacturer && errors.manufacturer && <span style={{color: "red"}}>{errors.manufacturer}</span> }
							
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Quantity:</label>

							<Field 
							className="form-field form-control"
							type="number"
							value={values.quantity}
							name="quantity"
							placeholder="Quantity"/>
							{touched.quantity && errors.quantity && <span style={{color: "red"}}>{errors.quantity}</span> }
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Price:</label>

							<Field
							className="form-field form-control"
							type="number"
							value={values.price}
							name="price" 
							placeholder="Price"/>
							{touched.price && errors.price && <span style={{color: "red"}}>{errors.price}</span> }
						</div>

						<div className="product-form-container">
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
		updateVisits,
		description,
		productName,
		manufacturer,
		quantity,
		price,
		id,
		viewMode,
	}){

			const lorem = new LoremIpsum({
				sentencesPerParagraph: {
				  max: 2,
				  min: 1
				}
			    });


		return {
			updateVisits: updateVisits,
			description:  lorem.generateSentences(1), // description || '',
			productName: lorem.generateWords(3), // productName || '',
			manufacturer: lorem.generateWords(3), // manufacturer || '',
			quantity: Math.floor(Math.random(100) * 900), // quantity || 0,
			price: Math.floor(Math.random(100) * 900), // price || 0,
			id: id,
			viewMode: viewMode,
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

