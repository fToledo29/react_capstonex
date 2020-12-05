import React, { Component } from 'react';
import { FormLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import *  as fieldsActions from '../../../redux/actions/fieldsActions';
import './fieldsCustomizer.css';

export class FieldsCustomizer extends Component {
	
	constructor(props) {
		super(props);

		this.onSelectField = this.onChangeField.bind(this);

	}

	onChangeField(e, fieldId) {
		this.props.fieldsActions.changeField(fieldId, e.target.checked);
	}
	
	render() {
		return (
			<>
				<div className="editor-fields">
					{this.props.fieldsData ? this.props.fieldsData.fields.map((field, index) => {

						return <span className="filed-container" key={index}>
							<span key={index + 'x'} className="editor-field">

								<FormLabel key={index}>
									
									<input
									type='checkbox'
									className='custom-control-input'
									id={`${field.fieldName.toLowerCase()}_switche`}
									checked={field.enabled}
									onChange={(e) => this.onChangeField(e, field.id)}
									/>
									<label 
									className='custom-control-label' 
									htmlFor={`${field.fieldName.toLowerCase()}_switche`}>
										{field.fieldName}
									</label>

								</FormLabel>
							</span>
						</span>
					}) : null}
				</div>
			</>
		)
	}
}

const mapStateToProps = (state) => {

	return {
		fieldsData: state.fieldsData,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		fieldsActions: bindActionCreators(fieldsActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldsCustomizer)
