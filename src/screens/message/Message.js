import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import Header from '../../components/Header';
import Offline from '../../components/Offline';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  offline: state.offline,
});

class Message extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        {!this.props.offline.isOnline ? <Offline /> : null}
        <Header title={'All Activity'} rightIcon={'md-paper-plane'} />
        <ScrollView></ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Message);
