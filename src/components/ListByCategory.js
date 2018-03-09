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
          style={this.props.style}
        />
    );

    render() {
        const {height, width} = Dimensions.get('window');        
        if (!this.props.loading)
            return(
                <View style={{marginBottom: 16}}>
                    <Text style={styles.headerStyle}>{this.props.title.toUpperCase()}</Text>
                    <Carousel
                        data={this.props.isObject ? this.props.list : this.props.list.results}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        shouldOptimizeUpdates={true}
                        itemWidth={this.props.itemWidth}
                        enableMomentum
                        // loop={true}
                        activeSlideAlignment='start'
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        firstItem={0}
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

ListByCategory.defaultProps = {
    isObject: false
}

export default ListByCategory;