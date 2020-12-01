import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import *  as userActions from '../../redux/actions/userActions';
import './menu.css';

const Menu = (props) => {

	const logout = () => {
		props.actions.logoutUser()
		.then((data) => {
			console.log('User logged out: ', data);
		}).catch(error => {
			console.log('[Error trying to login]: ', error);
		});
	}


	return (
		<div>
			<Navbar bg="dark" variant="dark">
				{/* // TODO: Add a Home logo here*/}
				<Nav className="mr-auto">
					<NavLink className="nav-link" exact activeClassName="active" to="/">
						<FontAwesomeIcon size="1x" className="icons" icon="home" />
						<span className="login-label">Home</span>
					</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/products">Products</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/chart">Chart</NavLink>
				</Nav>
				
				{props.userData.loggedIn && 
				!!props.userData.user &&
				!!props.userData.user.userName ? <Form className="nav-buttons nav-user" inline>
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{props.userData.user.userName}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="#/profile">Profile</Dropdown.Item>
							<Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Form> :
				<Form className="nav-buttons" inline>
					
					<Button variant="outline-info">
						<NavLink activeClassName="active" to="/login">
							<FontAwesomeIcon size="1x" className="icons" icon={"sign-in-alt"} />	
							<span className="login-label">Login</span>
						</NavLink>
					</Button>

					<Button variant="outline-info">
						<NavLink activeClassName="active" to="/register">
							<FontAwesomeIcon size="1x" className="icons" icon={"user-plus"} />	
							<span className="login-label">Register</span>
						</NavLink>
					</Button>

				</Form>}
			</Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);