import {combineReducers} from 'redux';
import NavReducer from './NavReducer';

const reducers = combineReducers({
    nav: NavReducer,
});

export default reducers;