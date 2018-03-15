import React from 'react';
import {View} from 'react-native';

class SearchScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerMode:'screen',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#212121',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
    }}

    render() {
        return (
            <View style={styles.container} >

            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#303030'
    }
}

export default SearchScreen;