import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import MovieReducer from './MovieReducer';

const reducers = combineReducers({
    nav: NavReducer,
    movie: MovieReducer
});

export default reducers;