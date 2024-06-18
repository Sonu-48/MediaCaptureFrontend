import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Base_Url } from '../../utils/Api';
import styles from '../../styles/Styles';

const File = () => {
  const [fileData, setFileData] = useState([]);

  // Fetch image and video data from API
  const getUploadedData = async () => {
    try {
      const res = await axios.get(Base_Url.getfile);
      if (res.status === 200) {
        console.log("images",res.data);
        setFileData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUploadedData();
  }, []);

  // Render file section
  const RenderFile = ({ item }) => {
    return (
      <View style={styles.mediaContainer}>
        <Image
         source={{ uri:item.url }}
          style={{borderWidth:2,borderColor:'tomato',borderRadius:10,width:200,height:200}}
          onError={(error) => console.log('Image load error for URL:', item.url, error)}
        />
      </View>
    );
  };

  return (
   
     <View style={{ backgroundColor: '#080710',height:'100%'}}>
       <FlatList
      data={fileData}
      renderItem={RenderFile}
      numColumns={2}
      keyExtractor={(item) => item._id}
    />
     </View>
  
  );
};

export default File;
