import React from 'react';
import {ImageBackground, TouchableWithoutFeedback, Platform, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

class Header extends React.Component {
    render() {
        const {item} = this.props;
        imageLink = 'https://image.tmdb.org/t/p/w500' + item.backdrop_path;
        return (
            <View>
                
                <ImageBackground
                    source={{uri: imageLink}}
                    style={{width: null, height: 199}}
                >
                <LinearGradient 
                    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
                    style={{justifyContent: 'flex-start', height: 70}}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.goBack()}
                    >
                    <Icon name= {Platform.OS === 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={30} color="#fff" style={{marginLeft: 10}}></Icon>
                    </TouchableWithoutFeedback>
                </LinearGradient>
                </ImageBackground>
            </View>
        );
    }
}

export {Header};