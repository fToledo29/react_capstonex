import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './menu.css';

export const Menu = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				{/* // Todo: Add a Home logo here*/}
				<Nav className="mr-auto">
					<NavLink className="nav-link" exact activeClassName="active" to="/">
						<FontAwesomeIcon size="1x" className="icons" icon="home" />
						<span className="login-label">Home</span>
					</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/products">Products</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/chart">Chart</NavLink>
				</Nav>
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

				</Form>
			</Navbar>
		</div>
	)
}
