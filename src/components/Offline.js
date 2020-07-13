import React, {Component} from 'react';
import global from '../style/Styles';
import {Text, View} from 'react-native';

class Offline extends Component {
  render() {
    return (
      <View style={global.offlineContainer}>
        <Text style={global.offlineText}>No Internet Connection</Text>
      </View>
    );
  }
}
export default Offline;
