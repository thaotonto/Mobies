import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {View, Text, ScrollView, StatusBar, Platform, ImageBackground, Dimensions, Image, TouchableOpacity, Animated, TouchableWithoutFeedback} from 'react-native';
import {RatingBar, InfoSection} from '../components/common';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchDetail } from '../networks/fetchData';
import _ from 'lodash';
import ListByCategory from '../components/ListByCategory';
import LinearGradient from 'react-native-linear-gradient';
import CastItem from '../components/CastItem';
import PopupDialog, {DialogButton} from 'react-native-popup-dialog';
import SInfo from 'react-native-sensitive-info';
import Toast, {DURATION} from 'react-native-easy-toast'

const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 0 });
const NAVBAR_HEIGHT = Platform.OS === 'ios' ? STATUS_BAR_HEIGHT + 44 : 58;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class DetailScreen extends Component {
    constructor(props) {
        super(props);        
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
    
        this.state = {
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                scrollAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                }),
                offsetAnim,
                ),
                0,
                NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
            ),
            detail: '',
            cast: '',
            similar: '',
            person: '',
            isClicked: false,
            isClickedTrailer: false,
            starCount: 0.5,
            isRated: false,
            isBookmarked: false
        };
        this.onItemClickDelay = _.debounce(this._onPress, 1000, {
            leading: true,
            trailing: false
        });

        // this.onTrailerClickDelay = _.debounce(this._onPressTrailer, 1000, {
        //     leading: true,
        //     trailing: false
        // });

        this.onRateClickDelay = _.debounce(this._onPressRate, 1000, {
            leading: true,
            trailing: false
        });

        this.onBookmardClickDelay = _.debounce(this._onPressBookmark, 1000, {
            leading: true,
            trailing: false
        });
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            drawerLockMode: 'locked-closed'
        }
    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
        
      }

    _onPress=(item) => {
        this.props.navigation.navigate('FullCast', {
            item: item
        });
    };

    // _onPressTrailer=(item) => {
    //     this.props.navigation.navigate('Trailer', {
    //         item: item
    //     });
    // };

    _onPressRate=(item) => {
        this.popupDialog.show();
    };

    _onPressBookmark=(item) => {
        if (this.state.isBookmarked) {
            this.refs.toast.show('Added to Watchlist');
        } else {
            this.setState(state => {
                return {isBookmarked: true}
            });
            SInfo.setItem(`${item.id}`, JSON.stringify(item), {});
        }
    };

    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;

    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    _onScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
    };
    
    _onMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };
    
    _onMomentumScrollEnd = () => {
        const toValue = this._scrollValue > NAVBAR_HEIGHT &&
            this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
            ? this._offsetValue + NAVBAR_HEIGHT
            : this._offsetValue - NAVBAR_HEIGHT;

        Animated.timing(this.state.offsetAnim, {
            toValue,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };

    componentDidMount() {
        this.state.scrollAnim.addListener(({ value }) => {
            const diff = value - this._scrollValue;
            this._scrollValue = value;
            this._clampedScrollValue = Math.min(
              Math.max(this._clampedScrollValue + diff, 0),
              NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
            );
        });
        this.state.offsetAnim.addListener(({ value }) => {
        this._offsetValue = value;
        });

        const { item } = this.props.navigation.state.params;
        console.log(item);
        SInfo.getItem(`${item.id}`,{}).then(value => {
            if (value === undefined || value === null) {

            } else {
                this.setState(state => {
                    return {isBookmarked: true}
                });
            }
        });
        
        SInfo.getItem('guest_id',{}).then(value => {
            this.setState(state => {
                return {guessId: value}
            });

            if (item.title) {
                fetchDetail(`https://api.themoviedb.org/3/guest_session/${value}/rated/movies?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&sort_by=created_at.asc`).then((ratedMovie) => {
                    if (ratedMovie.total_results != 0) {
                        _.forEach(ratedMovie.results, (val) => {
                            if (val.id === item.id) {
                                this.setState(state => {
                                    return {isRated: true, starCount: val.rating}
                                });
                            }
                        });
                    }
                    
                });
            } else {
                if (item.profile_path) {

                } else {
                    fetchDetail(`https://api.themoviedb.org/3/guest_session/${value}/rated/tv?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&sort_by=created_at.asc`).then((ratedTV) => {
                        if (ratedTV.total_results != 0) {
                            _.forEach(ratedTV.results, (val) => {
                                if (val.id === item.id) {
                                    this.setState(state => {
                                        return {isRated: true, starCount: val.rating}
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });

        if (item.title) {
            fetchDetail(`https://api.themoviedb.org/3/movie/${item.id}?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((detail) => {
                this.setState(state => {
                    return {detail: detail}
                });
            });
            
            // fetchDetail(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((video) => {
            //     this.setState(state => {
            //         return {video: video}
            //     });
            // });
            fetchDetail(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((cast) => {
                this.setState(state => {
                    return {cast: cast.cast}
                });
            });
            fetchDetail(`https://api.themoviedb.org/3/movie/${item.id}/similar?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=1`).then(similar => {
                this.setState(state => {
                    return {similar: similar}
                });
            });
        } else {
            if (item.profile_path) {
                fetchDetail(`https://api.themoviedb.org/3/person/${item.id}?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then(person => {
                    this.setState(state => {
                        return {person: person}
                    });
                });
            } else {
                fetchDetail(`https://api.themoviedb.org/3/tv/${item.id}?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((detail) => {
                    this.setState(state => {
                        return {detail: detail}
                    });
                });
                // fetchDetail(`https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((video) => {
                //     this.setState(state => {
                //       return {video: video}
                //     });
                // });
                fetchDetail(`https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((cast) => {
                    this.setState(state => {
                        return {cast: cast.cast}
                    });
                });
                fetchDetail(`https://api.themoviedb.org/3/tv/${item.id}/similar?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&page=1`).then(similar => {
                    this.setState(state => {
                        return {similar: similar}
                    });
                });
            }
        }
    }

    renderGenre() {
        if (this.state.detail !== '')
        return (
            <InfoSection
                title='genre'
                style={[styles.InfoSectionHeaderStyle]}
            >
            {this.state.detail.genres.length == 0 ? <Text style={styles.InfoSectionStyle}>-</Text> : 
                _.map(this.state.detail.genres, 'name').map((name, index) => {
                    return (
                        <Text key={index} style={[styles.InfoSectionStyle, {marginRight: 0}]}>{index=== 0 ? name : `, ${name}`}</Text>
                    );
                })
            }
            </InfoSection>
        ) ;
        else return null;
    }

    renderStoryline() {
        if (this.state.detail !== '')
        return (
            <InfoSection
                title='storyline'
            >
            {this.state.detail.overview ? <Text style={styles.InfoSectionStyle}>{this.state.detail.overview}</Text> :
                <Text style={styles.InfoSectionStyle}>-</Text>                          
            }
            </InfoSection>
        );
        else return null;
    }

    renderSimilar() {
        const { item } = this.props.navigation.state.params;
        if (this.state.similar !== '')
        return (
            <InfoSection
                title={item.title ? 'Similar movies' : 'similar tv shows'}
            >
                {this.state.similar.results.length == 0 ? <Text style={styles.InfoSectionStyle}>-</Text> : 
                    <ListByCategory
                    title={''}
                    loading={false}
                    list={this.state.similar}
                    navigation={this.props.navigation}     
                    style={{marginLeft: 0, marginTop: 0}}  
                    itemWidth={153}         
                    />
                }   
            </InfoSection>
        );
        else return null;
    }

    renderCast() {
        if (this.state.cast !== '') {
            list = _.take(this.state.cast, 5);
            return (
                <InfoSection
                    title='featured cast'
                    childDirection='column'  
                    childStyle={{marginRight: 16}}
                >
                {list.length === 0 ? <Text style={styles.InfoSectionStyle}>-</Text> :   
                    list.map((item, index) => {
                        return (
                            <CastItem
                                style={[{backgroundColor: index % 2 == 0 ? '#212121' : '#3d3d3d', marginTop: 8, paddingLeft: 8}]}
                                key={item.credit_id}
                                item={item}
                                navigation={this.props.navigation}     
                            />    
                        );
                    })
                }
                {this.state.cast.length > 5 ? 
                <TouchableWithoutFeedback
                    onPress={() => this.onItemClickDelay(this.state.cast)}
                >
                    <View style={{margin: 4}}>
                        <Text style={{marginTop: 8, fontSize: 12, color: '#ff9900', alignSelf:'flex-end'}}>See Full Cast</Text>
                    </View>
                </TouchableWithoutFeedback>
                
                : null}
                </InfoSection>
    
            );
        } else return null;
    }

    renderBioGraphy() {
        if (this.state.person !== '')
            return (
                <InfoSection
                    title='biography'
                >
                {this.state.person.biography ? <Text style={styles.InfoSectionStyle}>{this.state.person.biography}</Text> :
                    <Text style={styles.InfoSectionStyle}>-</Text>                          
                }
                </InfoSection>
            );
        else return null;
    }

    renderKnownAs() {
        if (this.state.person !== '')
            return (
                <InfoSection
                    title='Also Known As'
                    childDirection='column'
                >
                {this.state.person.also_known_as.length == 0 ? <Text style={styles.InfoSectionStyle}>-</Text> :
                    _.map(this.state.person.also_known_as).map((name, index) => {
                        return (
                            <Text key={index} style={[styles.InfoSectionStyle, {marginTop: index != 0 ? 0 : 16, alignSelf: 'flex-start'}]}>{`${name}`}</Text>
                        );
                    })                          
                }
                </InfoSection>
            );
        else return null;
    }

    renderKnownFor() {
        const { item } = this.props.navigation.state.params;
        if (this.state.person !== '')
        return (
            <InfoSection
                title='Known For'
            >
                {item.known_for.length == 0 ? <Text style={styles.InfoSectionStyle}>-</Text> : 
                    <ListByCategory
                        title={''}
                        loading={false}
                        list={item.known_for}
                        isObject
                        navigation={this.props.navigation}     
                        style={{marginLeft: 0, marginTop: 0}}  
                        itemWidth={153}         
                    />
                }   
            </InfoSection>
        );
        else return null;
    }

    renderDetail() {
        const { item } = this.props.navigation.state.params;
        if (item.profile_path) {
            if (this.state.person !== '') {
                return (
                    <View style={[styles.DetailInfo, {marginRight: 8, marginBottom: 16}]}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}} >{item.name.toUpperCase()}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#cdcdcd', fontSize: 12, marginTop: 8, marginRight: 8}} >{this.state.person.birthday}</Text>                        
                            <Text style={{color: '#cdcdcd', fontSize: 12, marginTop: 8}} >{this.state.person.deathday ? `- ${this.state.person.deathday}` : null}</Text>                                                    
                        </View>

                        <Text style={{color: '#cdcdcd', fontSize: 12, marginTop: 8}} >{this.state.person.place_of_birth}</Text>                        
                        <Text style={{color: '#cdcdcd', fontSize: 12, marginTop: 8}} >{this.state.person.gender === 1 ? 'Female' : this.state.person.gender === 2 ? 'Male' : 'Unspecified'}</Text>                        
                        
                    </View>
                );
            } else return null;    
        } else return (
            <View style={styles.DetailInfo}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}} >{item.title ? item.title.toUpperCase() : item.name.toUpperCase()}</Text>
                <Text style={{color: '#cdcdcd', fontSize: 12, marginTop: 8, marginBottom: 8}} >{item.release_date ? item.release_date.toUpperCase() : item.first_air_date.toUpperCase()}</Text>                        
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RatingBar 
                        style={{marginLeft: 0, marginBottom: 0}}
                        rating={Math.round(item.vote_average) / 2 }
                        disabled={true}
                        maxStars={5}
                        starSize={20}
                        emptyStarColor='#a8a8a8'
                    />
                    <Text style={{color: '#cdcdcd', fontSize: 12}}>{item.vote_count} Ratings</Text>
                </View>
            </View>
        ); 
    }

    render() {
        const { clampedScroll } = this.state;

        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
            outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
            extrapolate: 'clamp',
        });
        const navbarOpacity = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const { item } = this.props.navigation.state.params;
        backDropLink = item.profile_path ? 'https://image.tmdb.org/t/p/w500' + item.known_for[0].backdrop_path : 'https://image.tmdb.org/t/p/w500' + item.backdrop_path;
        imageLink = item.profile_path ? 'https://image.tmdb.org/t/p/w500' + item.profile_path : 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />

                <AnimatedScrollView
                    scrollEventThrottle={1}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                        { useNativeDriver: true },
                    )}
                >
                    <ImageBackground
                        defaultSource={require('../../assets/no_image_movie_tv_landscape_final.png')}                                                                                                      
                        source={{uri: backDropLink}}
                        style={{width: null, height: 199, marginTop: NAVBAR_HEIGHT}}
                        resizeMode='cover'                               
                    >
                        <LinearGradient 
                            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
                            style={{justifyContent: 'flex-start', height: 70}}>
                        </LinearGradient>
                    </ImageBackground>

                    <Image
                        defaultSource={require('../../assets/no_image_person_u_final_2.png')}  
                        source={{uri: imageLink}}
                        resizeMode='cover'                               
                        style={styles.PosterStyle}
                    />
                    
                    {this.renderDetail()}
                    
                    {item.profile_path ? null : 
                        <View style={styles.rateStyle}>
                        <TouchableWithoutFeedback
                            onPress={() => this.onRateClickDelay()}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                {this.state.isRated === false ? <Icon name= {Platform.OS === 'ios' ? "ios-star-outline" : "md-star-outline"} size={24} color="#ff9900"></Icon> : <Icon name= {Platform.OS === 'ios' ? "ios-star" : "md-star"} size={24} color="#ff9900"></Icon>}
                                {this.state.isRated === false ? <Text style={{color: '#ff9900', marginLeft: 8, fontSize: 14}} >Rate This</Text> : <Text style={{color: '#ff9900', marginLeft: 8, fontSize: 14}} >Your Rating: {this.state.starCount * 2}/10</Text>}
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => this.onBookmardClickDelay(item)}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 55}}>
                                {this.state.isBookmarked === false ? <Icon name= {Platform.OS === 'ios' ? "ios-bookmark-outline" : "ios-bookmark-outline"} size={24} color="#ff9900"></Icon> : <Icon name= {Platform.OS === 'ios' ? "ios-bookmark" : "md-bookmark"} size={24} color="#ff9900"></Icon>}
                                {this.state.isBookmarked === false ? <Text style={{color: '#ff9900', marginLeft: 8, fontSize: 14}} >Add to WatchList</Text> : <Text style={{color: '#ff9900', marginLeft: 8, fontSize: 14}} >Added to WatchList</Text>}
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    }

                    

                    <Toast ref="toast"/>
                    <PopupDialog
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        width={0.9}
                        height={230}
                        actions={[<View key={0} style={{backgroundColor: '#303030', flexDirection:'row', justifyContent: 'center'}}>
                            <DialogButton text="CANCEL" buttonStyle={{backgroundColor: '#212121', marginTop: 25, marginBottom: 8}} textStyle={{color: 'white'}} onPress={() => this.popupDialog.dismiss()}/>
                            <DialogButton text="CONFIRM" buttonStyle={{backgroundColor: '#212121', marginTop: 25, marginLeft: 16, marginBottom: 8}} textStyle={{color: 'white'}} onPress={() => 
                                {   
                                    if (item.title) {
                                        this.popupDialog.dismiss();
                                        this.setState(state => {
                                            return {isRated: true}
                                        });
                                        fetch(`https://api.themoviedb.org/3/movie/${item.id}/rating?api_key=edf1f4d5b56b3b1d9454f2b090695246&guest_session_id=${this.state.guessId}`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json;charset=utf-8'
                                            },
                                            body: JSON.stringify({
                                                value: this.state.starCount
                                            }),
                                        }).then((response) => {
                                            this.refs.toast.show('Success');
                                        });
                                    } else {
                                        if (item.profile_path) {

                                        } else {
                                            this.popupDialog.dismiss();
                                            this.setState(state => {
                                                return {isRated: true}
                                            });
                                            fetch(`https://api.themoviedb.org/3/tv/${item.id}/rating?api_key=edf1f4d5b56b3b1d9454f2b090695246&guest_session_id=${this.state.guessId}`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json;charset=utf-8'
                                                },
                                                body: JSON.stringify({
                                                    value: this.state.starCount
                                                }),
                                            }).then((response) => {
                                                this.refs.toast.show('Success');
                                            });
                                        }
                                    }
                                    
                                }}/>
                            </View>
                        ]}
                    >
                        <View style={styles.dialogStyle}>
                            <Text style={{color: 'white', fontSize: 20, marginTop: 20, fontWeight: 'bold', marginLeft: 16}}>CHOOSE YOUR RATING (1-10)</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, justifyContent: 'center'}}>
                                <RatingBar 
                                    style={{marginLeft: 0, marginBottom: 8}}
                                    rating={this.state.starCount}
                                    disabled={false}
                                    maxStars={5}
                                    starSize={30}
                                    emptyStarColor='#a8a8a8'
                                    halfStarEnabled={true}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                                <Text style={{color: 'white', fontSize: 40, marginBottom: 8}}>{this.state.starCount * 2}</Text>
                            </View>
                        </View>
                    </PopupDialog>

                    {/* {item.profile_path ? null : 
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.ActionButtonStyle}
                            onPress={() => this.onTrailerClickDelay(this.video)}
                        >
                            <Icon name= {Platform.OS === 'ios' ? "ios-play" : "md-play"} size={30} color="#fff"></Icon>
                        </TouchableOpacity>
                    } */}
                    
                    {item.profile_path ? this.renderKnownAs() : this.renderGenre()}
                    {item.profile_path ? null : this.renderCast()}                    
                    {item.profile_path ? this.renderBioGraphy() : this.renderStoryline()}
                    {item.profile_path ? this.renderKnownFor() : this.renderSimilar()}

                </AnimatedScrollView>

                <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <AnimatedIcon name= {Platform.OS === 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={30} color="#fff" style={{marginLeft: 10, opacity: navbarOpacity }}></AnimatedIcon>
                    </TouchableWithoutFeedback>
                </Animated.View>
                
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#303030',
        flex: 1
    },
    PosterStyle: {
        width: 110,
        height: 160,
        top: 158 + NAVBAR_HEIGHT,
        left: 16,
        position: 'absolute',
    },
    DetailInfo: {
        marginTop: 16,
        marginRight: 70,
        marginLeft: 142,
        height: 120
    },
    // ActionButtonStyle: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 60,  
    //     height: 60,   
    //     borderRadius: 30,            
    //     backgroundColor: '#ff9900',                                    
    //     position: 'absolute',                                          
    //     top: Platform.OS === 'ios' ? 172 + NAVBAR_HEIGHT : 170 + NAVBAR_HEIGHT,                                                    
    //     right: 8, 
    // },
    rateStyle: {
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dialogStyle: {
        backgroundColor: '#303030',     
        flex: 1   
    },
    InfoSectionHeaderStyle: {
        marginLeft: 16,
        marginTop: 16
    },
    InfoSectionStyle: {
        fontSize: 14,
        color: '#a8a8a8',
        marginTop: 16,
        marginRight: 8
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#212121',
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    contentContainer: {
        paddingTop: NAVBAR_HEIGHT,
    }
};

export default DetailScreen;