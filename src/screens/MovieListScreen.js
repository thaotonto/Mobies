import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {StatusBar, SafeAreaView, ScrollView, TouchableWithoutFeedback, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LOAD_POPULAR_MOVIE, LOAD_NOW_PLAYING_MOVIE, LOAD_COMING_SOON_MOVIE, LOAD_TOP_RATED_MOVIE, LOAD_GENRE_MOVIE } from '../configs/constants';
import ViewPagerPage from '../components/ViewPagerPage';
import ListByCategory from '../components/ListByCategory';
import _ from 'lodash';
import ListByGenre from '../components/ListByGenre';
import SInfo from 'react-native-sensitive-info';
import { fetchDetail } from '../networks/fetchData';


class MovieListScreen extends Component {
    
    static navigationOptions = ({navigation}) => {
        var debounce = _.debounce(navigateSearch, 1000, {
            leading: true,
            trailing: false
        })

        function navigateSearch() {
            navigation.navigate('Search');
        }
        
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
                    onPress={() => {navigation.navigate('DrawerOpen')}}
                >
                    <Icon name="menu" size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                </TouchableWithoutFeedback>
            ),
            drawerIcon: ({ tintColor }) => (
                <Icon name="movie-roll" size={24} color="#fff"></Icon>
            ),
            headerRight: (
                <TouchableWithoutFeedback
                    onPress={() => {
                        debounce();
                    }}
                >
                    <MaterialIcons name="search" size={30} color="#fff" style={{marginRight: 10}}></MaterialIcons>                
                </TouchableWithoutFeedback>
            ),
    }}
    
    componentDidMount(){
        this.props.dispatch({type: LOAD_GENRE_MOVIE});
        this.props.dispatch({type: LOAD_POPULAR_MOVIE});
        this.props.dispatch({type: LOAD_NOW_PLAYING_MOVIE});
        this.props.dispatch({type: LOAD_COMING_SOON_MOVIE});
        this.props.dispatch({type: LOAD_TOP_RATED_MOVIE}); 

        SInfo.getItem('guest_id',{}).then(value => {
            if (value === undefined || value === null) {
                fetchDetail(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=edf1f4d5b56b3b1d9454f2b090695246`).then((session) => {
                    SInfo.setItem('guest_id', session.guest_session_id, {});
                });
            } 
        });
    }

    renderPopular() {
        if(!this.props.movie.errorPopular)
            return (
                <ViewPagerPage 
                    loading={this.props.movie.loadingPopular}
                    list={this.props.movie.popular}
                    navigation={this.props.navigation}
                />
            );    
        else return null;
    }

    renderNowPlaying() {
        if(!this.props.movie.errorNowPlaying)
            return (
                <ListByCategory
                    title={'Now Playing'}
                    loading={this.props.movie.loadingNowPlaying}
                    list={this.props.movie.nowPlaying}
                    navigation={this.props.navigation}  
                    itemWidth={161}              
                />
            );
        else return null;
    }

    renderComingSoon() {
        if(!this.props.movie.errorComingSoon)
            return (
                <ListByCategory
                    title={'coming soon'}
                    loading={this.props.movie.loadingComingSoon}
                    list={this.props.movie.comingSoon}
                    navigation={this.props.navigation}  
                    itemWidth={161}              
                />
            );
        else return null;
    }

    renderTopRated() {
        if(!this.props.movie.errorTopRated)
            return (
                <ListByCategory
                    title={'top rated'}
                    loading={this.props.movie.loadingTopRated}
                    list={this.props.movie.topRated}
                    navigation={this.props.navigation}  
                    itemWidth={161}              
                />
            );
        else return null;
    }

    renderGenres() {
        if(!this.props.movie.errorGenres)
            return (
                <ListByGenre
                    type='movie'
                    list={this.props.movie.genres}
                    loading={this.props.movie.loadingGenre}
                    selectedGenre={this.props.movie.selectedGenre}
                    dispatch={this.props.dispatch}
                    navigation={this.props.navigation}  
                />
            );
        else return null;        
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
                    {this.renderGenres()}
                    {this.renderNowPlaying()}
                    {this.renderComingSoon()}
                    {this.renderTopRated()}
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