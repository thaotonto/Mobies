import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import YouTube from 'react-native-youtube';

class TrailerScreen extends Component {
    static navigationOptions = ({navigation}) => {
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
            title: '',
            drawerLockMode: 'locked-closed'  
        }
    }

    render() {
        const {item} = this.props.navigation.state.params;
        console.log(item);
        return (
            <View>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />

                <YouTube
                    apiKey='AIzaSyB9zrN4FoPatH4HyoHf2SS8PND57t3Z8rk'
                    videoId={item}   // The YouTube video ID
                    play={true}             // control playback of video with true/false
                    fullscreen={true}       // control whether the video should play in fullscreen or inline
                    loop={false}             // control whether the video should loop when ended

                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}

                    style={{ alignSelf: 'stretch', height: 300 }}
                />
            </View>
        );
    }
}

export default TrailerScreen;
