import * as actionTypes from '../actions/actionTypes';

let initialState = {
	fields: [
		{
			id: 'id',
			enabled: true,
			fieldName: 'Id',
		},
		{
			id: 'productName',
			enabled: true,
			fieldName: 'Product Name',
		},
		{
			id: 'description',
			enabled: true,
			fieldName: 'Description',
		},
		{
			id: 'manufacturer',
			enabled: true,
			fieldName: 'Manufacturer',
		},
		{
			id: 'quantity',
			enabled: true,
			fieldName: 'Quantity',
		},
		{
			id: 'price',
			enabled: true,
			fieldName: 'Price',
		}
	],
}

export default function fieldsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOAD_FIELDS:
			return {
				...state,
			};
		case actionTypes.FIELD_CHANGE:
			let fieldsCopy = [...state.fields];
			fieldsCopy.find((field) => field.id === action.fieldId).enabled = action.enabled;
			return {
				...state,
				fields: [...fieldsCopy],
				
			}
		default:
			return state;
	}
}