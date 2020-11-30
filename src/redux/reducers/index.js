import { combineReducers } from 'redux';
import data from './productReducer';
import userData from './userReducer';
import visitData from './visitReducer';

const rootReducer = combineReducers({
	data,
	userData,
	visitData,
});

export default rootReducer;



