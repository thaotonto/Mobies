import React from 'react';
import {View, Platform} from 'react-native';
import StarRating from 'react-native-star-rating';

const RatingBar = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <StarRating
                disabled={props.disabled}
                maxStars={props.maxStars}
                rating={props.rating}
                emptyStar={Platform.OS === 'ios' ? 'ios-star-outline' : 'md-star-outline'}
                fullStar={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
                halfStar={Platform.OS === 'ios' ? 'ios-star-half' : 'md-star-half'}
                iconSet={'Ionicons'}
                starColor='#ff9900'
                emptyStarColor='#a8a8a8'
                starSize={props.starSize}
                starStyle={props.starStyle}
                selectedStar={props.selectedStar}
                emptyStarColor={props.emptyStarColor}
            />
        </View>
    );
};

const styles = {
    container: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8
    }
}

export {RatingBar};