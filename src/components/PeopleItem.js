import React from 'react';
import {FlatList, TouchableWithoutFeedback, ImageBackground, Text, Dimensions} from 'react-native';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

class PeopleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isClicked: false}
        this.onItemClickDelay = _.debounce(this._onPress, 1000, {
            leading: true,
            trailing: false
        });
    }

    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };

    render() {
        const {height, width} = Dimensions.get('window');        
        const {item} = this.props;
        imageLink = 'https://image.tmdb.org/t/p/w500' + item.profile_path;
        
        return (
            <ImageBackground
                defaultSource={require('../../assets/no_image_person_u_final_2.png')}
                source={{uri: imageLink}} 
                resizeMode='cover'
                style={[{backgroundColor: '#424242', width: width / 2 - 8 , height: 199, flex: 1, marginLeft: 4, marginRight: 4, marginTop: 4, marginBottom: 4}, this.props.style]}
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
                            {item.name.toUpperCase()}
                        </Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </ImageBackground>
        );
    }
}

const styles = {
    titleTextStyle: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
}

export default PeopleItem;