import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/configs/configureStore';
import Router from './src/screens/Router';

const {store} = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}