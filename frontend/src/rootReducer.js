import { combineReducers } from 'redux';

// Import reducers
import bookingReducers from './reducers/bookingReducers';

export default combineReducers({
    bookingReducers,
});