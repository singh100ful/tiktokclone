import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import profile from '../../assets/img/userProfile.png';
import Header from '../../components/Header';
import Counter from '../../components/Counter';
import VideoTab from './VideoTab';
import Offline from '../../components/Offline';
import global from '../../style/Styles';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {postLogout} from '../../store/services/Login';
import {getProfile} from '../../store/services/Profile';

const mapStateToProps = (state) => ({
  offline: state.offline,
  profile: state.profile,
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (data) => {
    dispatch(getProfile(data));
  },
  postLogout: (data) => {
    dispatch(postLogout(data));
  },
});

class Profile extends Component {
  componentDidUpdate() {
    if (this.props.profile.add.length > 0) {
      let data = {
        user: this.props.login.login.user,
      };

      this.props.getProfile(data);
    }
  }
  componentDidMount() {
    let data = {
      user: this.props.login.login.user,
    };

    this.props.getProfile(data);
  }

  handleLogout = () => {
    this.props.postLogout();
  };
  render() {
    const data = this.props.profile.profile;
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        {!this.props.offline.isOnline ? <Offline /> : null}
        <Header title={data.firstname} />
        <ScrollView>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Image
              source={data.picture ? {uri: data.picture} : profile}
              style={{
                width: 180,
                height: 180,
                borderRadius: 180 / 2,
                padding: 10,
              }}
            />
            <Text style={global.profileText}>
              {data.firstname} {data.lastname}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Counter title={'Following'} number={'1000'} borderRight={true} />
            <Counter
              title={'Followers'}
              number={'1000'}
              borderRight={true}
              borderLeft={true}
            />
            <Counter title={'Likes'} number={'1000'} borderLeft={true} />
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{paddingHorizontal: 5}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Edit', {
                    data: data,
                  })
                }
                style={{
                  backgroundColor: '#FFF',
                  padding: 10,
                  paddingHorizontal: 20,
                  borderColor: '#b3b3b3',
                  borderWidth: 2,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 5}}>
              <TouchableOpacity
                onPress={() => this.handleLogout()}
                style={{
                  backgroundColor: '#f00',
                  padding: 5,
                  paddingHorizontal: 20,
                  borderColor: '#f00',
                  borderWidth: 2,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Icon name="ios-log-out" color={'#fff'} size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>{/* <VideoTab /> */}</View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
