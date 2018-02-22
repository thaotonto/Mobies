import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_POPULAR_MOVIE, LOAD_NOW_PLAYING_MOVIE, LOAD_NOW_PLAYING_MOVIE_FAIL, LOAD_NOW_PLAYING_MOVIE_SUCCESS, LOAD_COMING_SOON_MOVIE, LOAD_COMING_SOON_MOVIE_FAIL, LOAD_COMING_SOON_MOVIE_SUCCESS, LOAD_TOP_RATED_MOVIE, LOAD_TOP_RATED_MOVIE_SUCCESS, LOAD_TOP_RATED_MOVIE_FAIL, LOAD_GENRE_MOVIE_FAIL, LOAD_GENRE_MOVIE_SUCCESS, LOAD_GENRE_MOVIE, MOVIE_GENRE_SELECTED } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true,
    loadingNowPlaying: true,
    loadingComingSoon: true,
    loadingTopRated: true,
    loadingGenre: true,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_POPULAR_MOVIE_FAIL:
            return {...state, loadingPopular: false};
        case LOAD_POPULAR_MOVIE_SUCCESS: 
            return {...state, popular: action.payload, loadingPopular: false};
        case LOAD_POPULAR_MOVIE:
            return {...state, loadingPopular: true};
        case LOAD_NOW_PLAYING_MOVIE:
            return {...state, loadingNowPlaying: true};
        case LOAD_NOW_PLAYING_MOVIE_FAIL: 
            return {...state, loadingNowPlaying: false};
        case LOAD_NOW_PLAYING_MOVIE_SUCCESS: 
            return {...state, loadingNowPlaying: false, nowPlaying: action.payload};
        case LOAD_COMING_SOON_MOVIE:
            return {...state, loadingComingSoon: true};
        case LOAD_COMING_SOON_MOVIE_FAIL: 
            return {...state, loadingComingSoon: false};
        case LOAD_COMING_SOON_MOVIE_SUCCESS: 
            return {...state, loadingComingSoon: false, comingSoon: action.payload};
        case LOAD_TOP_RATED_MOVIE:
            return {...state, loadingTopRated: true};
        case LOAD_TOP_RATED_MOVIE_FAIL: 
            return {...state, loadingTopRated: false};
        case LOAD_TOP_RATED_MOVIE_SUCCESS: 
            return {...state, loadingTopRated: false, topRated: action.payload};
        case LOAD_GENRE_MOVIE:
            return {...state, loadingGenre: true};
        case LOAD_GENRE_MOVIE_FAIL:
            return {...state, loadingGenre: false};
        case LOAD_GENRE_MOVIE_SUCCESS:
            return {...state, loadingGenre: false, genres: action.payload, selectedGenre: action.payload.genres[0].id};
        case MOVIE_GENRE_SELECTED: 
            return {...state, selectedGenre: action.payload};
        default:
            return state;
    }
}