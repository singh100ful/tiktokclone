import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profile from '../../assets/img/userProfile.png';
import Video from 'react-native-video';
import Share from 'react-native-share';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {postLike} from '../../store/services/Like';

const mapStateToProps = (state) => ({
  like: state.like,
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  postLike: (data) => {
    dispatch(postLike(data));
  },
});

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      paused: false,
      mute: true,
      loading: false,
    };
  }

  handleShare = async () => {
    const shareOptions = {
      // hard coded path
      url: this.props.data.url,
      type: 'video/mp4',
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  handleLike = () => {
    this.setState((state) => {
      return {
        like: !state.like,
      };
    });

    if (this.props.data.like === true) {
      data = {
        user: this.props.login.login.user,
        video: this.props.data,
        like: false,
      };
    } else {
      data = {
        user: this.props.login.login.user,
        video: this.props.data,
        like: true,
      };
    }
    this.props.postLike(data);
  };

  handlePlay = () => {
    this.setState((state) => {
      return {
        paused: !state.paused,
      };
    });
  };

  handleStart = () => {
    this.setState({loading: true});
  };

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  handleEnd = () => {
    this.setState({paused: true});
  };

  handleMute = () => {
    this.setState((state) => {
      return {
        mute: !state.mute,
      };
    });
  };

  render() {
    return (
      <>
        <Video
          source={{uri: this.props.data.url}}
          ref={(ref) => {
            this.player = ref;
          }}
          useNativeControls
          rate={1.0}
          volume={1.0}
          muted={this.state.mute}
          repeat={true}
          resizeMode="contain"
          shouldPlay
          style={{flex: 1}}
          paused={this.state.paused}
          onLoad={this.handleLoad}
          onLoadStart={this.handleStart}
          onEnd={this.handleEnd}
        />
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 80,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              bottom: 100,
              padding: 15,
            }}>
            {/* <Text style={{color: '#fff'}} numberOfLines={5}>
              Description
            </Text> */}
          </View>
          <View>
            <View style={styles.icons}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}>
                <Image
                  source={
                    this.props.data.profile !== ''
                      ? {uri: this.props.data.profile}
                      : profile
                  }
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    padding: 10,
                  }}
                />
              </View>
            </View>
            <View style={styles.icons}>
              <View style={styles.iconInner}>
                <Icon
                  name="heart"
                  onPress={() => this.handleLike()}
                  size={35}
                  color={
                    this.state.like === true
                      ? '#f00'
                      : this.props.data.like === true
                      ? '#f00'
                      : '#fff'
                  }
                />
              </View>
            </View>
            <View style={styles.icons}>
              <View style={styles.iconInner}>
                <Icon name="comment-outline" size={35} color="#fff" />
              </View>
            </View>
            <View style={styles.icons}>
              <View style={styles.iconInner}>
                <Icon
                  onPress={this.handleShare}
                  name="share-variant"
                  size={35}
                  color="#fff"
                />
              </View>
            </View>
            <View style={styles.icons}>
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={this.handlePlay}>
                    <Icon
                      name={!this.state.paused ? 'pause' : 'play'}
                      size={40}
                      color="#000"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.icons}>
              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={this.handleMute}>
                  <Icon
                    name={this.state.mute ? 'volume-mute' : 'volume-high'}
                    size={40}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    paddingVertical: 25,
  },
  iconInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  iconText: {
    fontSize: 14,
    color: '#fff',
    padding: 5,
  },
});
