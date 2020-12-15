import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Button, Card, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LoremIpsum } from 'lorem-ipsum';
import * as Yup from 'yup';
import './viewForm.css';
import RequestLoginDialog from '../../../authentication/requestLogin/requestLoginDialog';

export const AddForm = ({ values, errors, touched, isSubmitting }) => {

	const [show, setShow] = useState(false);

	const updateVisits = values.updateVisits;

	const handleClose = () => setShow(false);

	const history = useHistory();

	const goToLogin = () => history.push('/login');

	const onEdit = () => {

		if(!values.loggedIn) {

			setShow(true);

		} else {

			values.changeViewMode(!values.viewMode)

		}

	};
	
	useEffect(() => {
		if(values.id) {
			updateVisits();
		}
	}, [updateVisits, values.id]);

	return (
		<div className="product-form-container">					
			
			<RequestLoginDialog 
			show={show}
			handleClose={handleClose}
			goToLogin={goToLogin} />

			<Form className="product-form">
				<div className="edit-button-container">
					<Button 
					className="edit-button"
					onClick={() => onEdit()}
					variant="info">
					{/* // disabled={isSubmitting || updating} */}
						{values.viewMode ? 'Edit' : 'Cancel'}
					</Button>

				</div>

				<Card className="text-center product-details-card" bg="Info">

					<Card.Body>

						<div className="product-form-field-container">
							<label className="product-form-title">Product Name:</label>
							
							{values.viewMode ? <label className="product-form-desc form-control-field">{values.productName}</label> : (() => {
								return <div className="form-control-field">
									<Field
									disabled={!values.loggedIn}
									className="form-field form-control"
									type="text"
									value={values.productName}
									name="productName"
									placeholder="Product Name"/>
									{touched.productName && errors.productName && <span style={{color: "red"}}>{errors.productName}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Manufacturer:</label>
							
							{values.viewMode ? <label className="product-form-desc form-control-field">{values.manufacturer}</label> : (() => {
								return <div className="form-control-field">
									<Field
									disabled={!values.loggedIn}
									className="form-field form-control"
									type="text"
									value={values.manufacturer}
									name="manufacturer"
									placeholder="Manufacturer"/>
									{touched.manufacturer && errors.manufacturer && <span style={{color: "red"}}>{errors.manufacturer}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Quantity:</label>

							{values.viewMode ? <label className="product-form-desc form-control-field">{values.quantity}</label> : (() => {
								return <div className="form-control-field">
										<Field 
										disabled={!values.loggedIn}
										className="form-field form-control"
										type="number"
										value={values.quantity}
										name="quantity"
										placeholder="Quantity"/>
										{touched.quantity && errors.quantity && <span style={{color: "red"}}>{errors.quantity}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Price:</label>

							{values.viewMode ? <label className="product-form-desc form-control-field">{values.price}</label> : (() => {
								return <div className="form-control-field">
										<Field
										disabled={!values.loggedIn}
										className="form-field form-control"
										type="number"
										value={values.price}
										name="price" 
										placeholder="Price"/>
										{touched.price && errors.price && <span style={{color: "red"}}>{errors.price}</span> }
									</div>
							})() }
						</div>

						<div className="product-form-field-container">
							<label className="product-form-title">Description:</label>

							{values.viewMode ? <label className="product-form-desc form-control-field">{values.description}</label> : (() => {
								return <div className="form-control-field">
										<Field
										disabled={!values.loggedIn}
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
						disabled={isSubmitting || values.viewMode}>Submit</Button>
					
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
		changeViewMode,
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
			changeViewMode: changeViewMode,
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

