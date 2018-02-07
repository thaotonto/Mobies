import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../screens/Router';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MovieList' })]
}));

export default nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}