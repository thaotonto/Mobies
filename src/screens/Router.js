import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {addListener} from '../utils/Redux';
import { BackHandler } from "react-native";

//Screen
import DetailScreen from './DetailScreen';
import MovieListScreen from './MovieListScreen';

//---------------------------------------
export const AppNavigator = StackNavigator({
    MovieList: {screen: MovieListScreen, navigationOptions: {title: 'Movies'}},
    Detail: {screen: DetailScreen}
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#212121',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
});

class Router extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
          return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener })} />
        );
    }
}
    
const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(Router);