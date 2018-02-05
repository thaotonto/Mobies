import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text} from 'react-native';

class DetailScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                

            </SafeAreaView>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#303030',
        flex: 1
    }
};

export default DetailScreen;