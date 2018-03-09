import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import MovieReducer from './MovieReducer';
import TVReducer from './TVReducer';
import GenreReducer from './GenreReducer';
import PeopleReducer from './PeopleReducer';

const reducers = combineReducers({
    nav: NavReducer,
    movie: MovieReducer,
    tv: TVReducer,
    listByGenre: GenreReducer,
    people: PeopleReducer
});

export default reducers;