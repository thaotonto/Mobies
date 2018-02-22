import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import MovieReducer from './MovieReducer';
import TVReducer from './TVReducer';
import GenreReducer from './GenreReducer';

const reducers = combineReducers({
    nav: NavReducer,
    movie: MovieReducer,
    tv: TVReducer,
    listByGenre: GenreReducer
});

export default reducers;