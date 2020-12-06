import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,
	Card,
	FormControl,
	FormLabel } from 'react-bootstrap';
import *  as userActions from '../../../redux/actions/userActions';
import './signIn.css';

const SignIn = (props) => {

	let userNameInput = useRef(null);

	let passInput = useRef(null);

	let history = useHistory();

	const login = async () => {

		await props.actions.loginUser(userNameInput.value, passInput.value)
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

				<Card.Header>
					<FontAwesomeIcon size="3x" className="icons" icon={"sign-in-alt"} />
					<h3>Login</h3>
				</Card.Header>

				<Card.Body>

					<FormLabel  >Username</FormLabel>
					<FormControl ref={value => userNameInput = value} type="text"/>
					<FormLabel>Password</FormLabel>
					<FormControl 
					onKeyDown={(e) => e.key === 'Enter' ? login() : null}
					onSubmit={() => login()} 
					ref={value => passInput = value} 
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

					<Button onClick={() => login()} className="sign-in-button" variant="primary" type="info">
						Login
					</Button>

				</Card.Footer>


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