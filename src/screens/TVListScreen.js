import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text, StatusBar, SafeAreaView, ScrollView, TouchableWithoutFeedback, ActivityIndicator, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LOAD_POPULAR_TV, LOAD_AIRING_TODAY_TV, LOAD_ON_AIR_TV, LOAD_TOP_RATED_TV, LOAD_GENRE_TV } from '../configs/constants';
import ViewPagerPage from '../components/ViewPagerPage';
import ListByCategory from '../components/ListByCategory';
import ListByGenre from '../components/ListByGenre';

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
        this.props.dispatch({type: LOAD_GENRE_TV});        
        this.props.dispatch({type: LOAD_POPULAR_TV});
        this.props.dispatch({type: LOAD_AIRING_TODAY_TV});
        this.props.dispatch({type: LOAD_ON_AIR_TV});
        this.props.dispatch({type: LOAD_TOP_RATED_TV});        
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

    renderAiringToday() {
        return (
            <ListByCategory
                title={'airing today'}
                loading={this.props.tv.loadingAiringToday}
                list={this.props.tv.airingToday}
                navigation={this.props.navigation}   
                itemWidth={161}                                           
            />
        );
    }

    renderOnAir() {
        return (
            <ListByCategory
                title={'on air'}
                loading={this.props.tv.loadingOnAir}
                list={this.props.tv.onAir}
                navigation={this.props.navigation}  
                itemWidth={161}              
            />
        );
    }

    renderTopRated() {
        return (
            <ListByCategory
                title={'top rated'}
                loading={this.props.tv.loadingTopRated}
                list={this.props.tv.topRated}
                navigation={this.props.navigation}  
                itemWidth={161}              
            />
        );
    }

    renderGenres() {
        return (
            <ListByGenre
                type='tv'
                list={this.props.tv.genres}
                loading={this.props.tv.loadingGenre}
                selectedGenre={this.props.tv.selectedGenre}
                navigation={this.props.navigation}  
                dispatch={this.props.dispatch}
            />
        )
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