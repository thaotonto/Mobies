import React from 'react';
import {View, TouchableWithoutFeedback, Platform, Animated, FlatList, StatusBar, TextInput} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchDetail } from '../networks/fetchData';
import SearchItem from '../components/SearchItem';

const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 0 });
const NAVBAR_HEIGHT = Platform.OS === 'ios' ? STATUS_BAR_HEIGHT + 44 : 58;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

class SearchScreen extends React.Component {
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
            isClicked: false,
            data: ''
        };

        this.onTypeDelay = _.debounce(this._onType, 1000, {
            leading: false,
            trailing: true
        });
    }

    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;

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
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            drawerLockMode: 'locked-closed'            
    }}

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item, index}) => {
        return( 
            <SearchItem
                style={{backgroundColor: '#212121', marginTop: index === 0 ? NAVBAR_HEIGHT + 8 : 8}}
                item={item}
                navigation={this.props.navigation}
            />
        );
    }

    _onType(text) {
        link = decodeURI(`https://api.themoviedb.org/3/search/multi?api_key=edf1f4d5b56b3b1d9454f2b090695246&language=en-US&query=${text}&page=1&include_adult=false`); 
        
        fetchDetail(link).then((results) => {
            this.setState(state => {
                return {data: results.results}
            })
        });
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

        return (
            <View style={styles.container} >
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                <AnimatedFlatList
                    style={{marginBottom: 8}}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    scrollEventThrottle={1}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                        { useNativeDriver: true },
                    )}
                />

                <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <AnimatedIcon name= {Platform.OS === 'ios' ? "ios-arrow-back" : "md-arrow-back"} size={30} color="#fff" style={{marginLeft: 10, opacity: navbarOpacity , alignSelf: 'center'} }></AnimatedIcon>
                    </TouchableWithoutFeedback>

                    <AnimatedTextInput
                        style={[styles.textInputStyle, {opacity: navbarOpacity}]}
                        autoCorrect={false}
                        placeholder='Search...'
                        placeholderTextColor='white'
                        autoFocus
                        ref='_textInput'
                        onChangeText={text => this.onTypeDelay(text)}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.refs._textInput._component.clear();
                        }}
                    >
                        <AnimatedMaterialIcons name="clear" size={30} color="#fff" style={{marginRight: 10, opacity: navbarOpacity , alignSelf: 'flex-end', alignSelf: 'center' } }></AnimatedMaterialIcons>
                    </TouchableWithoutFeedback>
                    
                </Animated.View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#303030'
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#212121',
        height: NAVBAR_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    contentContainer: {
        paddingTop: NAVBAR_HEIGHT,
    },
    textInputStyle: {
        marginRight: 16,
        marginLeft: 16,
        alignSelf: 'center',
        fontSize: 14,
        color: 'white',
        flex: 1,
    }
}

export default SearchScreen;