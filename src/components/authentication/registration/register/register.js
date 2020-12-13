import React from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as userActions from '../../../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './register.css';

class User {

	constructor(state) {
		this.userName = state.userName;
		this.email = state.email;
		this.firstName = state.firstName;
		this.lastName = state.lastName;
		this.mobileNumber = state.mobileNumber;
		this.password = state.password;
	}

}

export class Register extends React.Component  {

	_isMounted = false;

	constructor(props) {

		super(props);

		this.state = {
			validated: false,
			spinnerOn: false,
			userName: '',
			email: '',
			firstName: '',
			lastName: '',
			mobileNumber: '',
			password: '',
		};

		this.saveUser = this.saveUser.bind(this);
	
		this.onFormSubmit = this.onFormSubmit.bind(this);
		
		this.handleValueChange = this.handleValueChange.bind(this);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	
		this.onHandleSubmit = this.onHandleSubmit.bind(this);

		this.setSpinnerOff = this.setSpinnerOff.bind(this);
	}

	componentDidMount() {
		this.setSpinnerOff()
		this._isMounted = true;
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

	handleSubmit(event) {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			this.setState({validated: true});
		  	return;
		}
	  
		this.setState({validated: true});
		this.onHandleSubmit();
		event.preventDefault();
		event.stopPropagation();
	};

	setSpinnerOff() {
		if (this._isMounted) { 
			this.setState({spinnerOn: false});
		}
	}

	onHandleSubmit() {
		this.setState({spinnerOn: true});
		let user = new User(this.state);

		this.props.actions.saveUser(user).then((res) => {
			this.props.actions.loginUser(this.state.userName, this.state.password)
			.then((data) => {
				if(data.user.length > 0) {
					this.setSpinnerOff();
					this.props.history.push('/userDetails');
				}
				this.setSpinnerOff();

			}).catch(error => {
				this.setSpinnerOff();
				console.log('[Error trying to login]: ', error);
			});
		})
		.catch(error => {
			this.setSpinnerOff();
			alert('[Sothing went wrong trying to save new user]: ' + error);
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.setState({spinnerOn: false});
	}

	render() {
		return (
			<>
				<div className="register-component">

					<Form className="register-form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

					<Card className="text-center sign-in-card" bg="Info">

						<Card.Header>
							<h3>Register</h3>
						</Card.Header>

						<Card.Body>
							{/* <Form> */}
								<Form.Group controlId="register-email">
									<Form.Label>Email ID</Form.Label>
									<Form.Control 
									required
									pattern="[A-Za-z0-9-_.]+@[A-Za-z0-9-_]+\.[a-z]{1,6}" 
									type="email" 
									value={this.state.email}
									onChange={(e) => this.handleValueChange(e, 'email')} 
									placeholder="Enter email" />
									<Form.Text className="text-muted">
										Example: jonh123@mymail.com
									</Form.Text>
									<Form.Control.Feedback type="invalid">
										Please Enter a valid email.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="register-first-name">
									<Form.Label>First Name</Form.Label>
									<Form.Control
									required
									value={this.state.firstName}
									onChange={(e) => this.handleValueChange(e, 'firstName')}  
									pattern="[A-Za-z ]+" 
									type="text" 
									placeholder="Enter First Name" />
									<Form.Control.Feedback type="invalid">
										First Name is required!.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="register-last-name">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
									required 
									value={this.state.lastName}
									onChange={(e) => this.handleValueChange(e, 'lastName')}
									pattern="[A-Za-z]+" 
									type="text" 
									placeholder="Enter Last Name" />
									<Form.Control.Feedback type="invalid">
										Last Name is required!.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="register-mobile-number">
									<Form.Label>Mobile Number</Form.Label>
									<Form.Control 
									required
									value={this.state.mobileNumber}
									onChange={(e) => this.handleValueChange(e, 'mobileNumber')}
									pattern="[0-9 ]{10}" 
									type="tex" 
									placeholder="Enter Mobile Number" />
									<Form.Text className="text-muted">
										Example: 9876543210
									</Form.Text>
									<Form.Control.Feedback type="invalid">
										Mobile Number is required!
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="register-password">
									<Form.Label>Password</Form.Label>
									<Form.Control 
									required
									value={this.state.password}
									onChange={(e) => this.handleValueChange(e, 'password')}
									type="password" 
									placeholder="Password" />
									<Form.Control.Feedback type="invalid">
										Password field can't be empty!
									</Form.Control.Feedback>
								</Form.Group>
								
							{/* </Form> */}
						</Card.Body>

						<Card.Footer className="sign-in-buttons">

							<Button 
							className="sign-in-button" 
							variant="info" 
							type="info">
								<Link 
								to="login"
								>I have an account already!</Link>
							</Button>

							<Button
							className="sign-in-button btn-submit" 
							variant="primary"
							id='btn-submit' 
							type="submit">
								Submit
							</Button>

						</Card.Footer>


					</Card>

					
					</Form>

				</div>
				{this.state.spinnerOn ? <div className="spinner-container" >
					<Spinner animation="border" variant="info"/>
				</div> : null}
			</>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
