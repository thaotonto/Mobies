import React, {Component} from 'react';
import {ViewPager} from 'rn-viewpager';
import {connect} from 'react-redux';
import {View, Text, Image, ImageBackground} from 'react-native';

class ViewPagerPage extends Component {
    renderItem() {
        return this.props.list.results.map(item => {
            imageLink = 'https://image.tmdb.org/t/p/w500' + item.backdrop_path;
            return (
                <View key={item.id} style={styles.container}>
                    <ImageBackground 
                        source={{uri: imageLink}} 
                        style={{width: undefined, height: 199}}
                    >
                        <Text></Text>
                    </ImageBackground>
                </View>
            );
        })
    }

    render () {
        return (
            <ViewPager
                style={{height:200, flex: 1}}
            >
                {this.renderItem()}
            </ViewPager>
        );
    }
}

const styles = {
    container: {
        flex: 1
    }
}



export default ViewPagerPage;