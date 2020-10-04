import React from 'react';
import { Card, FormControl, FormLabel } from 'react-bootstrap';
import './signIn.css';

export const SignIn = () => {
	return (
		<div className="sign-in-container">
			

			<Card className="text-center sign-in-card" bg="Info">
				<Card.Header>Login</Card.Header>
				<Card.Body>
				{/* <blockquote className="blockquote mb-0">
					<p>
					{' '}
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
					erat a ante.{' '}
					</p>
					<footer className="blockquote-footer">
					Someone famous in <cite title="Source Title">Source Title</cite>
					</footer>
				</blockquote> */}
					<FormLabel  >Username</FormLabel>
					<FormControl type="text"/>
					<FormLabel>Password</FormLabel>
					<FormControl type="password"/>
				</Card.Body>
			</Card>
		</div>
	)
}
