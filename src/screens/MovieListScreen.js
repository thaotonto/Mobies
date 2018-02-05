import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text, StatusBar, SafeAreaView, Platform} from 'react-native';

class MovieListScreen extends Component {
    static navigationOptions = {
        title: 'Movies',
        headerStyle: {
          backgroundColor: '#212121',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    render() {
        return (
            <SafeAreaView>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
            </SafeAreaView>
        );
    }
}

export default MovieListScreen;