import { LOAD_POPULAR_TV_FAIL, LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV, LOAD_AIRING_TODAY_TV, LOAD_AIRING_TODAY_TV_FAIL, LOAD_AIRING_TODAY_TV_SUCCESS, LOAD_ON_AIR_TV, LOAD_ON_AIR_TV_FAIL, LOAD_ON_AIR_TV_SUCCESS, LOAD_TOP_RATED_TV, LOAD_TOP_RATED_TV_FAIL, LOAD_TOP_RATED_TV_SUCCESS, TV_GENRE_SELECTED, LOAD_GENRE_TV, LOAD_GENRE_TV_FAIL, LOAD_GENRE_TV_SUCCESS } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true,
    loadingAiringToday: true,
    loadingTopRated: true,
    loadingOnAir: true,
    loadingGenre: true,
    errorPopular: false,
    errorAiringToday: false,
    errorOnAir: false,
    errorGenres: false,
    errorTopRated: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_POPULAR_TV_FAIL:
            return {...state, loadingPopular: false, errorPopular: true};
        case LOAD_POPULAR_TV_SUCCESS: 
            return {...state, popular: action.payload, loadingPopular: false, errorPopular: false};
        case LOAD_POPULAR_TV:
            return {...state, loadingPopular: true, errorPopular: false};
        case LOAD_AIRING_TODAY_TV:
            return {...state, loadingAiringToday: true, errorAiringToday: false};
        case LOAD_AIRING_TODAY_TV_FAIL:
            return {...state, loadingAiringToday: false, errorAiringToday: true};
        case LOAD_AIRING_TODAY_TV_SUCCESS: 
            return {...state, loadingAiringToday: false, airingToday: action.payload, errorAiringToday: false};
        case LOAD_ON_AIR_TV:
            return {...state, loadingOnAir: true, errorOnAir: false};
        case LOAD_ON_AIR_TV_FAIL: 
            return {...state, loadingOnAir: false, errorOnAir: true};
        case LOAD_ON_AIR_TV_SUCCESS: 
            return {...state, loadingOnAir: false, onAir: action.payload, errorOnAir: false};
        case LOAD_TOP_RATED_TV:
            return {...state, loadingTopRated: true, errorTopRated: false};
        case LOAD_TOP_RATED_TV_FAIL: 
            return {...state, loadingTopRated: false, errorTopRated: true};
        case LOAD_TOP_RATED_TV_SUCCESS: 
            return {...state, loadingTopRated: false, topRated: action.payload, errorTopRated: false};
        case LOAD_GENRE_TV:
            return {...state, loadingGenre: true, errorGenres: false};
        case LOAD_GENRE_TV_FAIL:
            return {...state, loadingGenre: false, errorGenres: true};
        case LOAD_GENRE_TV_SUCCESS:
            return {...state, loadingGenre: false, genres: action.payload, selectedGenre: action.payload.genres[0].id, errorGenres: false};
        case TV_GENRE_SELECTED: 
            return {...state, selectedGenre: action.payload};
        default:
            return state;
    }
}