import { LOAD_PEOPLE, LOAD_PEOPLE_FAIL, LOAD_PEOPLE_SUCCESS, LOAD_PEOPLE_SUCCESS_MORE } from "../configs/constants";

const INITIAL_STATE = {
    loadingPeople: true,
    errorPeople: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_PEOPLE: 
            if (action.payload === 1)
                return {...state, loadingPeople: true, errorPeople: false};
            else return state;
        case LOAD_PEOPLE_FAIL:
            return {...state, loadingPeople: false, errorPeople: true};
        case LOAD_PEOPLE_SUCCESS:
            return {...state, loadingPeople: false, people: action.payload.results, errorPeople: false};
        case LOAD_PEOPLE_SUCCESS_MORE:
            return {...state, loadingPeople: false, people: state.people.concat(action.payload.results), errorPeople: false}
        default: 
            return state;
    }
} 