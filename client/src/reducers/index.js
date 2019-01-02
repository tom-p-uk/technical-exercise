import { combineReducers } from 'redux';

import pickerReducer from './pickerReducer';

const rootReducer = combineReducers({
    picker: pickerReducer,
});

export default rootReducer;
