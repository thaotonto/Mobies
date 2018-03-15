import { StackNavigator, addNavigationHelpers, DrawerNavigator, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {addListener} from '../utils/Redux';
import { BackHandler } from "react-native";
import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';

//Screen
import DetailScreen from './DetailScreen';
import MovieListScreen from './MovieListScreen';
import TVListScreen from './TVListScreen';
import PeopleListScreen from './PeopleListScreen';
import FullCast from './FullCast';
import SearchScreen from './SearchScreen';

//---------------------------------------
const MovieListStack = StackNavigator({
    MovieList: {
        screen: MovieListScreen
    },
    Detail: {
        screen: DetailScreen
    },
    FullCast: {
        screen: FullCast
    },
    Search: {
        screen: SearchScreen
    }
});

const TVListStack = StackNavigator({
    TVList: {
        screen: TVListScreen
    },
    Detail: {
        screen: DetailScreen
    },
    FullCast: {
        screen: FullCast
    },
    Search: {
        screen: SearchScreen
    }
});

const PeopleListStack = StackNavigator({
    PeopleList: {
        screen: PeopleListScreen
    },
    Detail: {
        screen: DetailScreen
    },
    FullCast: {
        screen: FullCast
    },
    Search: {
        screen: SearchScreen
    }
});

export const AppNavigator = DrawerNavigator({
    MovieListNavigator: {
        screen: MovieListStack, 
    },
    TVListNavigator: {
        screen: TVListStack
    },
    PeopleListNavigator: {
        screen: PeopleListStack
    }
},
{   
    drawerBackgroundColor: "#303030",    
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        activeBackgroundColor: '#212121'
    }
    
});

class Router extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress.bind(this));
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes[0].routes.filter((route) => {
            return route.index !== 0
        }).length !== 0) {
            dispatch(NavigationActions.back());
            return true;
        }
        return false;
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