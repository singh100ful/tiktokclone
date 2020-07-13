import React, {Component} from 'react';
import {Text, View, Image, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';

class Center extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 3, justifyContent: 'center', height: '100%'}}>
        {this.props.titleType == 'logo' ? (
          //   <Image
          //     source={require('../assets/img/applogo.png')}
          //     style={{width: 40, height: 40, alignSelf: 'center'}}
          //   />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'eyinterstate-bold',
              textAlign: 'center',
            }}>
            {this.props.title}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {this.props.title}
          </Text>
        )}
      </View>
    );
  }
}

export class Header extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 0.3,
            borderBottomColor: 'grey',
            height: 40,
            marginTop: Platform.OS === 'ios' ? 0 : 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 12,
            alignItems: 'center',
          }}>
          <Icon
            style={{paddingLeft: 15}}
            onPress={() => this.props.navigation.goBack()}
            name={this.props.leftIcon}
            size={30}
            color={'#000'}
          />
          <Center title={this.props.title} />
          <Icon
            style={{paddingRight: 15}}
            onPress={() => this.props.navigation.goBack()}
            name={this.props.rightIcon}
            size={30}
            color={'#000'}
          />
        </View>
      </View>
    );
  }
}

export default Header;
