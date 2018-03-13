import React from 'react';
import {View, Text} from 'react-native';

class InfoSection extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.titleStyle} >{this.props.title.toUpperCase()}</Text>
                <View style={{height: 1, borderColor: '#a8a8a8',borderWidth: 1, marginRight: 16}}/>
                <View style={{flexDirection: this.props.childDirection ? this.props.childDirection : 'row'}}>{this.props.children}</View>
            </View>
        );
    }
}

const styles = {
    container: {
        marginLeft: 16,        
        marginTop: 16
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff'
    }
}

export {InfoSection};