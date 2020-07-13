import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {connect} from 'react-redux';
import {postSignup, removeSignup} from '../../store/services/SignUp';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const mapStateToProps = (state) => ({
  signup: state.signup,
});

const mapDispatchToProps = (dispatch) => ({
  postSignup: (data) => {
    dispatch(postSignup(data));
  },
  removeSignup: (data) => {
    dispatch(removeSignup(data));
  },
});

class SignUp extends Component {
  componentDidUpdate() {
    if (this.props.signup.signup !== null) {
      // this.props.removeSignup();
      this.props.navigation.navigate('Login');
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
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
              onPress={() => this.props.navigation.goBack()}
              hitSlop={{top: 30, bottom: 30, left: 10, right: 30}}>
              <Icon name="md-arrow-back" size={35} color="#000" />
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
              Sign Up using Email
            </Text>
            <View style={{paddingTop: 40}}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  c_password: '',
                  firstname: '',
                  lastname: '',
                  phone: '',
                }}
                validationSchema={yup.object().shape({
                  email: yup
                    .string()
                    .email('Invalid Email')
                    .required('Username or Email is Required.'),
                  password: yup.string().required('Password is Required'),
                  c_password: yup
                    .string()
                    .oneOf([yup.ref('password'), null], 'Passwords must match'),
                  firstname: yup.string().required('First Name is Required'),
                  lastname: yup.string().required('Last Name is Required'),
                })}
                onSubmit={(values, {props = this.props}) => {
                  let data = {
                    email: values.email,
                    password: values.password,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    phone: values.phone,
                  };
                  props.postSignup(data);
                }}>
                {(formProps) => (
                  <View>
                    <View>
                      <TextInput
                        style={styles.input}
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
                        style={styles.input}
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
                    <View>
                      <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={formProps.handleChange('c_password')}
                        onBlur={() => formProps.setFieldTouched('c_password')}
                        value={formProps.values.c_password}
                        placeholder="Confirm Password"
                      />
                      {formProps.touched.c_password &&
                        formProps.errors.c_password && (
                          <Text style={styles.inputerr}>
                            {formProps.errors.c_password}
                          </Text>
                        )}
                    </View>
                    <View>
                      <TextInput
                        style={styles.input}
                        onChangeText={formProps.handleChange('firstname')}
                        onBlur={() => formProps.setFieldTouched('firstname')}
                        value={formProps.values.firstname}
                        placeholder="First Name"
                      />
                      {formProps.touched.firstname &&
                        formProps.errors.firstname && (
                          <Text style={styles.inputerr}>
                            {formProps.errors.firstname}
                          </Text>
                        )}
                    </View>
                    <View>
                      <TextInput
                        style={styles.input}
                        onChangeText={formProps.handleChange('lastname')}
                        onBlur={() => formProps.setFieldTouched('lastname')}
                        value={formProps.values.lastname}
                        placeholder="Last Name"
                      />
                      {formProps.touched.lastname &&
                        formProps.errors.lastname && (
                          <Text style={styles.inputerr}>
                            {formProps.errors.lastname}
                          </Text>
                        )}
                    </View>
                    <View>
                      <TextInput
                        style={styles.input}
                        onChangeText={formProps.handleChange('phone')}
                        onBlur={() => formProps.setFieldTouched('phone')}
                        value={formProps.values.phone}
                        placeholder="Contact"
                      />
                      {formProps.touched.phone && formProps.errors.phone && (
                        <Text style={styles.inputerr}>
                          {formProps.errors.phone}
                        </Text>
                      )}
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 15}}>
                      <Text style={{fontSize: 16, color: 'grey'}}>
                        Already a User ?
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{fontSize: 16, color: 'blue'}}>
                          {' '}
                          LogIn
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
                        {this.props.signup.isLoading === true ? (
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
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
  },
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
