import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text, StatusBar, SafeAreaView, ScrollView, Button, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class TVListScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerMode: 'screen',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#212121',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: 'TV Shows',
            drawerLabel: 'TV Shows',
            headerLeft: (
                <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('DrawerToggle')}}
                >
                    <Icon name="menu" size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                </TouchableWithoutFeedback>
            ),
            drawerIcon: ({ tintColor }) => (
                <Icon name="television-classic" size={24} color="#fff" ></Icon>
            ),
    }}
    onPressDetail() {
        this.props.navigation.navigate('Detail');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                
                <Button
                    onPress={this.onPressDetail.bind(this)}
                    title="Detail from TV"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
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

export default TVListScreen;