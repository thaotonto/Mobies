import React, {Component} from 'react';
import {View, StatusBar, Platform, TouchableWithoutFeedback, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import SInfo from 'react-native-sensitive-info';
import ItemWatchList from '../components/ItemWatchList';

class WatchList extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            bookmarked: false
        }
    }

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
            title: 'WatchList',
            drawerLabel: 'Watch List',
            headerLeft: (
                <TouchableWithoutFeedback
                    onPress={() => {navigation.navigate('DrawerOpen')}}
                >
                    <Icon name="menu" size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                </TouchableWithoutFeedback>
            ),
            drawerIcon: ({ tintColor }) => (
                <Icon name='bookmark' size={24} color="#fff"></Icon>
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

    componentDidMount() {
        SInfo.deleteItem('', {});
        
        SInfo.getAllItems({}).then(values => {
            this.setState(state => {
                return {bookmarked: _.drop(values[0], 1)};
            })
        });
    }

    _keyExtractor = (item, index) => item.key;

    onRemove(id) {
        SInfo.deleteItem(`${id}`, {});
        console.log(_.filter(this.state.bookmarked, (value) => {
            return value.key != id;
        }));
        
        this.setState(state => {
            return {bookmarked: _.filter(state.bookmarked, (value) => {
                return value.key != id;
            })};
        })
    }

    _renderItem = ({item}) => {
        return( 
            <ItemWatchList
                item={JSON.parse(item.value)}
                navigation={this.props.navigation}
                onRemove={this.onRemove.bind(this)}
            />
        );
    }

    render() {
        console.log(this.state.bookmarked);
        return (
            <View style={{flex: 1, backgroundColor: '#303030'}}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                {this.state.bookmarked === false ? null : 
                <FlatList
                    data={this.state.bookmarked}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    extraData={this.state}
                />}
                
            </View>
        );
    }
}

export default WatchList;
