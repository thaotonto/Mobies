import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text, StatusBar, SafeAreaView, ScrollView, TouchableWithoutFeedback, ActivityIndicator, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LOAD_POPULAR_TV } from '../configs/constants';
import ViewPagerPage from '../components/ViewPagerPage';

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
    
    componentDidMount(){
        this.props.dispatch({type: LOAD_POPULAR_TV});
    }

    renderPopular() {
        return (
            <ViewPagerPage 
                loading={this.props.tv.loadingPopular}
                list={this.props.tv.popular}
                navigation={this.props.navigation}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />

                <ScrollView style={{flex: 1}}>
                    {this.renderPopular()}
                </ScrollView>

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

const mapStateToProps = state => ({
    nav: state.nav,
    tv: state.tv
});

export default connect(mapStateToProps)(TVListScreen);