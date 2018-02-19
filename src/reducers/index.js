import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import MovieReducer from './MovieReducer';
import TVReducer from './TVReducer';

const reducers = combineReducers({
    nav: NavReducer,
    movie: MovieReducer,
    tv: TVReducer
});

export default reducers;