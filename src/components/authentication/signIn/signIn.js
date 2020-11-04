import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { Button, Card, FormControl, FormLabel, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserApi from '../../../api-collection/userApi';
import './signIn.css';

export const SignIn = () => {

	let userNameInput = useRef(null);

	let passInput = useRef(null);

	const login = () => {

		UserApi.login(userNameInput.value, passInput.value).then((data) => {



			console.log('Data from login request: ', data);
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
					<FormControl ref={value => passInput = value} type="password"/>
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
