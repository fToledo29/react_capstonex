import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import *  as fieldsActions from '../../../redux/actions/fieldsActions';
export class FieldsCustomizer extends Component {
	render() {
		return (
			<div>
				
			</div>
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
		userActions: bindActionCreators(fieldsActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldsCustomizer)
