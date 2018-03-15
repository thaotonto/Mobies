import React from 'react';
import {FlatList, TouchableWithoutFeedback, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LOAD_PEOPLE } from '../configs/constants';
import PeopleItem from '../components/PeopleItem';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class PeopleListScreen extends React.Component {
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
            title: 'Popular Celebrites',
            drawerLabel: 'People',
            headerLeft: (
                <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('DrawerOpen')}}
                >
                    <Icon name="menu" size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                </TouchableWithoutFeedback>
            ),
            drawerIcon: ({ tintColor }) => (
                <Icon name="account-multiple" size={24} color="#fff"></Icon>
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

    constructor(props) {
        super(props);
        this.state = {page: 1}
        this.onLoadEndDelay = _.debounce(this.OnLoadEnd, 1000, {
            leading: true,
            trailing: false
        });
    }

    OnLoadEnd() {
        this.setState(state => {return {page: state.page + 1}}, () => {
            this.props.dispatch({type: LOAD_PEOPLE, payload: this.state.page});
        })
    }

    componentDidMount() {
        this.props.dispatch({type: LOAD_PEOPLE, payload: this.state.page});
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        this.props.navigation.navigate('Detail', {
            item: item
        });
    };

    _renderItem = ({item}) => {
        return( 
            <PeopleItem
                item={item}
                onPressItem={this._onPressItem}
            />
        );
    }

    renderPeople() {
        if (!this.props.people.loadingPeople) {
            return (
                <FlatList
                    style={{flex: 1}}
                    data={this.props.people.people}
                    extraData={this.state}
                    numColumns={2}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0.5}
                    onEndReached={({ distanceFromEnd }) => {
                        if (distanceFromEnd > 0) {
                            this.onLoadEndDelay()
                        }
                    }}
                />
            )
        } else return (
            <ActivityIndicator style={{margin: 8}} size='large' color='#ff9900'/>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                {this.renderPeople()}  
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
    people: state.people
});

export default connect(mapStateToProps)(PeopleListScreen);