import { LOAD_POPULAR_TV_FAIL, LOAD_POPULAR_TV_SUCCESS, LOAD_POPULAR_TV } from "../configs/constants";

const INITIAL_STATE = {
    loadingPopular: true
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_POPULAR_TV_FAIL:
            return {...state, errorPopular: 'Load popular tv failed', loadingPopular: false};
        case LOAD_POPULAR_TV_SUCCESS: 
            return {...state, popular: action.payload, errorPopular: '', loadingPopular: false};
        case LOAD_POPULAR_TV:
            return {...state, errorPopular: '', loadingPopular: true};
        default:
            return state;
    }
}