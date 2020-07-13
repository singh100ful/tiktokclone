import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Counter extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          borderLeftColor: 'grey',
          borderRightWidth: this.props.borderRight === true ? 0.8 : 0,
          borderLeftWidth: this.props.borderLeft === true ? 0.8 : 0,
          borderRightColor: 'grey',
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {this.props.number}
        </Text>
        <Text style={{color: 'grey'}}> {this.props.title} </Text>
      </View>
    );
  }
}
