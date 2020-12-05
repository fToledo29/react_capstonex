import { combineReducers } from 'redux';
import data from './productReducer';
import userData from './userReducer';
import visitData from './visitReducer';
import fieldsData from './fieldsReducer';

const rootReducer = combineReducers({
	data,
	userData,
	visitData,
	fieldsData,
});

export default rootReducer;



