import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Base_Url} from '../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login validation
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = ({navigation}) => {
    
  //Login api
  const handleSubmit = async values => {
    try {
      const res = await axios({
        method: 'post',
        url: Base_Url.login,
        data: {
          email: values.email,
          password: values.password,
        },
      });
      if (res.status === 200) {
        const token = res.data.token;
        console.log('token', token);
        // store token in localStorage
        await AsyncStorage.setItem('token', token);
        Alert.alert(res.data.msg);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // get token from AsyncStorage
  const [token, setToken] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        setToken(value);
        console.log('token', value);
      }
    });
  }, []);
  if (token) {
    navigation.navigate('Home');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginSchema}
        onSubmit={values => handleSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form_wrapper}>
            <Text style={styles.h2}>Login Here</Text>
            {/* login form section */}
            <View style={{paddingTop: 40}}>
              <View style={styles.inputwrapper}>
                <Text style={styles.h6}>Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#fff"
                  style={styles.inputfield}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errortext}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputwrapper}>
                <Text style={styles.h6}>Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  style={styles.inputfield}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errortext}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btn_text}>Login</Text>
              </TouchableOpacity>
            </View>
            {/* don't have an account */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.h6,
                  {textAlign: 'center', paddingTop: 30, fontSize: 15},
                ]}>
                Don't have an account
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text
                  style={[
                    styles.h6,
                    {color: 'tomato', marginTop: 28, marginLeft: 10},
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
export default Login;

// login figma
// https://codepen.io/fghty/pen/PojKNEG
