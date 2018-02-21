import React, {Component} from 'react';
import {ViewPager} from 'rn-viewpager';
import {View, Text, Image, ImageBackground, Platform, ActivityIndicator, TouchableWithoutFeedback, FlatList} from 'react-native';
import {RatingBar} from '../components/common';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

class ViewPagerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {isClicked: false}
        this.onItemClickDelay = _.debounce(this.onItemClick, 1000, {
            leading: true,
            trailing: false
        });
    }

    onItemClick(item) {
        this.props.navigation.navigate('Detail', {
            item: item
        });
    }

    renderItem({navigation}) {
        return this.props.list.results.map(item => {
            imageLink = 'https://image.tmdb.org/t/p/w500' + item.backdrop_path;
            return (
                <View key = {item.id}>
                    <ImageBackground 
                        source={{uri: imageLink}} 
                        style={{backgroundColor: 'transparent', width: null, height: 199}}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.onItemClickDelay(item);
                            }}
                        >
                            <LinearGradient 
                                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                                style={{justifyContent: 'flex-end', flex: 1}}>
                                <View style={styles.titleStyle}>
                                    <Text style={styles.titleTextStyle}>{item.title ? item.title.toUpperCase() : item.name.toUpperCase()}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <RatingBar 
                                            rating={Math.round(item.vote_average) / 2 }
                                            disabled={true}
                                            maxStars={5}
                                            starSize={20}
                                            emptyStarColor='#a8a8a8'
                                        />
                                        <Text style={{color: 'white', fontSize: 16}}>{item.vote_count} Ratings</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                </View>
            );
        });
    }

    render () {
        if (this.props.loading === false) {
            return (
                <View style={styles.viewPagerStyle}>
                    <ViewPager
                        style={{height:200, flex: 1, overflow: 'hidden'}}
                    >
                        {this.renderItem({navigation: this.props.navigation})}
                    </ViewPager>
                </View>
            );
        } else {
            return (
                <ActivityIndicator style={{margin: 8}} size='large' color='#ff9900'/>
            );
        }
    }
}

const styles = {
    container: {
        flex: 1
    },
    viewPagerStyle: {
        height: 200,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: Platform.OS === 'ios' ? 0 : 8,
        marginRight: Platform.OS === 'ios' ? 0 : 8,
        paddingRight: Platform.OS === 'ios' ? 8 : 0,
        paddingLeft: Platform.OS === 'ios' ? 8 : 0
    },
    titleTextStyle: {
        marginLeft: 16,
        marginRight: 16,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleStyle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    }
}

export default ViewPagerPage;