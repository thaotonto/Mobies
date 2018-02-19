import { LOAD_POPULAR_TV_FAIL, LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV, LOAD_AIRING_TODAY_TV, LOAD_AIRING_TODAY_TV_FAIL, LOAD_AIRING_TODAY_TV_SUCCESS } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true,
    loadingAiringToday: true
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
        default:
            return state;
    }
}