import React, {Component} from 'react';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import global from '../../style/Styles';
import profile from '../../assets/img/userProfile.png';
import {connect} from 'react-redux';
import {postProfile, removeProfile} from '../../store/services/Profile';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const mapStateToProps = (state) => ({
  login: state.login,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  postProfile: (data) => {
    dispatch(postProfile(data));
  },
  removeProfile: (data) => {
    dispatch(removeProfile(data));
  },
});

class Edit extends Component {
  componentDidUpdate() {
    if (this.props.profile.add.length > 0) {
      this.props.removeProfile();
      this.props.navigation.navigate('Profile');
    }
  }
  render() {
    const data = this.props.route.params.data;
    const options = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView>
          <Formik
            initialValues={{
              picture: null,
              email: data ? data.email : '',
              firstname: data ? data.firstname : '',
              lastname: data ? data.lastname : '',
              phone: data ? data.phone : '',
            }}
            onSubmit={(values, {props = this.props}) => {
              let data;
              if (values.picture !== null) {
                data = {
                  picture: values.picture,
                  firstname: values.firstname,
                  lastname: values.lastname,
                  phone: values.phone,
                  user: this.props.login.login.user,
                };
              } else {
                data = {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  phone: values.phone,
                  user: this.props.login.login.user,
                };
              }
              props.postProfile(data);
            }}>
            {(formProps) => (
              <View>
                <View
                  style={{
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      ImagePicker.showImagePicker(options, (response) => {
                        if (response.uri) {
                          let data = {
                            name: response.fileName,
                            type: response.type,
                            uri:
                              Platform.OS === 'android'
                                ? response.uri
                                : response.uri.replace('file://', ''),
                          };
                          formProps.setFieldValue('picture', data);
                        }
                      });
                    }}>
                    <Image
                      source={
                        formProps.values.picture && formProps.values.picture.uri
                          ? {uri: formProps.values.picture.uri}
                          : data.picture
                          ? {uri: data.picture}
                          : profile
                      }
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 180 / 2,
                        borderWidth: 0.5,
                        borderColor: 'grey',
                        padding: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{padding: 15}}>
                  <View>
                    <TextInput
                      style={global.input}
                      autoCapitalize={'none'}
                      editable={false}
                      onChangeText={formProps.handleChange('email')}
                      onBlur={() => formProps.setFieldTouched('email')}
                      value={formProps.values.email}
                      placeholder="Username or Email"
                    />
                  </View>
                  <View>
                    <TextInput
                      style={global.input}
                      onChangeText={formProps.handleChange('firstname')}
                      onBlur={() => formProps.setFieldTouched('firstname')}
                      value={formProps.values.firstname}
                      placeholder="First Name"
                    />
                  </View>
                  <View>
                    <TextInput
                      style={global.input}
                      onChangeText={formProps.handleChange('lastname')}
                      onBlur={() => formProps.setFieldTouched('lastname')}
                      value={formProps.values.lastname}
                      placeholder="Last Name"
                    />
                  </View>
                  <View>
                    <TextInput
                      style={global.input}
                      onChangeText={formProps.handleChange('phone')}
                      onBlur={() => formProps.setFieldTouched('phone')}
                      value={formProps.values.phone}
                      placeholder="Contact"
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 60,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.mainBtn}
                      onPress={formProps.handleSubmit}>
                      {this.props.profile.isLoading === true ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <Icon name="md-checkmark" size={35} color="#fff" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

const styles = StyleSheet.create({
  mainBtn: {
    backgroundColor: '#CF2650',
    shadowColor: '#CF2650',
    shadowOpacity: 0.8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
