import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import *  as userActions from '../../redux/actions/userActions';
import './menu.css';

const Menu = (props) => {

	const history = useHistory();

	const logout = () => {
		props.actions.logoutUser()
		.then((data) => {
			history.push('/products');
			console.log('User logged out: ', data);
		}).catch(error => {
			console.log('[Error trying to login]: ', error);
		});
	}


	return (
		<div>
			<Navbar animation="false" bg="dark" expand="lg" variant="dark">

				<Navbar.Toggle animation="false" aria-controls="basic-navbar-nav" />	
				<Navbar.Collapse animation="false" id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavLink className="nav-link" exact activeClassName="active" to="/">
							<FontAwesomeIcon size="1x" className="icons" icon="home" />
							<span className="login-label">Home</span>
						</NavLink>
						<NavLink className="nav-link menu-about" activeClassName="active" to="/about">About</NavLink>
						<NavLink className="nav-link menu-products" activeClassName="active" to="/products">Products</NavLink>
						<NavLink className="nav-link menu-chart" activeClassName="active" to="/chart">Top Viewed Products</NavLink>
					</Nav>

					{props.userData.loggedIn && 
					!!props.userData.user &&
					!!props.userData.user.userName ? <Form className="nav-buttons nav-user" inline>
						<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								{props.userData.user.userName}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item className="loggedin-user-profile" onClick={() => history.push('/userDetails')}>Profile</Dropdown.Item>
								<Dropdown.Item className="loggedin-user-logout" onClick={() => logout()}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Form> :
					<Form className="nav-buttons" inline>
							
							<Button variant="outline-info">
								<NavLink activeClassName="active" to="/login">
									<FontAwesomeIcon size="1x" className="icons" icon={"sign-in-alt"} />	
									<span className="login-label login">Login</span>
								</NavLink>
							</Button>

							<Button variant="outline-info">
								<NavLink activeClassName="active" to="/register">
									<FontAwesomeIcon size="1x" className="icons" icon={"user-plus"} />	
									<span className="login-label register">Register</span>
								</NavLink>
							</Button>

						</Form>}
					
					
				</Navbar.Collapse>
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