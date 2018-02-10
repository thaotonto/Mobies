import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_POPULAR_MOVIE, LOAD_NOW_PLAYING_MOVIE, LOAD_NOW_PLAYING_MOVIE_FAIL, LOAD_NOW_PLAYING_MOVIE_SUCCESS } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true
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
        default:
            return state;
    }
}