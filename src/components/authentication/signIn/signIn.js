import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,
	Card,
	Form,
	FormControl,
	FormLabel } from 'react-bootstrap';
import *  as userActions from '../../../redux/actions/userActions';
import './signIn.css';

const SignIn = (props) => {

	const [validated,  setValidated] = useState (false);

	const [userName,  setUserName] = useState ('');

	const [password,  setPassword] = useState ('');

	let history = useHistory();

	const handleValueChange = (e, field) => {
		
		const value = e.target.value;

		if (field === 'userName') {
			setUserName(value);
			setValidated(true);
		} else if (field === 'password') {
			setPassword(value);
			setValidated(true);
		}
	}

	const login = async (event) => {

		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
		  	return;
		}
	  
		setValidated(true);
		event.preventDefault();
		event.stopPropagation();

		await props.actions.loginUser(userName, password)
		.then((data) => {
			if(data.user.length > 0) {
				history.push('/products');
			} else {
				alert(`Username and/or password doesn't match`);
			}

		}).catch(error => {
			console.log('[Error trying to login]: ', error);
		});
		
	}

	return (
		<div className="sign-in-container">

			<Card className="text-center sign-in-card" bg="Info">
				<Form validated={validated} onSubmit={login}>
					<Card.Header>
						<FontAwesomeIcon size="3x" className="icons" icon={"sign-in-alt"} />
						<h3>Login</h3>
					</Card.Header>

					<Card.Body>

						<FormLabel  >Username</FormLabel>
						<FormControl 
						onChange={(e) => handleValueChange(e, 'userName')} 
						required
						value={userName} 
						type="text"/
						>
						<FormLabel>Password</FormLabel>
						<FormControl 
						required
						onChange={(e) => handleValueChange(e, 'password')}
						value={password} 
						type="password"/>

					</Card.Body>

					<Card.Footer className="sign-in-buttons">

						<Button 
						className="sign-in-button" 
						variant="info" 
						type="info">
							<Link 
							to="register"
							>Register</Link>
						</Button>

						<Button
						type="submit"
						disabled={!(validated && (userName !== '' && password !== ''))}
						className="sign-in-button" variant="primary">
							Login
						</Button>

					</Card.Footer>
				</Form>
			</Card>
		</div>
	)
}

function mapStateToProps(state, ownProps) {
	return {
		userData: state.userData,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);