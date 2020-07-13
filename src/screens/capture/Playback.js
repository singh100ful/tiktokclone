import React, {Component} from 'react';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {postVideo, removeVideo} from '../../store/services/Video';

const mapStateToProps = (state) => ({
  video: state.video,
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  postVideo: (data) => {
    dispatch(postVideo(data));
  },
  removeVideo: (data) => {
    dispatch(removeVideo(data));
  },
});

class Playback extends Component {
  handleUpload = () => {
    let data = {
      user: this.props.login.login.user,
      video: this.props.route.params.data,
    };
    this.props.postVideo(data);
  };

  componentDidUpdate() {
    if (this.props.video.add.length > 0) {
      this.props.removeVideo();
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          paddingBottom: 40,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity
            onPress={() => this.handleUpload()}
            style={{
              backgroundColor: '#fff',
              shadowColor: '#fff',
              shadowOpacity: 0.8,
              elevation: 8,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              flexDirection: 'row',
              borderColor: 'grey',
              borderWidth: 0.5,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <Material name="upload" size={25} color={'#ff0000'} />
            <Text
              style={{
                fontSize: 16,
                color: '#ff0000',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
        <Video
          source={{uri: this.props.route.params.data.uri}}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="contain"
          shouldPlay
          style={{flex: 1}}
          useNativeControls
          ignoreSilentSwitch="ignore"
          playWhenInactive={true}
          controls={true}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playback);
