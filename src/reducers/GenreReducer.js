import { LOAD_TV_BY_GENRE, LOAD_TV_BY_GENRE_SUCCESS, LOAD_TV_BY_GENRE_FAIL, LOAD_MOVIE_BY_GENRE, LOAD_MOVIE_BY_GENRE_FAIL, LOAD_MOVIE_BY_GENRE_SUCCESS } from "../configs/constants";

const INITIAL_STATE = {
    loadingGenres: true
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_TV_BY_GENRE:
            return {...state, loadingGenres: true };
        case LOAD_TV_BY_GENRE_SUCCESS:
            return {...state, loadingGenres: false, byGenre: action.payload};
        case LOAD_TV_BY_GENRE_FAIL:
            return {...state, loadingGenres: false};
        case LOAD_MOVIE_BY_GENRE:
            return {...state, loadingGenres: true };
        case LOAD_MOVIE_BY_GENRE_SUCCESS:
            return {...state, loadingGenres: false, byGenre: action.payload};
        case LOAD_MOVIE_BY_GENRE_FAIL:
            return {...state, loadingGenres: false};
        default: 
            return state;
    }
}