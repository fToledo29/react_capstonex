import React from 'react'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const Menu = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				{/* // Todo: Add a Home logo here*/}
				<Nav className="mr-auto">
					<NavLink className="nav-link" exact activeClassName="active" to="/">Home</NavLink>
					<NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
					{/* <NavLink className="nav-link" activeClassName="active" to="/products">Products</NavLink> */}
				</Nav>
				<Form inline>
					<Button variant="outline-info">
						<NavLink activeClassName="active" to="/login">Login</NavLink>
					</Button>
				</Form>
			</Navbar>
		</div>
	)
}
