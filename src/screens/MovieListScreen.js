import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {StatusBar, SafeAreaView, ScrollView, TouchableWithoutFeedback, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LOAD_POPULAR_MOVIE, LOAD_NOW_PLAYING_MOVIE } from '../configs/constants';
import ViewPagerPage from '../components/ViewPagerPage';
import ListByCategory from '../components/ListByCategory';

class MovieListScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerMode:'screen',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#212121',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            title: 'Movies',
            drawerLabel: 'Movies',
            headerLeft: (
                <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('DrawerToggle')}}
                >
                    <Icon name="menu" size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                </TouchableWithoutFeedback>
            ),
            drawerIcon: ({ tintColor }) => (
                <Icon name="movie-roll" size={24} color="#fff"></Icon>
              ),
    }}
    
    componentDidMount(){
        this.props.dispatch({type: LOAD_POPULAR_MOVIE});
        this.props.dispatch({type: LOAD_NOW_PLAYING_MOVIE})
    }

    renderPopular() {
        return (
            <ViewPagerPage 
                loading={this.props.movie.loadingPopular}
                list={this.props.movie.popular}
                navigation={this.props.navigation}
            />
        );    
    }

    renderNowPlaying() {
        return (
            <ListByCategory
                title={'Now Playing'}
                loading={this.props.movie.loadingNowPlaying}
                list={this.props.movie.nowPlaying}
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

                <ScrollView 
                    style={{flex: 1}}
                >
                    {this.renderPopular()}
                    {this.renderNowPlaying()}
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
    movie: state.movie
});

export default connect(mapStateToProps)(MovieListScreen);