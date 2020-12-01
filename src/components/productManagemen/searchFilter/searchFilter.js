import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterProducts } from '../../../redux/actions/visitsActions';
import './searchFilter.css';

const SearchFilter = (props) =>  {

	function onKeyUpEvent(event) {
		props.dispatchSearch(event.target.value);
	}

	return (
		<div className="search-bar">
			<InputGroup className="mb-2">
				<InputGroup.Prepend>
					<InputGroup.Text>
						<FontAwesomeIcon size="1x" className="icons" icon={"search"} />	
					</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl 
				id="inlineFormInputGroup" 
				onChange={(e) => onKeyUpEvent(e)} 
				placeholder="Filter by product name" />
			</InputGroup>
		</div>
	);

};


function mapStateToProps(state, ownProps) {
	return {
		product: state.data.products,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatchSearch: (producName) => dispatch(filterProducts(producName)), 
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);