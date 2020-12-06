
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import *  as userActions from '../../../../redux/actions/userActions';
import './userDetails.css';

const UserDetails = (props) => {
	return (
		<div>
			{props.userData.user ? <Card border="success" className="text-center sign-in-card center-card" bg="Info">

				<Card.Header>
					<h3>User Details</h3>
				</Card.Header>

				<Card.Body>

				<ListGroup variant="flush">
					<ListGroup.Item>
						<div className="field-label">
							<label>Username:</label>
						</div>
						<div className="value-field">
							<span>{`${props.userData.user.userName || ''}`} </span>
						</div>

					</ListGroup.Item>
					<ListGroup.Item>
						<div className="field-label">
							<label>Name:</label>
						</div>
						<div className="value-field">
							<span>{`${props.userData.user.firstName || ''} ${props.userData.user.lastName || ''}`} </span>
						</div>

					</ListGroup.Item>
					<ListGroup.Item>
						<div className="field-label">
							<label>Email:</label>
						</div>
						<div className="value-field">
							<span>{`${props.userData.user.email || ''}`} </span>
						</div>

					</ListGroup.Item>
					<ListGroup.Item>
						<div className="field-label">
							<label>Mobile Number:</label>
						</div>
						<div className="value-field">
							<span>{`${props.userData.user.mobileNumber || ''}`} </span>
						</div>

					</ListGroup.Item>
				</ListGroup>
					
				</Card.Body>

				<Card.Footer className="sign-in-buttons">

			
				</Card.Footer>


			</Card> : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
