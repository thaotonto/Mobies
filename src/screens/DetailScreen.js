import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {View, Text, SafeAreaView, StatusBar, Button} from 'react-native';

class DetailScreen extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#212121',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerMode: 'none',
        drawerLockMode: 'locked-closed'
    }

    onPressDetail() {
        this.props.navigation.goBack();
    }

    render() {
        const { params } = this.props.navigation.state;
        console.log(params);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#1a1a1a'
                />
                
                <Button
                    onPress={this.onPressDetail.bind(this)}
                    title="Home"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </SafeAreaView>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#303030',
        flex: 1
    }
};

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(DetailScreen);