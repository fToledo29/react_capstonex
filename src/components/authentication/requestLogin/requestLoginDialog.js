import React from 'react';
import { Button, Modal } from "react-bootstrap";

const RequestLoginDialog = (props) => {

	return (
		<>
			<Modal animation={false} show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Login needed</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					To be able to edit product details you first need to login!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={props.goToLogin}>
						Go to Login page 
					</Button>
				</Modal.Footer>
			</Modal>
	 	</>
	);
}

export default RequestLoginDialog;