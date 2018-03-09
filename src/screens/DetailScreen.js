import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {View, Text, ScrollView, StatusBar, Platform, ImageBackground, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Header, RatingBar, InfoSection} from '../components/common';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchDetail } from '../networks/fetchData';
import _ from 'lodash';
import ListByCategory from '../components/ListByCategory';

class DetailScreen extends Component {
    state = {
        detail: '',
        cast: '',
        similar: '',
        person: ''
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            drawerLockMode: 'locked-closed'
        }
    }

    componentDidMount() {
        const { item } = this.props.navigation.state.params;
        if (item.title) {
            fetchDetail(`https://api.themoviedb.org/3/movie/${item.id}?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US`).then((detail) => {
                this.setState(state => {
                    return {detail: detail}
                });
            });
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
                style={[styles.InfoSectionHeaderStyle, {marginTop: 50}]}
            >
            {this.state.detail.genres.length == 0 ? <Text style={styles.InfoSectionStyle}>-</Text> : 
                _.map(this.state.detail.genres, 'name').map((name, index) => {
                    return (
                        <Text key={index} style={styles.InfoSectionStyle}>{index=== 0 ? name : `, ${name}`}</Text>
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
        if (this.state.cast !== '')
        return 
        // (
        // TODO
        // );
        else return null;
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
                >
                {this.state.person.also_known_as.length == 0 ? <Text style={styles.InfoSectionStyle}>-</Text> :
                    _.map(this.state.person.also_known_as).map((name, index) => {
                        return (
                            <Text key={index} style={styles.InfoSectionStyle}>{index=== 0 ? name : `, ${name}`}</Text>
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

    render() {
        const { item } = this.props.navigation.state.params;
        imageLink = item.profile_path ? 'https://image.tmdb.org/t/p/w500' + item.profile_path : 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                <View style={styles.iosHeader} />
                <ScrollView style={{flex: 1}} > 
                    <Header
                        navigation={this.props.navigation}
                        item={item.profile_path ? item.known_for[0] : item}
                    />
                    <Image
                        source={{uri: imageLink}}
                        style={styles.PosterStyle}
                    />
                    {item.profile_path ? null : 
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
                    }
                    {item.profile_path ? null : 
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.ActionButtonStyle}
                            onPress={() => { console.log("hi")}}
                        >
                            <Icon name= {Platform.OS === 'ios' ? "ios-play" : "md-play"} size={30} color="#fff"></Icon>
                        </TouchableOpacity>
                    }
                    
                    {item.profile_path ? this.renderKnownAs() : this.renderGenre()}
                    {item.profile_path ? this.renderBioGraphy() : this.renderStoryline()}
                    {item.profile_path ? this.renderKnownFor() : this.renderSimilar()}
                    {item.profile_path ? null : this.renderCast()}
                </ScrollView>
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
        top: 173,
        left: 16,
        position: 'absolute',        
    },
    DetailInfo: {
        marginTop: 16,
        marginRight: 70,
        marginLeft: 142
    },
    ActionButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#ff9900',                                    
        position: 'absolute',                                          
        top: Platform.OS === 'ios' ? 172 : 165,                                                    
        right: 8, 
    },
    InfoSectionHeaderStyle: {
        marginLeft: 16,
        marginTop: 16
    },
    InfoSectionStyle: {
        fontSize: 14,
        color: '#a8a8a8',
        marginTop: 16
    },
    iosHeader: {
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#1a1a1a'
    }
};

export default DetailScreen;