import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import Offline from '../../components/Offline';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  offline: state.offline,
});

class Capture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: RNCamera.Constants.Type.back,
      flash: RNCamera.Constants.FlashMode.off,
      recording: false,
    };
  }

  handleRecord = async () => {
    if (this.camera) {
      if (this.state.recording === false) {
        const options = {quality: '480p', maxDuration: 10};
        return await this.camera
          .recordAsync(options)
          .then((res) => {
            if (res.uri) {
              this.props.navigation.navigate('Playback', {
                data: res,
              });
            }
          })
          .catch((error) => console.log(error));
      } else {
        await this.camera.stopRecording();
      }
    }
  };

  toggleFlash = (flash) => this.setState({flash});
  toggleType = (type) => this.setState({type});

  render() {
    return (
      <View style={styles.container}>
        {!this.props.offline.isOnline ? <Offline /> : null}
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          type={this.state.type}
          onRecordingStart={() => this.setState({recording: true})}
          onRecordingEnd={() => this.setState({recording: false})}
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
          }}>
          <TouchableOpacity
            style={styles.capture}
            onPress={() =>
              this.toggleType(
                this.state.type === RNCamera.Constants.Type.back
                  ? RNCamera.Constants.Type.front
                  : RNCamera.Constants.Type.back,
              )
            }>
            <Icon name="md-reverse-camera" size={35} color="#fff" />
          </TouchableOpacity>
          <View style={{flex: 3, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.handleRecord()}
              style={{
                backgroundColor: '#fff',
                shadowColor: '#fff',
                shadowOpacity: 0.8,
                elevation: 8,
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: 50,
              }}>
              <Material
                name={this.state.recording === true ? 'stop' : 'video'}
                size={35}
                color={'#ff0000'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.capture}
            onPress={() =>
              this.toggleFlash(
                this.state.flash === RNCamera.Constants.FlashMode.off
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off,
              )
            }>
            <Icon
              name={
                this.state.flash === RNCamera.Constants.FlashMode.torch
                  ? 'md-flash'
                  : 'md-flash-off'
              }
              size={35}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Capture);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
