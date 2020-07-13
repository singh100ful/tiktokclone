import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import global from '../../style/Styles';
import {connect} from 'react-redux';
import {postLogin} from '../../store/services/Login';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  postLogin: (data) => {
    dispatch(postLogin(data));
  },
});

class Login extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 40,
            marginTop: Platform.OS === 'ios' ? 0 : 10,
            paddingLeft: 16,
            paddingTop: 16,
            paddingRight: 16,
            paddingBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'flex-start'}}
            onPress={() => BackHandler.exitApp()}
            hitSlop={{top: 30, bottom: 30, left: 10, right: 30}}>
            <Icon name="md-close" size={35} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 30,
            paddingTop: 45,
          }}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Log in to TikTok
          </Text>
          <View style={{paddingTop: 40}}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .email('Invalid Email')
                  .required('Username or Email is Required.'),
                password: yup.string().required('Password is Required'),
              })}
              onSubmit={(values, {props = this.props}) => {
                let data = {
                  email: values.email,
                  password: values.password,
                };
                props.postLogin(data);
              }}>
              {(formProps) => (
                <View>
                  <View>
                    <TextInput
                      style={global.input}
                      autoCapitalize={'none'}
                      onChangeText={formProps.handleChange('email')}
                      onBlur={() => formProps.setFieldTouched('email')}
                      value={formProps.values.email}
                      placeholder="Username or Email"
                    />
                    {formProps.touched.email && formProps.errors.email && (
                      <Text style={styles.inputerr}>
                        {formProps.errors.email}
                      </Text>
                    )}
                  </View>
                  <View>
                    <TextInput
                      style={global.input}
                      secureTextEntry={true}
                      onChangeText={formProps.handleChange('password')}
                      onBlur={() => formProps.setFieldTouched('password')}
                      value={formProps.values.password}
                      placeholder="Password"
                    />
                    {formProps.touched.password &&
                      formProps.errors.password && (
                        <Text style={styles.inputerr}>
                          {formProps.errors.password}
                        </Text>
                      )}
                  </View>
                  <View style={{flexDirection: 'row', paddingVertical: 15}}>
                    <Text style={{fontSize: 16, color: 'grey'}}>
                      Not a User ?
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={{fontSize: 16, color: 'blue'}}>
                        {' '}
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      paddingTop: 60,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={
                        formProps.isValid ? styles.mainBtn : styles.disableBtn
                      }
                      disabled={!formProps.isValid}
                      onPress={formProps.handleSubmit}>
                      {this.props.login.isLoading === true ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <Icon name="md-checkmark" size={35} color="#fff" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  inputerr: {fontSize: 16, color: 'red'},
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
  disableBtn: {
    backgroundColor: '#d8d8d8',
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
