import React, {Component} from 'react';
import {Text, View, FlatList, Dimensions} from 'react-native';
import {ItemCategory} from '../components/common';
import {RatingBar} from '../components/common';
import Carousel from 'react-native-snap-carousel';

class ListByCategory extends React.PureComponent {

    onItemClick(item) {
        this.props.navigation.navigate('Detail', {
            item: item
        });
    }

    _renderItem = ({item}) => (
        <ItemCategory
          item={item}
          navigation={this.props.navigation}
        />
      );

    render() {
        const {height, width} = Dimensions.get('window');        
        if (!this.props.loading)
            return(
                <View>
                    <Text style={styles.headerStyle}>{this.props.title.toUpperCase()}</Text>
                    <Carousel
                        horizontal
                        data={this.props.list.results}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        extraData={this.state}
                        shouldOptimizeUpdates={true}
                        itemWidth={161}
                        enableMomentum
                        loop={true}
                        activeSlideAlignment='start'
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                    />
                </View>
            );
        else return null;
    }
}

const styles = {
    headerStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        color: 'white'
    }
}

export default ListByCategory;