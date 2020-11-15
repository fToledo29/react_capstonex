import { combineReducers } from 'redux';
import data from './productReducer';
import userData from './userReducer';

const rootReducer = combineReducers({
	data,
	userData
});

export default rootReducer;



