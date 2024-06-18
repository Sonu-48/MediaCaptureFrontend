import React from 'react';
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
import { Base_Url } from '../utils/Api';

// validation for signup
const signupSchema = yup.object().shape({
    firstname: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastname: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
      phonenumber:yup
      .string()
      .min(10,"Phone number be 10 digits")
      .max(10,"Phone number be 10 digits")
      .required("Phone number is required")
  });

const Signup = ({navigation}) => {

    // signup form submission api
    const handleSubmit = async(values)=>{
        try {
            const res = await axios({
                method:"post",
                url:Base_Url.signup,
                data:{
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    password: values.password,
                    phonenumber: values.phonenumber
                }
            })
            if(res.status === 200){
                Alert.alert(res.data.msg)
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{firstname:'',lastname:'',email: '', password: '',phonenumber:''}}
          validationSchema={signupSchema}
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
        <Text style={styles.h2}>Signup Here</Text>
        {/* signup form section */}
        <View style={{paddingTop: 40}}>
          <View style={styles.inputwrapper}>
            <Text style={styles.h6}>Firstname</Text>
            <TextInput
              placeholder="Enter your firstname"
              placeholderTextColor="#fff"
              style={styles.inputfield}
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              value={values.firstname}
            />
             {touched.firstname && errors.firstname && (
                    <Text style={styles.errortext}>{errors.firstname}</Text>
                  )}
          </View>
          <View style={styles.inputwrapper}>
            <Text style={styles.h6}>Lastname</Text>
            <TextInput
              placeholder="Enter your lastname"
              placeholderTextColor="#fff"
              style={styles.inputfield}
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              value={values.lastname}
            />
            {touched.lastname && errors.lastname && (
                    <Text style={styles.errortext}>{errors.lastname}</Text>
                  )}
          </View>
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
          <View style={styles.inputwrapper}>
            <Text style={styles.h6}>Phonenumber</Text>
            <TextInput
              placeholder="Enter your contact"
              keyboardType="phone-pad"
              placeholderTextColor="#fff"
              style={styles.inputfield}
              onChangeText={handleChange('phonenumber')}
              onBlur={handleBlur('phonenumber')}
              value={values.phonenumber}
            />
            {touched.phonenumber && errors.phonenumber && (
                    <Text style={styles.errortext}>{errors.phonenumber}</Text>
                  )}
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btn_text}>Signup</Text>
          </TouchableOpacity>
        </View>
        {/*  have an account */}
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
            Have an account
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.h6,
                {color: 'tomato', marginTop: 28, marginLeft: 10},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
       )}
        </Formik>
    </ScrollView>
  );
};
export default Signup;
