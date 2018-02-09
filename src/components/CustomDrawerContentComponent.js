import {SafeAreaView, ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import {DrawerItems} from 'react-navigation';

class CustomDrawerContentComponent extends Component{

    render () {
        return(
            <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={{backgroundColor:'#1a1a1a', height: 150, justifyContent:'center', marginBottom: 10, marginTop: 0}}>
                <Image source={require('../../assets/icon_round.png')} style={{height: 100, width: 100, alignSelf:'center'}}/>
                </View>
                <DrawerItems {...this.props} />
            </View>
        )
    }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default CustomDrawerContentComponent;