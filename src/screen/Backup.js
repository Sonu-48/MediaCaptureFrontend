import React, { useRef } from 'react';
import { View, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/Styles';

const Home = () => {
  const cameraRef = useRef(null);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };

//   const recordVideo = async () => {
//     if (cameraRef.current) {
//       try {
//         const promise = cameraRef.current.recordAsync();

//         if (promise) {
//           const data = await promise;
//           console.log(data.uri);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   };

//   const stopRecording = () => {
//     if (cameraRef.current) {
//       cameraRef.current.stopRecording();
//     }
//   };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View>
            {/* Logout button */}
            <TouchableOpacity style={{backgroundColor:'#fff',borderRadius:5,paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15}}>
                <Text style={[styles.h6,{color:'tomato'}]}>Logout</Text>
            </TouchableOpacity>
      
        <Text style={styles.h6}>Home</Text>
      {/* <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={true}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <Text>Loading...</Text>;
          return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button onPress={takePicture} title="Take Picture" />
              <Button onPress={recordVideo} title="Record Video" />
              <Button onPress={stopRecording} title="Stop Recording" />
            </View>
          );
        }}
      </RNCamera> */}
    </View>
    </ScrollView>
  );
};

export default Home;
