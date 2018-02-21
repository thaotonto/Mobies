import React from 'react';
import {Text, ImageBackground, TouchableWithoutFeedback, View} from 'react-native';
import {RatingBar} from './';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

class ItemCategory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {isClicked: false}
        this.onItemClickDelay = _.debounce(this._onPress, 1000, {
            leading: true,
            trailing: false
        });
    }

    _onPress=(item) => {
        this.props.navigation.navigate('Detail', {
            item: item
        });
    }

    render(){
        const {item} = this.props;
        imageLink = 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        return (
            <ImageBackground
                source={{uri: imageLink}} 
                style={[{backgroundColor: '#424242', width: 145, height: 199, marginLeft: 8, marginRight: 8, marginTop: 16}, this.props.style]}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.onItemClickDelay(item)}
                >
                    <LinearGradient 
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                        style={{justifyContent: 'flex-end', flex: 1}}
                    >
                        <Text 
                            numberOfLines={2} 
                            style={styles.titleTextStyle}
                        >
                            {item.title ? item.title.toUpperCase() : item.name.toUpperCase()}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Text style={{color: 'white', fontSize: 14, marginLeft: 5, marginBottom: 10, marginRight: 10}}>{item.vote_average}</Text>
                            <RatingBar 
                                style={{marginBottom: 10, marginRight: 10, marginLeft:0}}
                                rating={1}
                                disabled={true}
                                maxStars={1}
                                starSize={15}
                                emptyStarColor='#a8a8a8'
                            />
                            <Text style={{color: 'white', fontSize: 14, marginBottom: 10, marginRight: 10}}>{item.vote_count} Ratings</Text>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </ImageBackground>
        );
    }
};

const styles = {
    titleTextStyle: {
        marginLeft: 5,
        marginRight: 10,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
}

export {ItemCategory};