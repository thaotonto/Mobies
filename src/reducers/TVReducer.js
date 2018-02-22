import { LOAD_POPULAR_TV_FAIL, LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV, LOAD_AIRING_TODAY_TV, LOAD_AIRING_TODAY_TV_FAIL, LOAD_AIRING_TODAY_TV_SUCCESS, LOAD_ON_AIR_TV, LOAD_ON_AIR_TV_FAIL, LOAD_ON_AIR_TV_SUCCESS, LOAD_TOP_RATED_TV, LOAD_TOP_RATED_TV_FAIL, LOAD_TOP_RATED_TV_SUCCESS, TV_GENRE_SELECTED, LOAD_GENRE_TV, LOAD_GENRE_TV_FAIL, LOAD_GENRE_TV_SUCCESS } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true,
    loadingAiringToday: true,
    loadingTopRated: true,
    loadingOnAir: true,
    loadingGenre: true
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_POPULAR_TV_FAIL:
            return {...state, loadingPopular: false};
        case LOAD_POPULAR_TV_SUCCESS: 
            return {...state, popular: action.payload, loadingPopular: false};
        case LOAD_POPULAR_TV:
            return {...state, loadingPopular: true};
        case LOAD_AIRING_TODAY_TV:
            return {...state, loadingAiringToday: true};
        case LOAD_AIRING_TODAY_TV_FAIL:
            return {...state, loadingAiringToday: false};
        case LOAD_AIRING_TODAY_TV_SUCCESS: 
            return {...state, loadingAiringToday: false, airingToday: action.payload};
        case LOAD_ON_AIR_TV:
            return {...state, loadingOnAir: true};
        case LOAD_ON_AIR_TV_FAIL: 
            return {...state, loadingOnAir: false};
        case LOAD_ON_AIR_TV_SUCCESS: 
            return {...state, loadingOnAir: false, onAir: action.payload};
        case LOAD_TOP_RATED_TV:
            return {...state, loadingTopRated: true};
        case LOAD_TOP_RATED_TV_FAIL: 
            return {...state, loadingTopRated: false};
        case LOAD_TOP_RATED_TV_SUCCESS: 
            return {...state, loadingTopRated: false, topRated: action.payload};
        case LOAD_GENRE_TV:
            return {...state, loadingGenre: true};
        case LOAD_GENRE_TV_FAIL:
            return {...state, loadingGenre: false};
        case LOAD_GENRE_TV_SUCCESS:
            return {...state, loadingGenre: false, genres: action.payload, selectedGenre: action.payload.genres[0].id};
        case TV_GENRE_SELECTED: 
            return {...state, selectedGenre: action.payload};
        default:
            return state;
    }
}