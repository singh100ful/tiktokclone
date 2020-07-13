import React, {Component} from 'react';
import {Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
//Icons
import Icon from 'react-native-vector-icons/Ionicons';
import tiktok from '../assets/img/plusTikTok-white.png';
//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Screens
//Auth
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
//Root
import Capture from '../screens/capture/Capture';
import Playback from '../screens/capture/Playback';
import Home from '../screens/home/Home';
import Message from '../screens/message/Message';
import Search from '../screens/search/Search';
import Profile from '../screens/profile/Profile';
import Edit from '../screens/profile/Edit';
//Redux
import {connect} from 'react-redux';
import {checkOnline} from '../store/services/Offline';

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  checkOnline: (data) => {
    dispatch(checkOnline(data));
  },
});

//Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CameraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Capture"
        component={Capture}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Playback"
        component={Playback}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Edit"
        component={Edit}
      />
    </Stack.Navigator>
  );
}

function Root() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        style: {
          height: 57,
          backgroundColor: '#000000',
          borderTopColor: 'grey',
          borderTopWidth: 0.19,
          paddingVertical: 7,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-search" color={color} size={size} />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ' ',
          tabBarIcon: ({color, size}) => (
            <Image source={tiktok} style={{width: 43, height: 28}} />
          ),
        }}
        name="Camera"
        component={CameraStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-mail" color={color} size={size} />
          ),
        }}
        name="Message"
        component={Message}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="md-person" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}

class Layout extends Component {
  componentDidMount() {
    NetInfo.addEventListener((state) => {
      if (state.isInternetReachable) {
        this.props.checkOnline(true);
      } else {
        this.props.checkOnline(false);
      }
    });
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.login.login.user ? (
            <Stack.Screen
              options={{headerShown: false}}
              name="Root"
              component={Root}
            />
          ) : (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="SignUp"
                component={SignUp}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
