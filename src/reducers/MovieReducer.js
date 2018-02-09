import { LOAD_POPULAR_MOVIE_FAIL, LOAD_POPULAR_MOVIE_SUCCESS, LOAD_POPULAR_MOVIE } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_POPULAR_MOVIE_FAIL:
            return {...state, errorPopular: 'Load popular movie failed', loadingPopular: false};
        case LOAD_POPULAR_MOVIE_SUCCESS: 
            return {...state, popularMovie: action.payload, errorPopular: '', loadingPopular: false};
        case LOAD_POPULAR_MOVIE:
            return {...state, errorPopular: '', loadingPopular: true};
        default:
            return state;
    }
}