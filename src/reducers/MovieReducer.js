import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_POPULAR_MOVIE, LOAD_NOW_PLAYING_MOVIE, LOAD_NOW_PLAYING_MOVIE_FAIL, LOAD_NOW_PLAYING_MOVIE_SUCCESS, LOAD_COMING_SOON_MOVIE, LOAD_COMING_SOON_MOVIE_FAIL, LOAD_COMING_SOON_MOVIE_SUCCESS, LOAD_TOP_RATED_MOVIE, LOAD_TOP_RATED_MOVIE_SUCCESS, LOAD_TOP_RATED_MOVIE_FAIL, LOAD_GENRE_MOVIE_FAIL, LOAD_GENRE_MOVIE_SUCCESS, LOAD_GENRE_MOVIE, MOVIE_GENRE_SELECTED } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true,
    loadingNowPlaying: true,
    loadingComingSoon: true,
    loadingTopRated: true,
    loadingGenre: true,
    errorPopular: false,
    errorNowPlaying: false,
    errorComingSoon: false,
    errorTopRated: false,
    errorGenres: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_POPULAR_MOVIE_FAIL:
            return {...state, loadingPopular: false, errorPopular: true};
        case LOAD_POPULAR_MOVIE_SUCCESS: 
            return {...state, popular: action.payload, loadingPopular: false, errorPopular: false};
        case LOAD_POPULAR_MOVIE:
            return {...state, loadingPopular: true, errorPopular: false};
        case LOAD_NOW_PLAYING_MOVIE:
            return {...state, loadingNowPlaying: true, errorNowPlaying: false};
        case LOAD_NOW_PLAYING_MOVIE_FAIL: 
            return {...state, loadingNowPlaying: false, errorNowPlaying: true};
        case LOAD_NOW_PLAYING_MOVIE_SUCCESS: 
            return {...state, loadingNowPlaying: false, nowPlaying: action.payload, errorNowPlaying: false};
        case LOAD_COMING_SOON_MOVIE:
            return {...state, loadingComingSoon: true, errorComingSoon: false};
        case LOAD_COMING_SOON_MOVIE_FAIL: 
            return {...state, loadingComingSoon: false, errorComingSoon: true};
        case LOAD_COMING_SOON_MOVIE_SUCCESS: 
            return {...state, loadingComingSoon: false, comingSoon: action.payload, errorComingSoon: false};
        case LOAD_TOP_RATED_MOVIE:
            return {...state, loadingTopRated: true, errorTopRated: false};
        case LOAD_TOP_RATED_MOVIE_FAIL: 
            return {...state, loadingTopRated: false, errorTopRated: true};
        case LOAD_TOP_RATED_MOVIE_SUCCESS: 
            return {...state, loadingTopRated: false, topRated: action.payload, errorTopRated: false};
        case LOAD_GENRE_MOVIE:
            return {...state, loadingGenre: true, errorGenres: false};
        case LOAD_GENRE_MOVIE_FAIL:
            return {...state, loadingGenre: false, errorGenres: true};
        case LOAD_GENRE_MOVIE_SUCCESS:
            return {...state, loadingGenre: false, genres: action.payload, selectedGenre: action.payload.genres[0].id, errorGenres: false};
        case MOVIE_GENRE_SELECTED: 
            return {...state, selectedGenre: action.payload};
        default:
            return state;
    }
}