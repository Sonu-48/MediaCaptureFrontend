import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';

const SplachScreen = ({navigation}) => {
  // settimeout for login page
  useEffect(()=>{
      setTimeout(()=>{
          navigation.navigate('Login')
      },3000);
      return () => clearTimeout(setTimeout);
  },[])
  return (
    <View style={styles.container}>
      <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.h1}>Media Capture</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn_text}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SplachScreen;
