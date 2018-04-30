import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, ImageBackground, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

class ItemWatchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        }
        this.onItemClickDelay = _.debounce(this._onPressItem, 1000, {
            leading: true,
            trailing: false
        });
    }

    _onPressItem = (item) => {
        this.props.navigation.navigate('Detail', {
            item: item
        })
    };

    onRemove() {
        this.props.onRemove(this.props.item.id);
    }

    render () {
        const {item} = this.props;        
        imageLink = 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={() => this.onItemClickDelay(item)}
                >
                    <View 
                        style={[{flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8, marginRight: 8, backgroundColor: '#212121', flex: 1}, this.props.style]}
                    >
                        
                        <ImageBackground
                            defaultSource={require('../../assets/no_image_movie_tv_portrait_final.png')}     
                            source={{uri: imageLink}} 
                            resizeMode='cover'
                            style={[{width: 70, height: 100}]}
                        >
                            <LinearGradient 
                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                                style={{flex: 1}}
                            >
                            </LinearGradient>
                        </ImageBackground>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={{marginRight: 16, marginLeft: 16}}>
                                <Text style={{marginBottom: 8, color: 'white', fontSize: 20}} numberOfLines={2}>{item.name ? item.name : item.title}</Text>
                                <Text style={{color: '#cdcdcd', fontSize: 12}}>{item.title ? 'MOVIE' : 'TV'}</Text> 
                                <Text style={{color: '#cdcdcd', fontSize: 12, marginTop: 6}}>{item.release_date ? item.release_date : item.first_air_date}</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                                    onPress={() => this.onRemove()}
                            >
                                <MaterialIcons name="bookmark-remove" size={24} color="#ff9900" style={{right: 8, position: 'absolute', top: 8, alignSelf: 'flex-end', justifyContent:'flex-start'}}></MaterialIcons>                
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default ItemWatchList;
