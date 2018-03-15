import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text, StatusBar, SafeAreaView, ScrollView, TouchableWithoutFeedback, ActivityIndicator, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LOAD_POPULAR_TV, LOAD_AIRING_TODAY_TV, LOAD_ON_AIR_TV, LOAD_TOP_RATED_TV, LOAD_GENRE_TV } from '../configs/constants';
import ViewPagerPage from '../components/ViewPagerPage';
import ListByCategory from '../components/ListByCategory';
import ListByGenre from '../components/ListByGenre';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class TVListScreen extends Component {
    static navigationOptions = ({navigation}) => {
        var debounce = _.debounce(navigateSearch, 1000, {
            leading: true,
            trailing: false
        })

        function navigateSearch() {
            navigation.navigate('Search');
        }

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
                    onPress={() => {navigation.navigate('DrawerOpen')}}
                >
                    <Icon name="menu" size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                </TouchableWithoutFeedback>
            ),
            drawerIcon: ({ tintColor }) => (
                <Icon name="television-classic" size={24} color="#fff" ></Icon>
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
        this.props.dispatch({type: LOAD_GENRE_TV});        
        this.props.dispatch({type: LOAD_POPULAR_TV});
        this.props.dispatch({type: LOAD_AIRING_TODAY_TV});
        this.props.dispatch({type: LOAD_ON_AIR_TV});
        this.props.dispatch({type: LOAD_TOP_RATED_TV});        
    }

    renderPopular() {
        if(!this.props.tv.errorPopular)
            return (
                <ViewPagerPage 
                    loading={this.props.tv.loadingPopular}
                    list={this.props.tv.popular}
                    navigation={this.props.navigation}
                />
            );
        else return null;
    }

    renderAiringToday() {
        if(!this.props.tv.errorAiringToday)
            return (
                <ListByCategory
                    title={'airing today'}
                    loading={this.props.tv.loadingAiringToday}
                    list={this.props.tv.airingToday}
                    navigation={this.props.navigation}   
                    itemWidth={161}                                           
                />
            );
        else return null;
    }

    renderOnAir() {
        if(!this.props.tv.errorOnAir)
            return (
                <ListByCategory
                    title={'on air'}
                    loading={this.props.tv.loadingOnAir}
                    list={this.props.tv.onAir}
                    navigation={this.props.navigation}  
                    itemWidth={161}              
                />
            );
        else return null;
    }

    renderTopRated() {
        if(!this.props.tv.errorTopRated)
            return (
                <ListByCategory
                    title={'top rated'}
                    loading={this.props.tv.loadingTopRated}
                    list={this.props.tv.topRated}
                    navigation={this.props.navigation}  
                    itemWidth={161}              
                />
            );
        else return null;
    }

    renderGenres() {
        if(!this.props.tv.errorGenres)
            return (
                <ListByGenre
                    type='tv'
                    list={this.props.tv.genres}
                    loading={this.props.tv.loadingGenre}
                    selectedGenre={this.props.tv.selectedGenre}
                    navigation={this.props.navigation}  
                    dispatch={this.props.dispatch}
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

                <ScrollView style={{flex: 1}}>
                    {this.renderPopular()}
                    {this.renderGenres()}
                    {this.renderAiringToday()}
                    {this.renderOnAir()}
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
    tv: state.tv
});

export default connect(mapStateToProps)(TVListScreen);