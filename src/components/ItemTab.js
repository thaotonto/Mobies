import React from 'react';
import {TouchableHighlight, View, Text} from 'react-native';

class ItemTab extends React.Component {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const textColor = this.props.selected == this.props.id ? "#fff" : "#cdcdcd";
      return (
          <TouchableHighlight
              style={[this.props.style]}
              onPress={this._onPress}
              underlayColor='#1a1a1a'
          >
              <Text style={{ color: textColor, fontSize: 16, fontWeight:'bold' }}>{this.props.title.toUpperCase()}</Text>
          </TouchableHighlight>
      );
    }
}

export default ItemTab;