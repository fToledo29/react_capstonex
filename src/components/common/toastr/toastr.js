import React from 'react'
import { Toast } from 'react-bootstrap'

export const Toastr = () => {
	return (
		<div>
			<Toast>
				<Toast.Header>
					<strong className="mr-auto">Bootstrap</strong>
					<small>11 mins ago</small>
				</Toast.Header>
				<Toast.Body>Hello, This is a toast message.</Toast.Body>
			</Toast>
		</div>
	)
}
