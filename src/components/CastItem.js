import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback, ImageBackground} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { fetchDetail } from '../networks/fetchData';

class CastItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            detail: ''
        }
        this.onItemClickDelay = _.debounce(this.searchItem, 1000, {
            leading: true,
            trailing: false
        });
    }

    _onPress=(detail) => {
        this.props.navigation.navigate('Detail', {
            item: detail
        });
    };

    searchItem(item) {
        link = decodeURI(`https://api.themoviedb.org/3/search/person?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&query=${item.name}&page=1&include_adult=false`); 
        
        fetchDetail(link).then((results) => {
            detail = results.results.filter((result) => {
                return result.id == item.id;
            });
            if (detail.length != 0)
                this._onPress(detail[0]);
        });
    }

    render() {
        const {item} = this.props;        
        imageLink = 'https://image.tmdb.org/t/p/w500' + item.profile_path;
        return (
            <TouchableWithoutFeedback
                    onPress={() => this.onItemClickDelay(item)}
                >
                    <View 
                        style={[{flexDirection: 'row', alignItems: 'center',padding: 8}, this.props.style]}
                    >
                        <ImageBackground
                            defaultSource={require('../../assets/no_image_person_u_final_2.png')}     
                            source={{uri: imageLink}} 
                            resizeMode='cover'
                            style={[{width: 50, height: 70}]}
                        >
                            <LinearGradient 
                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                                style={{flex: 1}}
                            >
                            </LinearGradient>
                        </ImageBackground>
                        <Text style={{marginRight: 8, marginLeft: 8, color: '#cdcdcd', fontSize: 12}}>{item.name}</Text>
                        <View style={{marginRight: 8, flex: 1}}>
                            <Text style={{color: '#cdcdcd', fontSize: 12}} numberOfLines={2} >{item.character}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        );
    }
}

export default CastItem;