import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, FormControl, FormLabel } from 'react-bootstrap';
import './signIn.css';

export const SignIn = () => {
	return (
		<div className="sign-in-container">
			

			<Card className="text-center sign-in-card" bg="Info">
				<Card.Header>
					<FontAwesomeIcon size="3x" className="icons" icon={"sign-in-alt"} />
					<h3>Login</h3>
				</Card.Header>
				<Card.Body>
					<FormLabel  >Username</FormLabel>
					<FormControl type="text"/>
					<FormLabel>Password</FormLabel>
					<FormControl type="password"/>
				</Card.Body>
			</Card>
		</div>
	)
}
