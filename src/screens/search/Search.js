import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TextInput} from 'react-native';
import Offline from '../../components/Offline';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  offline: state.offline,
});

class Search extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {!this.props.offline.isOnline ? <Offline /> : null}
        <View style={{padding: 10}}>
          <View
            style={{
              backgroundColor: '#E3E3E3',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 5,
            }}>
            <Icon
              style={{paddingLeft: 10}}
              name="md-search"
              size={25}
              color={'#ACACAC'}
            />
            <TextInput
              style={{height: 40, marginLeft: 10, flex: 1, borderWidth: 0}}
              placeholder="Search"
              placeholderTextColor="#ACACAC"
              underlineColorAndroid="transparent"
              selectionColor="#000000"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Search);
