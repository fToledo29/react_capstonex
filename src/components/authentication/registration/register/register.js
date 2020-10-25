import React from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './register.css';

export const Register = () => {
	return (
		<div className="register-component">
			{/* <h1>Register</h1> */}

			
			<Card className="text-center sign-in-card" bg="Info">

				<Card.Header>
					{/* <FontAwesomeIcon size="3x" className="icons" icon={"sign-in-alt"} /> */}
					<h3>Register</h3>
				</Card.Header>

				<Card.Body>
					<Form>
						<Form.Group controlId="register-email">
							<Form.Label>Email ID</Form.Label>
							<Form.Control 
							pattern="[A-Za-z0-9-_.]+@[A-Za-z0-9-_]+\.[a-z]{1,6}" 
							type="email" 
							placeholder="Enter email" />
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="register-first-name">
							<Form.Label>First Name</Form.Label>
							<Form.Control pattern="[A-Za-z]+" type="text" placeholder="Enter First Name" />
						</Form.Group>

						<Form.Group controlId="register-last-name">
							<Form.Label>Last Name</Form.Label>
							<Form.Control pattern="[A-Za-z]+" type="text" placeholder="Enter First Name" />
							<Form.Text className="text-muted">
								Last Name [text-muted - test]
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="register-mobile-number">
							<Form.Label>Mobile Number</Form.Label>
							<Form.Control type="number" placeholder="Enter Mobile Number" />
							<Form.Text className="text-muted">
								Mobile Number [text-muted - test]
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="register-password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						
					</Form>
				</Card.Body>

				<Card.Footer className="sign-in-buttons">

					{/* href="/login"  */}
					<Button 
					className="sign-in-button" 
					variant="info" 
					type="info">
						<Link 
						to="login"
						>I have an account already!</Link>
					</Button>

					<Button className="sign-in-button" variant="primary" type="submit">
						Submit
					</Button>

				</Card.Footer>


			</Card>
		</div>
  	);
}
