import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, FormControl, FormLabel, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

				<Card.Footer className="sign-in-buttons">
					
				
					
					{/* href="/register"  */}
					<Button 
					className="sign-in-button" 
					variant="info" 
					type="info">
						<Link 
						to="register"
						>Register</Link>
					</Button>

					<Button className="sign-in-button" variant="primary" type="info">
						Login
					</Button>

				</Card.Footer>


			</Card>
		</div>
	)
}
