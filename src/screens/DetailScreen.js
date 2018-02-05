import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text} from 'react-native';

class DetailScreen extends Component {
    static navigationOptions = {
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
            <View>
                <Text> DetailScreen </Text>
            </View>
        );
    }
}

export default DetailScreen;