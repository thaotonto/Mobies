import React from 'react';
import {View, FlatList, TouchableWithoutFeedback} from 'react-native';
import CastItem from '../components/CastItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

class FullCast extends React.Component {
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
            title: 'Full Cast',
            headerRight: (
                <TouchableWithoutFeedback
                    onPress={() => {
                        debounce();
                    }}
                >
                    <MaterialIcons name="search" size={30} color="#fff" style={{marginRight: 10}}></MaterialIcons>                
                </TouchableWithoutFeedback>
            ),
            drawerLockMode: 'locked-closed'            
    }}

    _keyExtractor = (item, index) => item.credit_id;    

    _renderItem = ({item, index}) => {
        return( 
            <CastItem
                style={[{backgroundColor: index % 2 != 0 ? '#212121' : '#3d3d3d', marginTop: 8, paddingLeft: 8, paddingRight: 8, marginLeft: 8, marginRight: 8}]}
                key={item.credit_id}
                item={item}
                navigation={this.props.navigation}     
            />   
        );
    }

    render() {
        const {item} = this.props.navigation.state.params;
        return (
            <View style={{backgroundColor: '#303030', flex: 1}}>
                <FlatList
                    style={{flex: 1}}
                    data={item}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

export default FullCast;