import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import styles from '../styles/Styles';
import {launchCamera} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Video from 'react-native-video';
import axios from 'axios';
import { Base_Url } from '../utils/Api';

const Home = ({navigation}) => {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const ScreenWidth = Dimensions.get('window').width;

  const requestCameraPermission = async () => {
    try {
      const result = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.CAMERA,
          ios: PERMISSIONS.IOS.CAMERA,
        }),
      );
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  const launchImagePicker = async type => {
    console.log('Trying to open device Camera');

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Camera permission is required to take a photo or video',
      );
      return;
    }

    try {
      const result = await launchCamera({
        mediaType: type,
        cameraType: 'back',
        saveToPhotos: true,
      });

      console.log('Camera result:', result);

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log('Captured media URI:', uri);
        // Determine media type based on URI
        if (uri.endsWith('.mp4')) {
          setMediaType('video');
        } else {
          setMediaType('photo');
        }
        setMedia(uri);
      } else {
        Alert.alert('Error', 'Unexpected response from camera');
        console.error('Unexpected response from camera:', result);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

 // Upload file to backend API
 const handleFile = async () => {
  console.log("im working")
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: media,
      type: mediaType === 'photo' ? 'image/jpeg' : 'video/mp4', // Adjust content type based on media type
      name: `${new Date().getTime()}.${mediaType === 'photo' ? 'jpg' : 'mp4'}`,
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post(Base_Url.uploadfile, formData, config);
    if(res.status === 200){
      console.log('Upload response:', res.data);
      // Handle success
      Alert.alert('Success', 'File uploaded successfully');
    }
  } catch (error) {
    console.error('File upload error:', error);
    Alert.alert('Error', 'Failed to upload file');
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={[styles.h6, {color: 'tomato'}]}>Logout</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', flex: 1,alignItems:'center',justifyContent:'center'}}>
          {/* Take a photo button */}
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => launchImagePicker('photo')}>
              <Text style={styles.btn_text}>Take a photo</Text>
            </TouchableOpacity>
          </View>

          {/* Take a video button */}
          <View style={{flex: 1,marginLeft:15}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => launchImagePicker('video')}>
              <Text style={styles.btn_text}>Take a video</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display the captured photo or video */}
        {media && mediaType === 'photo' && (
          <>
            <View style={styles.mediaContainer}>
              <Image source={{uri: media}} style={styles.media} />
              <TouchableOpacity style={[styles.btn, {marginTop: 30}]} onPress={handleFile}>
                <Text style={[styles.btn_text, {color: 'tomato'}]}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {media && mediaType === 'video' && (
          <View style={styles.mediaContainer}>
            <Video
              source={{uri: media}}
              style={[styles.media, {width: ScreenWidth}]}
              controls={true}
              resizeMode="contain"
              onError={error => console.error('Video playback error:', error)}
            />
            <TouchableOpacity style={[styles.btn, {marginTop: 30}]}>
              <Text style={[styles.btn_text, {color: 'tomato'}]}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      
    </ScrollView>
  );
};

export default Home;
