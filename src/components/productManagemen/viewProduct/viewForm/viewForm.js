import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Button, Card, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LoremIpsum } from 'lorem-ipsum';
import * as Yup from 'yup';
import './viewForm.css';
import RequestLoginDialog from '../../../authentication/requestLogin/requestLoginDialog';

export const AddForm = ({ values, errors, touched, isSubmitting }) => {

	const [viewMode, setShouldEdit] = useState(true);

	const [show, setShow] = useState(false);

	const updateVisits = values.updateVisits;

	const handleClose = () => setShow(false);

	const history = useHistory();

	const goToLogin = () => history.push('/login');

	const onEdit = () => {

		if(!values.loggedIn) {

			setShow(true);

		} else {

			setShouldEdit(!viewMode);

		}

	};
	
	useEffect(() => {
		if(values.id) {
			updateVisits();
		}
	}, [updateVisits, values.id]);

	return (
		<div>					
			
			<RequestLoginDialog 
			show={show}
			handleClose={handleClose}
			goToLogin={goToLogin} />

			<Form className="product-form">
				<div className="edit-button-container">
					{values.viewMode ? <Button 
					className="edit-button"
					onClick={() => onEdit()}
					variant="info">
					{/* // disabled={isSubmitting || updating} */}
						{viewMode ? 'Edit' : 'Cancel'}
					</Button> : null }

				</div>

				<Card className="text-center product-details-card" bg="Info">

					<Card.Body>

						<div className="product-form-container">
							<label className="product-form-title">Product Name:</label>
							
							{viewMode ? <label>{values.productName}</label> : (() => {
								return <div>
									<Field
									disabled={viewMode}
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
							<label className="product-form-title">Manufacturer:</label>
							
							{viewMode ? <label>{values.manufacturer}</label> : (() => {
								return <div>
									<Field
									disabled={viewMode}
									className="form-field form-control"
									type="text"
									value={values.manufacturer}
									name="manufacturer"
									placeholder="Manufacturer"/>
									{touched.manufacturer && errors.manufacturer && <span style={{color: "red"}}>{errors.manufacturer}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-container">
							<label className="product-form-title">Quantity:</label>

							{viewMode ? <label>{values.quantity}</label> : (() => {
								return <div>
										<Field 
										disabled={viewMode}
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

							{viewMode ? <label>{values.price}</label> : (() => {
								return <div>
										<Field
										disabled={viewMode}
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

							{viewMode ? <label className="product-form-desc">{values.description}</label> : (() => {
								return <div>
										<Field
										disabled={viewMode}
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
						disabled={isSubmitting || viewMode}>Submit</Button>
					
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
		loggedIn,
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
			loggedIn: loggedIn,
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

