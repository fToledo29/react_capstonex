import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as userActions from '../../../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './register.css';

class Register extends React.Component  {

	constructor(props) {

		super(props);

		this.state = {
			userName: '',
			email: '',
			firstName: '',
			lastName: '',
			mobileNumber: '',
			password: '',
		};

		this.saveUser = this.saveUser.bind(this);
	}

	saveUser(user) {

		this.props.actions.registerUser(user)
		.then((product) => {
			// TODO: Add toastr
		})
		.catch(error => {
			alert(error);
		});
	}

	onFormSubmit(e) {
		e.preventDefault();
	}

	handleValueChange(e, field) {
		
		const value = e.target.value;

		this.setState({[field]: value});

		if (field === 'email') {
			this.setState({userName: value.substr(0, value.indexOf('@'))});
		}

	}

	onHandleSubmit() {
		
		this.props.actions.saveUser(this.state);

		this.props.history.push('/');
	}

	render() {
		return (
			<div className="register-component">
				
				<Card className="text-center sign-in-card" bg="Info">

					<Card.Header>
						<h3>Register</h3>
					</Card.Header>

					<Card.Body>
						<Form>
							<Form.Group controlId="register-email">
								<Form.Label>Email ID</Form.Label>
								<Form.Control 
								pattern="[A-Za-z0-9-_.]+@[A-Za-z0-9-_]+\.[a-z]{1,6}" 
								type="email" 
								value={this.state.email}
								onChange={(e) => this.handleValueChange(e, 'email')} 
								placeholder="Enter email" />
								<Form.Text className="text-muted">
									Example: jonh123@mymail.com
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="register-first-name">
								<Form.Label>First Name</Form.Label>
								<Form.Control
								value={this.state.firstName}
								onChange={(e) => this.handleValueChange(e, 'firstName')}  
								pattern="[A-Za-z ]+" 
								type="text" 
								placeholder="Enter First Name" />
							</Form.Group>

							<Form.Group controlId="register-last-name">
								<Form.Label>Last Name</Form.Label>
								<Form.Control 
								value={this.state.lastName}
								onChange={(e) => this.handleValueChange(e, 'lastName')}
								pattern="[A-Za-z]+" 
								type="text" 
								placeholder="Enter First Name" />
							</Form.Group>

							<Form.Group controlId="register-mobile-number">
								<Form.Label>Mobile Number</Form.Label>
								<Form.Control 
								value={this.state.mobileNumber}
								onChange={(e) => this.handleValueChange(e, 'mobileNumber')}
								pattern="[0-9 ]{10}" 
								type="tex" 
								placeholder="Enter Mobile Number" />
								<Form.Text className="text-muted">
									Example: 9876543210
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="register-password">
								<Form.Label>Password</Form.Label>
								<Form.Control 
								value={this.state.password}
								onChange={(e) => this.handleValueChange(e, 'password')}
								type="password" 
								placeholder="Password" />
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

						<Button onClick={() => this.onHandleSubmit()} className="sign-in-button" variant="primary" type="submit">
							Submit
						</Button>

					</Card.Footer>


				</Card>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		product: state.userData
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
