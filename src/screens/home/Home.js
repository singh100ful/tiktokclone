import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Offline from '../../components/Offline';
import {connect} from 'react-redux';
import {getVideo} from '../../store/services/Video';
import Feed from './Feed';

const mapStateToProps = (state) => ({
  login: state.login,
  offline: state.offline,
  video: state.video,
});

const mapDispatchToProps = (dispatch) => ({
  getVideo: (data) => {
    dispatch(getVideo(data));
  },
});

class Home extends Component {
  componentDidMount() {
    if (this.props.video.video.length === 0) {
      let data = {
        user: this.props.login.login.user,
      };
      this.props.getVideo(data);
    }
  }
  render() {
    if (this.props.video.isLoading) {
      return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <ActivityIndicator
            style={{alignItems: 'center', justifyContent: 'center'}}
            size="large"
            color="#fff"
          />
        </View>
      );
    }
    return (
      <>
        {!this.props.offline.isOnline ? <Offline /> : null}
        <ViewPager
          style={styles.viewPager}
          initialPage={0}
          orientation="vertical">
          {this.props.video.video
            ? this.props.video.video.map((data, index) => (
                <View key={index}>
                  <Feed data={data} />
                </View>
              ))
            : null}
        </ViewPager>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: '#000',
  },
});
