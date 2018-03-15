import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback, ImageBackground} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { fetchDetail } from '../networks/fetchData';

class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            detail: ''
        }
        this.onItemClickDelay = _.debounce(this._onPress, 1000, {
            leading: true,
            trailing: false
        });
    }

    _onPress=(item) => {
        this.props.navigation.navigate('Detail', {
            item: item
        });
    };

    render() {
        const {item} = this.props;        
        imageLink = item.profile_path ? 'https://image.tmdb.org/t/p/w500' + item.profile_path : 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        
        return (
            <TouchableWithoutFeedback
                    onPress={() => this.onItemClickDelay(item)}
                >
                    <View 
                        style={[{flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8, marginRight: 8}, this.props.style]}
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
                        <View style={{marginRight: 16, marginLeft: 16, flex: 1}}>
                            <Text style={{marginBottom: 8, color: 'white', fontSize: 20}} numberOfLines={2}>{item.name ? item.name : item.title}</Text>
                            <Text style={{color: '#cdcdcd', fontSize: 12}}>{item.media_type.toUpperCase()}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        );
    }
}

export default SearchItem;